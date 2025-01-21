import { Request, Response } from "express";
import { SeatsService } from "../services/seats.service";
import { handleError } from "../../domain/errors";

export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  getSeats = async (req: Request, res: Response) => {
    try {
      const seats = await this.seatsService.getSeatsByRoom(req.params.room);
      res.json(seats);
    } catch (error) {
      handleError(error, res);
    }
  };

  getRoomByName = async (req: Request, res: Response) => {
    try {
      const rooms = await this.seatsService.getRoomByName(req.params.name);
      res.json(rooms);
    } catch (error) {
      handleError(error, res);
    }
  };
}
