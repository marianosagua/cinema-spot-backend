import { Router } from "express";
import { ShowtimesController } from "./showtimes.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ShowtimesService } from "./showtimes.service";

/**
 * Provides routing configuration for all showtime-related API endpoints within the Movie Reservation System.
 *
 * This class encapsulates the setup of an Express Router with dedicated endpoints to manage showtime operations.
 * It constructs a controller instance backed by the corresponding showtime service and applies admin authentication
 * middleware where necessary to secure sensitive operations.
 *
 * The following endpoints are defined:
 * - GET "/" – Retrieves a list of all showtimes. This endpoint is protected by admin authentication.
 * - GET "/:id" – Retrieves details of a specific showtime identified by its unique identifier.
 * - GET "/movie/:movieId" – Retrieves showtimes associated with a specific movie.
 * - POST "/" – Creates a new showtime record. This operation is secured by admin authentication.
 * - PUT "/:id" – Updates an existing showtime identified by its unique identifier. This operation requires admin privileges.
 * - DELETE "/:id" – Deletes a showtime identified by its unique identifier. This operation is also secured by admin authentication.
 *
 * @returns {Router} A fully configured Express Router instance with all showtime endpoints mounted.
 *
 * @example
 * ```typescript
 * import express from "express";
 * import { ShowtimesRoutes } from "./showtimes.routes";
 *
 * const app = express();
 * app.use("/api/showtimes", ShowtimesRoutes.getRoutes());
 * ```
 */
export class ShowtimesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const showtimeService = new ShowtimesService();
    const showtimesController = new ShowtimesController(showtimeService);

    router.get("/", AuthMiddleware.isAdmin, showtimesController.getShowtimes);
    router.get("/:id", showtimesController.getShowtimeById);
    router.get("/movie/:movieId", showtimesController.getShowtimesByMovie);
    router.post(
      "/",
      AuthMiddleware.isAdmin,
      showtimesController.createShowtime
    );
    router.put(
      "/:id",
      AuthMiddleware.isAdmin,
      showtimesController.updateShowtime
    );
    router.delete(
      "/:id",
      AuthMiddleware.isAdmin,
      showtimesController.deleteShowtime
    );

    return router;
  }
}
