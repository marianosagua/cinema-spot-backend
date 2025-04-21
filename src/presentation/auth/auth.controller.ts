import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import {
  LoginUserDto,
  RegisterUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../../domain/dtos/auth";
import { AuthService } from "./auth.service";

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
      res.status(200).json({ message: "Password reset email sent" });
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
      res.redirect("/api/auth/reset-password-success");
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
