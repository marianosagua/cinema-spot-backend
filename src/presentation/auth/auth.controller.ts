import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/auth";
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
        urlHomePage: "https://movie-reservation-system-frontend.vercel.app/",
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  restorePassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }

      await this.authService.restorePassword(email);
      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      handleError(error, res);
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      if (!token) {
        res.status(400).json({ error: "Token is required" });
        return;
      }

      if (!newPassword) {
        res.status(400).json({ error: "New password is required" });
        return;
      }

      await this.authService.resetPassword(token, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
