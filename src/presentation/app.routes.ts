/**
 * Configuración central de rutas para la aplicación CinemaSpot
 *
 * Este archivo centraliza todas las rutas de la API del backend.
 * Cada línea registra un módulo específico con su prefijo de ruta.
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
import { ActorsRoutes } from "./actors/actors.routes";

/**
 * Clase que centraliza todas las rutas de la aplicación
 */
export class AppRoutes {
  /**
   * Configura y devuelve todas las rutas de la aplicación
   * @returns Router con todas las rutas registradas
   */
  static getRoutes(): Router {
    const router = Router();

    // Autenticación y gestión de usuarios
    router.use("/api/auth", AuthRoutes.getRoutes()); // Login, registro, validación de email, reset password
    router.use("/api/users", UsersRoutes.getRoutes()); // CRUD de usuarios, perfiles, gestión de cuentas
    router.use("/api/roles", RolesRoutes.getRoutes()); // Gestión de roles y permisos

    // Gestión de contenido cinematográfico
    router.use("/api/movies", MoviesRoutes.getRoutes()); // CRUD de películas, información, trailers
    router.use("/api/categories", CategoriesRoutes.getRoutes()); // Géneros cinematográficos
    router.use("/api/actors", ActorsRoutes.getRoutes()); // CRUD de actores (solo admin)
    router.use("/api/movie-cast", MovieCastRoutes.getRoutes()); // Relación películas-actores
    router.use("/api/future-releases", FutureReleasesRoutes.getRoutes()); // Próximos estrenos

    // Gestión de salas y proyecciones
    router.use("/api/rooms", RoomsRoutes.getRoutes()); // CRUD de salas de cine
    router.use("/api/showtimes", ShowtimesRoutes.getRoutes()); // Horarios de proyección
    router.use("/api/seats", SeatsRoutes.getRoutes()); // Gestión de asientos por sala

    // Sistema de reservas
    router.use("/api/reservations", ReservationsRoutes.getRoutes()); // Reservas de asientos para funciones

    return router;
  }
}
