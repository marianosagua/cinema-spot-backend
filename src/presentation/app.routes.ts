import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";

export class AppRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.getRoutes());
    // router.use("/api/roles", AuthRoutes.getRoutes());

    return router;
  }
}
