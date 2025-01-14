import { Router } from "express";
import { RolesController } from "./roles.controller";
import { RolesService } from "../services/roles.service";

export class RolesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const rolesService = new RolesService();
    const rolesController = new RolesController(rolesService);

    router.post("/assign-role", rolesController.assignRole);

    return router;
  }
}
