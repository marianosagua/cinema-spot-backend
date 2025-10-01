import { envs } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prismaClient } from "../../data/postgres/client-connection";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/auth";
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../../domain/dtos/auth/forgot-reset-password.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/CustomErrors";
import fs from "fs/promises";
import path from "path";
import { create } from "express-handlebars";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async loginUser(
    loginDto: LoginUserDto
  ): Promise<{ user: any; token: string }> {
    const user = await prismaClient.users.findFirst({
      where: { email: loginDto.email },
    });

    if (!user) throw CustomError.unauthorized("Usuario no encontrado");

    if (!bcryptAdapter.compare(loginDto.password, user.password))
      throw CustomError.unauthorized("Email o contraseña incorrectos");

    const { password, ...userData } = await UserEntity.create(user);

    const token = JwtAdapter.generateToken({ id: user.id }, "24h");
    if (!token) throw new Error("Error al generar el token");

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

    if (existUser) throw CustomError.unauthorized("Usuario ya existe");

    const data = { ...registerDto };
    data.password = bcryptAdapter.hash(data.password);

    const user = await prismaClient.users.create({ data });

    await this.sendEmailConfirmation(user.email);

    const { password, ...userEntity } = await UserEntity.create(user);

    const token = JwtAdapter.generateToken({ id: user.id }, "24h");
    if (!token) throw new Error("Error al generar el token");

    return { user: userEntity, token };
  }

  private async compileTemplate(
    templateName: string,
    data: object
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      "..",
      "views",
      `${templateName}.hbs`
    );
    const templateSource = await fs.readFile(templatePath, "utf-8");
    const hbs = create({ extname: ".hbs" });
    const compiledTemplate = hbs.handlebars.compile(templateSource, {});
    return compiledTemplate(data);
  }

  private async sendEmailConfirmation(email: string): Promise<void> {
    const token = JwtAdapter.generateToken({ email });
    if (!token) throw new Error("Error al generar el token");

    const url = `${envs.app_url}/api/auth/validar-correo/${token}`;
    const message = await this.compileTemplate("emailValidation", {
      validationUrl: url,
      email,
    });

    const isSent = await this.emailService.sendEmail({
      email,
      subject: "Valida tu email",
      message,
    });
    if (!isSent) throw new Error("Error al enviar el email");
  }

  public async validateEmail(token: string): Promise<void> {
    const payload = JwtAdapter.verifyToken(token);
    if (!payload) throw new Error("Token inválido");

    const { email } = payload as { email: string };
    if (!email) throw new Error("Email no está en el token");

    const user = await prismaClient.users.findFirst({ where: { email } });
    if (!user) throw CustomError.unauthorized("Usuario no encontrado");

    await prismaClient.users.update({
      data: { email_validated: true },
      where: { email },
    });
  }

  public async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await prismaClient.users.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw CustomError.unauthorized("Usuario no encontrado");

    const token = JwtAdapter.generateToken({ email: user.email }, "1h");
    if (!token) throw new Error("Error al generar el token");

    const url = `${envs.app_url}/api/auth/restablecer-password/${token}`;
    const message = await this.compileTemplate("resetPassword", {
      resetUrl: url,
      email: user.email,
    });

    const isSent = await this.emailService.sendEmail({
      email: user.email,
      subject: "Restablece tu contraseña",
      message,
    });
    if (!isSent) throw new Error("Error al enviar el email");
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const payload = JwtAdapter.verifyToken(dto.token);
    if (!payload) throw new Error("Token inválido o expirado");

    const { email } = payload as { email: string };
    if (!email) throw new Error("Email no está en el token");

    const user = await prismaClient.users.findFirst({ where: { email } });
    if (!user) throw CustomError.unauthorized("Usuario no encontrado");

    const hashedPassword = bcryptAdapter.hash(dto.password);

    await prismaClient.users.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }
}
