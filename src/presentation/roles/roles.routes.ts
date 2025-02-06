import { Router } from "express";
import { RolesController } from "./roles.controller";
import { RolesService } from "../services/roles.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

/**
 * Provides the routing configuration for role-related API endpoints.
 *
 * This static class method initializes an Express Router along with the associated RolesService and RolesController,
 * configuring the following endpoints:
 *
 * - POST "/assign-role": Assigns a role to a user. This endpoint is secured with administrative privileges
 *   (using AuthMiddleware.isAdmin) and is handled by the RolesController.assignRole method.
 *
 * - GET "/": Retrieves all available roles. This endpoint is secured with administrative privileges
 *   (using AuthMiddleware.isAdmin) and is handled by the RolesController.getAllRoles method.
 *
 * - GET "/:id": Retrieves a specific role based on its unique identifier. This endpoint is handled by
 *   the RolesController.getRoleById method.
 *
 * - PUT "/:id": Updates an existing role based on its unique identifier. This endpoint is secured with administrative
 *   privileges (using AuthMiddleware.isAdmin) and is handled by the RolesController.updateRole method.
 *
 * - DELETE "/:id": Deletes a specific role by its unique identifier. This endpoint is secured with administrative
 *   privileges (using AuthMiddleware.isAdmin) and is handled by the RolesController.deleteRole method.
 *
 * @example
 * const router = RolesRoutes.getRoutes();
 *
 * @public
 */
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
