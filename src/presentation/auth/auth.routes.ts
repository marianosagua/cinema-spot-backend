/**
 * Rutas del módulo de autenticación (Auth)
 *
 * Este archivo define las rutas relacionadas con la autenticación y gestión de credenciales de usuario.
 * Permite a los usuarios iniciar sesión, registrarse, validar su correo electrónico y recuperar su contraseña.
 * Cada ruta está asociada a un método del AuthController, que utiliza AuthService y EmailService para la lógica de negocio.
 *
 * Estructura de rutas:
 *   POST   /login                    -> Iniciar sesión con email y contraseña
 *   POST   /registro                 -> Registrar un nuevo usuario
 *   GET    /validate-email/:token    -> Validar el correo electrónico mediante token
 *   POST   /forgot-password          -> Solicitar recuperación de contraseña (envía email)
 *   POST   /reset-password/:token    -> Restablecer contraseña usando token recibido por email
 *   GET    /reset-password/:token    -> Obtener formulario de restablecimiento de contraseña
 *   GET    /reset-password-success   -> Página de éxito tras restablecer contraseña
 *
 * Notas:
 *   - No requiere autenticación previa, ya que son rutas públicas para el flujo de acceso y recuperación.
 *   - El flujo de recuperación de contraseña y validación de email utiliza tokens enviados por correo electrónico.
 */

import { Router } from "express";
import { AuthController } from "./auth.controller";
import { EmailService } from "./email.service";
import { AuthService } from "./auth.service";

export class AuthRoutes {
  static getRoutes(): Router {
    const router = Router();
    const emailService = new EmailService();
    const authService = new AuthService(emailService);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/registro", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    router.post("/forgot-password", authController.forgotPassword);
    router.post("/reset-password/:token", authController.resetPassword);
    router.get("/reset-password/:token", authController.getResetPasswordForm);
    router.get("/reset-password-success", authController.resetPasswordSuccess);

    return router;
  }
}
