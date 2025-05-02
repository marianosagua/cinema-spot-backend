/**
 * Rutas del módulo de reservas (Reservations)
 *
 * Este archivo define las rutas para la gestión de reservas de asientos en funciones.
 * Incluye:
 *   - Listado de todas las reservas (solo admin)
 *   - Consulta de reserva por ID
 *   - Consulta de reservas por usuario
 *   - Creación y eliminación de reservas
 *
 * Middlewares:
 *   - AuthMiddleware.isAdmin: Protege el listado general de reservas.
 *
 * Estructura de rutas:
 *   GET    /              -> Listar todas las reservas (admin)
 *   GET    /:id           -> Obtener reserva por ID
 *   GET    /user/:userId  -> Obtener reservas de un usuario
 *   POST   /              -> Crear una reserva
 *   DELETE /:id           -> Eliminar una reserva
 */

import { Router } from "express";
import { ReservationsController } from "./reservations.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ReservationsService } from "./reservations.service";

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
