import { Request, Response } from "express";
import { AuthService } from "../services";
import { LoginDto } from "../../domain/dtos/auth/login.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { handleError } from "../../domain/errors";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const [error, loginDto] = LoginDto.create(req.body);
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
      res.status(200).json({ message: "Email validated !!!" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
