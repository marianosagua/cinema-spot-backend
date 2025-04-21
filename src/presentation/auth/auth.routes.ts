import { Router } from "express";
import { AuthController } from "./auth.controller";
import { EmailService } from "./email.service";
import { AuthService } from "./auth.service";

/**
 * The AuthRoutes class encapsulates the routing configuration for authentication-related endpoints.
 *
 * This class defines a static method to construct and return an Express Router that handles API routes for user
 * authentication operations such as login, registration, and email validation. The router is configured with
 * the following endpoints:
 *
 * - POST "/login": Authenticates a user with provided login credentials.
 * - POST "/register": Registers a new user and triggers an email confirmation process.
 * - GET "/validate-email/:token": Validates the user's email using a token provided in the URL.
 * - POST "/forgot-password": Initiates the password recovery process for a user.
 * - POST "/reset-password/:token": Resets the user's password using a token provided in the URL.
 * - GET "/reset-password/:token": Serves the password reset form using a token provided in the URL.
 * - GET "/reset-password-success": Serves the success view after resetting the password.
 *
 * The method initializes required service dependencies:
 * - An EmailService instance to handle email sending tasks.
 * - An AuthService instance that manages the core business logic for authentication.
 * - An AuthController instance which defines handler methods for the endpoints.
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { AuthRoutes } from './auth.routes';
 *
 * const app = express();
 * app.use('/api/auth', AuthRoutes.getRoutes());
 * ```
 *
 * @public
 */
export class AuthRoutes {
  static getRoutes(): Router {
    const router = Router();
    const emailService = new EmailService();
    const authService = new AuthService(emailService);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    router.post("/forgot-password", authController.forgotPassword);
    router.post("/reset-password/:token", authController.resetPassword);
    router.get("/reset-password/:token", authController.getResetPasswordForm);
    router.get("/reset-password-success", authController.resetPasswordSuccess);

    return router;
  }
}
