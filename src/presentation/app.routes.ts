import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { RolesRoutes } from "./roles/roles.routes";
import { MoviesRoutes } from "./movies/movies.routes";
import { ReservationsRoutes } from "./reservations/reservations.routes";
import { ShowtimesRoutes } from "./showtimes/showtimes.routes";
import { SeatsRoutes } from "./seats/seats.routes";

export class AppRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.getRoutes());
    router.use("/api/roles", RolesRoutes.getRoutes());
    router.use("/api/movies", MoviesRoutes.getRoutes());
    router.use("/api/showtimes", ShowtimesRoutes.getRoutes());
    router.use("/api/reservations", ReservationsRoutes.getRoutes());
    router.use("/api/seats", SeatsRoutes.getRoutes());

    return router;
  }
}
