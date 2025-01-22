import { Request, Response } from "express";
import { AuthService } from "../services";
import { handleError } from "../../domain/errors";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/auth";

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
      res.status(200).json({ message: "Email validated !!!" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
