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

// Servicio de autenticación para usuarios.
// Gestiona el login, registro, validación de email, recuperación y restablecimiento de contraseña.
// Utiliza JWT para tokens, bcrypt para contraseñas y plantillas para emails.

export class AuthService {
  /**
   * Inicializa el servicio de autenticación con un servicio de email.
   * @param emailService Servicio para el envío de correos electrónicos.
   */
  constructor(private readonly emailService: EmailService) {}

  /**
   * Inicia sesión de usuario.
   * Busca el usuario por email, valida la contraseña y genera un token JWT.
   * @param loginDto DTO con email y contraseña.
   * @returns Objeto con datos del usuario (sin contraseña) y token JWT.
   * @throws CustomError si el usuario no existe o la contraseña es incorrecta.
   */
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

  /**
   * Registra un nuevo usuario.
   * Verifica que el email no exista, hashea la contraseña, crea el usuario y envía email de validación.
   * @param registerDto DTO con los datos de registro.
   * @returns Objeto con datos del usuario (sin contraseña) y token JWT.
   * @throws CustomError si el usuario ya existe o hay errores en el proceso.
   */
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

  /**
   * Compila una plantilla de email usando Handlebars.
   * @param templateName Nombre del archivo de plantilla (sin extensión).
   * @param data Datos a inyectar en la plantilla.
   * @returns HTML generado a partir de la plantilla y los datos.
   */
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

  /**
   * Envía un email de confirmación de registro al usuario.
   * Genera un token y construye la URL de validación.
   * @param email Email del usuario a validar.
   * @throws Error si falla el envío del email o la generación del token.
   */
  private async sendEmailConfirmation(email: string): Promise<void> {
    const token = JwtAdapter.generateToken({ email });
    if (!token) throw new Error("Error al generar el token");

    const url = `${envs.app_url}/api/auth/validate-email/${token}`;
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

  /**
   * Valida el email del usuario a partir de un token recibido por email.
   * Marca el email como validado en la base de datos.
   * @param token Token JWT recibido por email.
   * @throws Error si el token es inválido o el usuario no existe.
   */
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

  /**
   * Inicia el proceso de recuperación de contraseña.
   * Genera un token y envía un email con el enlace para restablecer la contraseña.
   * @param dto DTO con el email del usuario.
   * @throws CustomError si el usuario no existe o falla el envío del email.
   */
  public async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await prismaClient.users.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw CustomError.unauthorized("Usuario no encontrado");

    const token = JwtAdapter.generateToken({ email: user.email }, "1h");
    if (!token) throw new Error("Error al generar el token");

    const url = `${envs.app_url}/api/auth/reset-password/${token}`;
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

  /**
   * Restablece la contraseña del usuario usando un token y la nueva contraseña.
   * Valida el token, hashea la nueva contraseña y la actualiza en la base de datos.
   * @param dto DTO con el token y la nueva contraseña.
   * @throws Error si el token es inválido o el usuario no existe.
   */
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
