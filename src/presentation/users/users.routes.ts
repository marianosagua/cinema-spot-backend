/**
 * Rutas del módulo de usuarios (Users)
 *
 * Este archivo define las rutas para la gestión de usuarios en el sistema.
 * Incluye:
 *   - Listado de usuarios (solo admin)
 *   - Consulta de usuario por ID
 *   - Creación, actualización y eliminación de usuarios (solo admin)
 *
 * Middlewares:
 *   - AuthMiddleware.isAdmin: Protege las rutas que requieren permisos de administrador.
 *
 * Estructura de rutas:
 *   GET    /           -> Listar todos los usuarios (admin)
 *   GET    /:id        -> Obtener usuario por ID
 *   POST   /           -> Crear usuario (admin)
 *   PUT    /:id        -> Actualizar usuario (admin)
 *   DELETE /:id        -> Eliminar usuario (admin)
 */

import { Router } from "express";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UsersRoutes {
  static getRoutes(): Router {
    const router = Router();
    const usersService = new UsersService();
    const usersController = new UsersController(usersService);

    router.get("/", AuthMiddleware.isAdmin, usersController.getUsers);

    router.get("/:id", usersController.getUserById);

    router.post("/", AuthMiddleware.isAdmin, usersController.createUser);

    router.put("/:id", AuthMiddleware.isAdmin, usersController.updateUser);

    router.delete("/:id", AuthMiddleware.isAdmin, usersController.deleteUser);

    return router;
  }
}
