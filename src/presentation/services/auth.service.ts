import { envs } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prismaClient } from "../../data/postgres/client-connection";
import { RegisterUserDto } from "../../domain/dtos/auth";
import { LoginDto } from "../../domain/dtos/auth/login.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/CustomErrors";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async loginUser(
    loginDto: LoginDto
  ): Promise<{ user: any; token: string }> {
    const user = await prismaClient.users.findFirst({
      where: { email: loginDto.email },
    });

    if (!user) throw CustomError.unauthorized("User not found");

    if (!bcryptAdapter.compare(loginDto.password, user.password))
      throw CustomError.unauthorized("Invalid email or password");

    const { password, ...userData } = await UserEntity.create(user);

    const token = JwtAdapter.generateToken({ id: user.id }, "24h");
    if (!token) throw new Error("Error generating token");

    return {
      user: userData,
      token,
    };
  }

  public async registerUser(
    registerDto: RegisterUserDto
  ): Promise<{ user: any; token: string }> {
    const existUser = await prismaClient.users.findFirst({
      where: { email: registerDto.email },
    });

    if (existUser) throw CustomError.unauthorized("User already exists");

    const data = { ...registerDto };
    data.password = bcryptAdapter.hash(data.password);

    const user = await prismaClient.users.create({ data });

    await this.sendEmailConfirmation(user.email);

    const { password, ...userEntity } = await UserEntity.create(user);

    const token = JwtAdapter.generateToken({ id: user.id }, "24h");
    if (!token) throw new Error("Error generating token");

    return { user: userEntity, token };
  }

  private async sendEmailConfirmation(email: string): Promise<void> {
    const token = JwtAdapter.generateToken({ email });
    if (!token) throw new Error("Error generating token");

    const url = `${envs.app_url}/api/auth/validate-email/${token}`;
    const message = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${url}">Validate your email: ${email}</a>
      `;

    const isSent = await this.emailService.sendEmail({
      email,
      subject: "Validate your email",
      message,
    });
    if (!isSent) throw new Error("Error sending email");
  }

  public async validateEmail(token: string): Promise<void> {
    const payload = JwtAdapter.verifyToken(token);
    if (!payload) throw new Error("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw new Error("Email not in token");

    const user = await prismaClient.users.findFirst({ where: { email } });
    if (!user) throw CustomError.unauthorized("User not found");

    await prismaClient.users.update({
      data: { email_validated: true },
      where: { email },
    });
  }
}
