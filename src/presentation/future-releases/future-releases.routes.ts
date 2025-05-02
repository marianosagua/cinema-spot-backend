/**
 * Rutas del módulo de próximos estrenos (Future Releases)
 *
 * Este archivo define las rutas para consultar, crear, actualizar y eliminar
 * próximos estrenos de películas. Las rutas de creación, edición y borrado
 * están protegidas por AuthMiddleware.isAdmin (solo administradores).
 */

import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FutureReleasesController } from "./future-releases.controller";
import { FutureReleasesService } from "./future-releases.service";

export class FutureReleasesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const futureReleasesService = new FutureReleasesService();
    const futureReleasesController = new FutureReleasesController(
      futureReleasesService
    );

    router.get("/", futureReleasesController.getFutureReleases);
    router.get("/:id", futureReleasesController.getFutureReleaseById);

    router.post(
      "/",
      AuthMiddleware.isAdmin,
      futureReleasesController.createFutureRelease
    );
    router.put(
      "/:id",
      AuthMiddleware.isAdmin,
      futureReleasesController.updateFutureRelease
    );
    router.delete(
      "/:id",
      AuthMiddleware.isAdmin,
      futureReleasesController.deleteFutureRelease
    );

    return router;
  }
}
