import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { RolesRoutes } from "./roles/roles.routes";
import { MoviesRoutes } from "./movies/movies.routes";
import { ReservationsRoutes } from "./reservations/reservations.routes";
import { ShowtimesRoutes } from "./showtimes/showtimes.routes";
import { SeatsRoutes } from "./seats/seats.routes";
import { RoomsRoutes } from "./rooms/rooms.routes";
import { UsersRoutes } from "./users/users.routes";
import { FutureReleasesRoutes } from "./future-releases/future-releases.routes";
import { CategoriesRoutes } from "./categories/categories.routes";
import { MovieCastRoutes } from "./movie-cast/movie-cast.routes";

/**
 * Regroups all API routes for the movie reservation system backend.
 *
 * This static method creates and configures an Express Router by mounting various sub-route modules,
 * each handling specific functionalities of the system. The modular design assigns unique URL prefixes
 * to each group of routes, ensuring a clean and organized API structure.
 *
 * @remarks
 * The integrated sub-routes include:
 * - "/api/auth": Manages authentication operations.
 * - "/api/roles": Controls user roles and permissions.
 * - "/api/movies": Handles movie-related data and operations.
 * - "/api/showtimes": Manages scheduling for movie showtimes.
 * - "/api/reservations": Handles reservation processes.
 * - "/api/seats": Manages seating arrangements and related endpoints.
 * - "/api/rooms": Oversees room configuration and management.
 * - "/api/users": Manages user-related functionalities.
 *
 * @example
 * The following example shows how to incorporate the app routes into an Express application:
 *
 * import express from "express";
 * import { AppRoutes } from "./presentation/app.routes";
 *
 * const app = express();
 * app.use(AppRoutes.getRoutes());
 *
 * @returns {Router} A fully configured Express Router instance with all mounted API routes.
 */
export class AppRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.getRoutes());

    router.use("/api/roles", RolesRoutes.getRoutes());

    router.use("/api/movies", MoviesRoutes.getRoutes());

    router.use("/api/future-releases", FutureReleasesRoutes.getRoutes());

    router.use("/api/showtimes", ShowtimesRoutes.getRoutes());

    router.use("/api/reservations", ReservationsRoutes.getRoutes());

    router.use("/api/seats", SeatsRoutes.getRoutes());

    router.use("/api/rooms", RoomsRoutes.getRoutes());

    router.use("/api/users", UsersRoutes.getRoutes());

    router.use("/api/categories", CategoriesRoutes.getRoutes());

    router.use("/api/movie-cast", MovieCastRoutes.getRoutes());

    return router;
  }
}
