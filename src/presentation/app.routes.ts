import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { UsersRoutes } from "./users/users.routes";
import { RoomsRoutes } from "./rooms/rooms.routes";
import { CategoriesRoutes } from "./categories/categories.routes";
import { MoviesRoutes } from "./movies/movies.routes";
import { RolesRoutes } from "./roles/roles.routes";
import { ShowtimesRoutes } from "./showtimes/showtimes.routes";
import { SeatsRoutes } from "./seats/seats.routes";
import { ReservationsRoutes } from "./reservations/reservations.routes";
import { FutureReleasesRoutes } from "./future-releases/future-releases.routes";
import { MovieCastRoutes } from "./movie-cast/movie-cast.routes";
import { ActorsRoutes } from "./actors/actors.routes";

export class AppRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.getRoutes());
    router.use("/api/users", UsersRoutes.getRoutes());
    router.use("/api/roles", RolesRoutes.getRoutes());

    router.use("/api/movies", MoviesRoutes.getRoutes());
    router.use("/api/categories", CategoriesRoutes.getRoutes());
    router.use("/api/actors", ActorsRoutes.getRoutes());
    router.use("/api/movie-cast", MovieCastRoutes.getRoutes());
    router.use("/api/future-releases", FutureReleasesRoutes.getRoutes());

    router.use("/api/rooms", RoomsRoutes.getRoutes());
    router.use("/api/showtimes", ShowtimesRoutes.getRoutes());
    router.use("/api/seats", SeatsRoutes.getRoutes());

    router.use("/api/reservations", ReservationsRoutes.getRoutes());

    return router;
  }
}
