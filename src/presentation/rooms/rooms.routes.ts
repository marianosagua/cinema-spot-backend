/**
 * Rutas del módulo de salas (Rooms)
 *
 * Este archivo define las rutas para la gestión de salas de cine.
 * Incluye:
 *   - Listado de salas
 *   - Consulta de sala por ID
 *   - Creación, actualización y eliminación de salas (solo admin)
 *
 * Middlewares:
 *   - AuthMiddleware.isAdmin: Protege las rutas de administración de salas.
 *
 * Estructura de rutas:
 *   GET    /        -> Listar todas las salas
 *   GET    /:id     -> Obtener sala por ID
 *   POST   /        -> Crear sala (admin)
 *   PUT    /:id     -> Actualizar sala (admin)
 *   DELETE /:id     -> Eliminar sala (admin)
 */

import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

export class RoomsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const roomsService = new RoomsService();
    const roomsController = new RoomsController(roomsService);

    router.get("/", roomsController.getRooms);
    router.get("/:id", roomsController.getRoomById);
    router.post("/", AuthMiddleware.isAdmin, roomsController.createRoom);
    router.put("/:id", AuthMiddleware.isAdmin, roomsController.updateRoom);
    router.delete("/:id", AuthMiddleware.isAdmin, roomsController.deleteRoom);

    return router;
  }
}
