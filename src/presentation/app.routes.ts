/**
 * Configuración central de rutas para la aplicación CinemaSpot
 *
 * Este archivo actúa como punto central para la configuración y registro
 * de todas las rutas de la API del backend. Reúne todas las rutas específicas
 * de cada módulo y las expone a través de un único Router de Express.
 */

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

/**
 * Clase AppRoutes que centraliza todas las rutas de la aplicación
 *
 * Esta clase estática proporciona un método que configura y devuelve
 * un Router de Express con todas las rutas de la API organizadas por módulos.
 */
export class AppRoutes {
  /**
   * Método estático que configura y devuelve todas las rutas de la aplicación
   *
   * @returns Router de Express con todas las rutas registradas
   */
  static getRoutes(): Router {
    const router = Router();

    /**
     * Ruta raíz de la API que devuelve un mensaje de bienvenida
     */
    router.get("/", (req, res) => {
      res.status(200).json({
        msg: "API for Cinema",
      });
    });

    /**
     * Registro de rutas específicas para cada módulo de la aplicación
     *
     * Cada módulo tiene su propio Router que maneja las rutas específicas
     * relacionadas con esa funcionalidad (autenticación, usuarios, salas, etc.)
     */
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/users", UsersRoutes.routes);
    router.use("/api/rooms", RoomsRoutes.routes);
    router.use("/api/categories", CategoriesRoutes.routes);
    router.use("/api/movies", MoviesRoutes.routes);
    router.use("/api/roles", RolesRoutes.routes);
    router.use("/api/showtimes", ShowtimesRoutes.routes);
    router.use("/api/seats", SeatsRoutes.routes);
    router.use("/api/reservations", ReservationsRoutes.routes);
    router.use("/api/future-releases", FutureReleasesRoutes.routes);
    router.use("/api/movie-cast", MovieCastRoutes.routes);

    return router;
  }
}
