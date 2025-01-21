import { Request, Response } from "express";
import { ReservationsService } from "../services";
import { handleError } from "../../domain/errors";

export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  getReservations = async (req: Request, res: Response) => {
    try {
      const reservations = await this.reservationsService.getReservations();
      res.json(reservations);
    } catch (error) {
      handleError(error, res);
    }
  };

  getReservationById = async (req: Request, res: Response) => {
    try {
      const reservation = await this.reservationsService.getReservation(
        req.params.id
      );
      res.json(reservation);
    } catch (error) {
      handleError(error, res);
    }
  };

  addReservation = async (req: Request, res: Response) => {
    try {
      await this.reservationsService.addReservation(req.body);
      res.json({ message: "Reservation added successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteReservation = async (req: Request, res: Response) => {
    try {
      await this.reservationsService.deleteReservation(req.params.id);
      res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
