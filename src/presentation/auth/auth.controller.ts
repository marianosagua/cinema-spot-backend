import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import {
  LoginUserDto,
  RegisterUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../../domain/dtos/auth";
import { AuthService } from "./auth.service";

/**
 * Controlador de autenticación.
 * Gestiona el login, registro, validación de email y recuperación de contraseña.
 * Utiliza AuthService para la lógica de negocio y maneja respuestas HTTP y vistas.
 *
 * Métodos:
 * - login: Inicia sesión con email y contraseña. Valida el cuerpo de la petición y responde con el token o error.
 * - register: Registra un nuevo usuario. Valida los datos y responde con el usuario creado o error.
 * - validateEmail: Valida el email del usuario mediante un token recibido por URL. Renderiza una vista de éxito o error.
 * - forgotPassword: Envía email para recuperación de contraseña. Valida el email y responde con mensaje de éxito o error.
 * - resetPassword: Permite restablecer la contraseña usando un token. Valida el token y la nueva contraseña, redirige a vista de éxito.
 * - resetPasswordSuccess: Renderiza la vista de éxito tras restablecer contraseña.
 * - getResetPasswordForm: Renderiza el formulario de restablecimiento de contraseña usando el token recibido por URL.
 */
export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const response = await this.authService.loginUser(loginDto!);
      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  register = async (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const response = await this.authService.registerUser(registerDto!);
      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  validateEmail = async (req: Request, res: Response) => {
    const token = req.params.token;

    try {
      await this.authService.validateEmail(token);
      res.render("successEmailValidation", {
        urlHomePage: "https://cinemaspot.vercel.app/",
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    const [error, forgotDto] = ForgotPasswordDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    try {
      await this.authService.forgotPassword(forgotDto!);
      res.status(200).json({ message: "Email de restablecimiento de contraseña enviado" });
    } catch (error) {
      handleError(error, res);
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    const [error, resetDto] = ResetPasswordDto.create({
      token: req.params.token || req.body.token,
      password: req.body.password,
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }
    try {
      await this.authService.resetPassword(resetDto!);
      // Redirige a la vista de éxito
      res.redirect("/api/auth/restablecer-password-exito");
    } catch (error) {
      handleError(error, res);
    }
  };

  resetPasswordSuccess = async (req: Request, res: Response) => {
    res.render("resetPasswordSuccess", {
      loginUrl: "https://cinemaspot.vercel.app/auth/login",
    });
  };

  getResetPasswordForm = async (req: Request, res: Response) => {
    const { token } = req.params;
    res.render("resetPasswordForm", { token });
  };
}
