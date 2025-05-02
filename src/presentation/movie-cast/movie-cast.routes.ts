/**
 * Rutas del módulo de reparto de películas (Movie Cast)
 *
 * Este archivo define las rutas para la gestión de la relación entre películas y actores.
 * Permite consultar el reparto de todas las películas, el reparto de una película específica,
 * o la relación entre una película y un actor concreto. También permite crear y eliminar
 * relaciones entre películas y actores (solo administradores).
 *
 * Middlewares:
 *   - AuthMiddleware.isAdmin: Protege las rutas de creación y eliminación de relaciones.
 *
 * Estructura de rutas:
 *   GET    /                   -> Listar todas las relaciones película-actor
 *   GET    /movie/:movieId     -> Listar el reparto de una película específica
 *   GET    /:movie/:actor      -> Obtener la relación específica entre una película y un actor
 *   POST   /                   -> Crear una relación película-actor (admin)
 *   DELETE /:movie/:actor      -> Eliminar una relación película-actor (admin)
 */

import { Router } from "express";
import { MovieCastService } from "./movie-cast.service";
import { MovieCastController } from "./movie-cast.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class MovieCastRoutes {
  static getRoutes(): Router {
    const router = Router();
    const service = new MovieCastService();
    const controller = new MovieCastController(service);

    router.get("/", controller.getAll);
    router.get("/movie/:movieId", controller.getByMovieId);
    router.get("/:movie/:actor", controller.getById);
    router.post("/", AuthMiddleware.isAdmin, controller.create);
    router.delete("/:movie/:actor", AuthMiddleware.isAdmin, controller.delete);

    return router;
  }
}
