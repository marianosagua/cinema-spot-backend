import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { RolesRoutes } from "./roles/roles.routes";
import { MoviesRoutes } from "./movies/movies.routes";
import { ReservationsRoutes } from "./reservations/reservations.routes";
import { ShowtimesRoutes } from "./showtimes/showtimes.routes";
import { SeatsRoutes } from "./seats/seats.routes";
import { RoomsRoutes } from "./rooms/rooms.routes";

/**
 * Provides all application routes for the movie reservation system backend.
 *
 * This static class method creates and configures an Express Router by mounting various sub-route
 * modules that handle different aspects of the system's API. Each sub-route is associated with a
 * specific URL prefix, ensuring a modular and organized API structure.
 *
 * @remarks
 * The following sub-routes are set up:
 * - "/api/auth": Handles authentication-related endpoints.
 * - "/api/roles": Manages user roles and permissions.
 * - "/api/movies": Provides endpoints related to movie data and operations.
 * - "/api/showtimes": Manages endpoints for movie showtime scheduling.
 * - "/api/reservations": Handles reservation functionalities.
 * - "/api/seats": Manages seating arrangements and related endpoints.
 * - "/api/rooms": Provides endpoints for room configuration and management.
 *
 * @example
 * An example of integrating the application routes into an Express application:
 *
 * import express from "express";
 * import { AppRoutes } from "./presentation/app.routes";
 *
 * const app = express();
 * app.use(AppRoutes.getRoutes());
 *
 * @returns A configured Express Router instance with all the defined sub-route endpoints.
 */
export class AppRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.getRoutes());

    router.use("/api/roles", RolesRoutes.getRoutes());

    router.use("/api/movies", MoviesRoutes.getRoutes());

    router.use("/api/showtimes", ShowtimesRoutes.getRoutes());

    router.use("/api/reservations", ReservationsRoutes.getRoutes());

    router.use("/api/seats", SeatsRoutes.getRoutes());

    router.use("/api/rooms", RoomsRoutes.getRoutes());

    return router;
  }
}
