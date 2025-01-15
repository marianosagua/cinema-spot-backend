import { Router } from "express";
import { RolesController } from "./roles.controller";
import { RolesService } from "../services/roles.service";
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

    return router;
  }
}
