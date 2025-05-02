/**
 * Rutas del módulo de asientos (Seats)
 *
 * Este archivo define las rutas para la gestión de asientos en las salas de cine.
 * Incluye:
 *   - Listado de asientos
 *   - Consulta de asiento por ID
 *   - Consulta de asientos por sala
 *   - Creación, actualización y eliminación de asientos
 *
 * Estructura de rutas:
 *   GET    /           -> Listar todos los asientos
 *   GET    /:id        -> Obtener asiento por ID
 *   GET    /room/:name -> Obtener asientos por nombre de sala
 *   PUT    /:id        -> Actualizar asiento
 *   POST   /           -> Crear asiento
 *   DELETE /:id        -> Eliminar asiento
 */

import { Router } from "express";
import { SeatsService } from "./seats.service";
import { SeatsController } from "./seats.controller";

export class SeatsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const seatsService = new SeatsService();
    const seatsController = new SeatsController(seatsService);

    router.get("/", seatsController.getSeats);
    router.get("/:id", seatsController.getSeatById);
    router.get("/room/:name", seatsController.getSeatsByRoom);
    router.put("/:id", seatsController.updateSeat);
    router.post("/", seatsController.createSeat);
    router.delete("/:id", seatsController.deleteSeat);

    return router;
  }
}
