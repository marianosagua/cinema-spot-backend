import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { RolesRoutes } from "./roles/roles.routes";

export class AppRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.getRoutes());
    router.use("/api/roles", RolesRoutes.getRoutes());

    return router;
  }
}
