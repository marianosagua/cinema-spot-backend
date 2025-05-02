/**
 * Rutas del módulo de roles (Roles)
 *
 * Este archivo define las rutas para la gestión de roles de usuario en el sistema.
 * Incluye:
 *   - Asignación de roles a usuarios (solo admin)
 *   - Listado de roles (solo admin)
 *   - Consulta, actualización y eliminación de roles
 *
 * Middlewares:
 *   - AuthMiddleware.isAdmin: Protege las rutas de administración de roles.
 *
 * Estructura de rutas:
 *   POST   /assign-role   -> Asignar rol a usuario (admin)
 *   GET    /              -> Listar todos los roles (admin)
 *   GET    /:id           -> Obtener rol por ID
 *   PUT    /:id           -> Actualizar rol (admin)
 *   DELETE /:id           -> Eliminar rol (admin)
 */

import { Router } from "express";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class RolesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const rolesService = new RolesService();
    const rolesController = new RolesController(rolesService);

    router.post(
      "/assign-role",
      AuthMiddleware.isAdmin,
      rolesController.assignRole
    );
    router.get("/", AuthMiddleware.isAdmin, rolesController.getAllRoles);
    router.get("/:id", rolesController.getRoleById);
    router.put("/:id", AuthMiddleware.isAdmin, rolesController.updateRole);
    router.delete("/:id", AuthMiddleware.isAdmin, rolesController.deleteRole);

    return router;
  }
}
