import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService, EmailService } from "../services";

export class AuthRoutes {
  static getRoutes(): Router {
    const router = Router();
    const emailService = new EmailService();
    const authService = new AuthService(emailService);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);

    return router;
  }
}
