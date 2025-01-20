import { Request, Response } from "express";
import { SeatsService } from "../services/seats.service";

export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  getSeats = async (req: Request, res: Response) => {
    try {
      const seats = await this.seatsService.getSeatsByRoom(req.params.room);
      res.json(seats);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getRoomByName = async (req: Request, res: Response) => {
    try {
      const rooms = await this.seatsService.getRoomByName(req.params.name);
      res.json(rooms);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}
