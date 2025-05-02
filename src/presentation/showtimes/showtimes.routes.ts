/**
 * Rutas del módulo de funciones/horarios (Showtimes)
 *
 * Este archivo define las rutas para la gestión de funciones de películas (showtimes).
 * Incluye:
 *   - Listado de funciones (solo admin)
 *   - Consulta de función por ID
 *   - Consulta de funciones por película
 *   - Creación, actualización y eliminación de funciones (solo admin)
 *
 * Middlewares:
 *   - AuthMiddleware.isAdmin: Protege las rutas de administración de funciones.
 *
 * Estructura de rutas:
 *   GET    /              -> Listar todas las funciones (admin)
 *   GET    /:id           -> Obtener función por ID
 *   GET    /movie/:movieId-> Obtener funciones por película
 *   POST   /              -> Crear función (admin)
 *   PUT    /:id           -> Actualizar función (admin)
 *   DELETE /:id           -> Eliminar función (admin)
 */

import { Router } from "express";
import { ShowtimesController } from "./showtimes.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ShowtimesService } from "./showtimes.service";

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
