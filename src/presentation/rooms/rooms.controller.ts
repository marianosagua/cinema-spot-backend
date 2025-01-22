import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { RoomsService } from "../services";

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
      res.status(201).json({ message: "Room created successfully", room });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateRoom = async (req: Request, res: Response) => {
    try {
      const room = await this.roomsService.updateRoom(req.params.id, req.body);
      res.status(200).json({ message: "Room updated successfully", room });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteRoom = async (req: Request, res: Response) => {
    try {
      await this.roomsService.deleteRoom(req.params.id);
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
