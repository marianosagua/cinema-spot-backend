import { Request, Response } from "express";
import { SeatsService } from "../services/seats.service";
import { handleError } from "../../domain/errors";

export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  getSeats = async (req: Request, res: Response) => {
    try {
      const seats = await this.seatsService.getSeats();
      res.json(seats);
    } catch (error) {
      handleError(error, res);
    }
  };

  getSeatById = async (req: Request, res: Response) => {
    try {
      const seat = await this.seatsService.getSeatById(req.params.id);
      res.json(seat);
    } catch (error) {
      handleError(error, res);
    }
  };

  getSeatsByRoom = async (req: Request, res: Response) => {
    try {
      const seats = await this.seatsService.getSeatsByRoom(req.params.name);
      res.json(seats);
    } catch (error) {
      handleError(error, res);
    }
  };

  updateSeat = async (req: Request, res: Response) => {
    try {
      const seat = await this.seatsService.updateSeat(req.params.id, req.body);
      res.json(seat);
    } catch (error) {
      handleError(error, res);
    }
  };

  createSeat = async (req: Request, res: Response) => {
    try {
      const seat = await this.seatsService.createSeat(req.body);
      res.json(seat);
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteSeat = async (req: Request, res: Response) => {
    try {
      await this.seatsService.deleteSeat(req.params.id);
      res.status(204).send();
    } catch (error) {
      handleError(error, res);
    }
  };
}
