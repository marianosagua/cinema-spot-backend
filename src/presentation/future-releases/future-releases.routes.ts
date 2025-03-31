import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FutureReleasesController } from "./future-releases.controller";
import { FutureReleasesService } from "./future-releases.service";

/**
 * FutureReleasesRoutes class encapsulates the routing configuration for future movie releases endpoints.
 *
 * This class sets up routes for managing upcoming movies that are scheduled for future release.
 * It implements RESTful patterns for retrieving, creating, updating, and deleting future release information.
 * Admin-level operations (create, update, delete) are protected with appropriate middleware.
 *
 * Endpoints defined:
 * - GET "/" - Retrieves all upcoming movie releases.
 * - GET "/:id" - Retrieves details for a specific future release by ID.
 * - POST "/" - Creates a new future release record (admin only).
 * - PUT "/:id" - Updates an existing future release (admin only).
 * - DELETE "/:id" - Removes a future release from the system (admin only).
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { FutureReleasesRoutes } from './future-releases.routes';
 *
 * const app = express();
 * app.use('/api/future-releases', FutureReleasesRoutes.getRoutes());
 * ```
 */
export class FutureReleasesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const futureReleasesService = new FutureReleasesService();
    const futureReleasesController = new FutureReleasesController(
      futureReleasesService
    );

    // Public routes
    router.get("/", futureReleasesController.getFutureReleases);
    router.get("/:id", futureReleasesController.getFutureReleaseById);

    // Protected routes (admin only)
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
