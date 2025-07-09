import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { RoomsService } from "./rooms.service";

/**
 * Controlador de salas.
 * Gestiona la consulta, creación, actualización y eliminación de salas de cine.
 * Utiliza RoomsService para la lógica de negocio.
 *
 * Métodos:
 * - getRooms: Lista todas las salas.
 * - getRoomById: Obtiene una sala por ID.
 * - createRoom: Crea una nueva sala.
 * - updateRoom: Actualiza una sala existente.
 * - deleteRoom: Elimina una sala por ID.
 */
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  getRooms = async (req: Request, res: Response) => {
    try {
      const rooms = await this.roomsService.getRooms();
      res.status(200).json(rooms);
    } catch (error) {
      handleError(error, res);
    }
  };

  getRoomById = async (req: Request, res: Response) => {
    try {
      const room = await this.roomsService.getRoomById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      handleError(error, res);
    }
  };

  createRoom = async (req: Request, res: Response) => {
    try {
      const room = await this.roomsService.createRoom(req.body);
      res.status(201).json({ message: "Sala creada exitosamente", room });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateRoom = async (req: Request, res: Response) => {
    try {
      const room = await this.roomsService.updateRoom(req.params.id, req.body);
      res.status(200).json({ message: "Sala actualizada exitosamente", room });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteRoom = async (req: Request, res: Response) => {
    try {
      await this.roomsService.deleteRoom(req.params.id);
      res.status(200).json({ message: "Sala eliminada exitosamente" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
