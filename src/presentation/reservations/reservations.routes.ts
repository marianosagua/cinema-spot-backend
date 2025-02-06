import { Router } from "express";
import { ReservationsController } from "./reservations.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ReservationsService } from "../services";

/**
 * ReservationsRoutes class encapsulates the routing configuration for reservation-related endpoints.
 *
 * This class provides a static method that returns an Express Router instance configured with RESTful routes
 * for managing movie reservations. The following endpoints are defined:
 *
 * - GET "/" - Retrieves all reservations. This route is protected by the admin authorization middleware.
 * - GET "/:id" - Retrieves the details of a specific reservation identified by its unique ID.
 * - GET "/user/:userId" - Retrieves all reservations for a given user identified by user ID.
 * - POST "/" - Creates a new reservation.
 * - DELETE "/:id" - Deletes an existing reservation identified by its unique ID.
 *
 * The getRoutes() method sets up the necessary service and controller layers, applies middleware where required,
 * and returns the configured Router instance for integration with the main application routes.
 *
 * @example
 * ```typescript
 * import express from "express";
 * import { ReservationsRoutes } from "./reservations.routes";
 *
 * const app = express();
 * app.use("/api/reservations", ReservationsRoutes.getRoutes());
 * ```
 *
 * @returns {Router} A fully configured Express Router for reservation management.
 */
export class ReservationsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const reservationsService = new ReservationsService();
    const reservationsController = new ReservationsController(
      reservationsService
    );

    router.get(
      "/",
      AuthMiddleware.isAdmin,
      reservationsController.getReservations
    );
    router.get("/:id", reservationsController.getReservationById);
    router.get("/user/:userId", reservationsController.getReservationsByUser);
    router.post("/", reservationsController.addReservation);
    router.delete("/:id", reservationsController.deleteReservation);

    return router;
  }
}
