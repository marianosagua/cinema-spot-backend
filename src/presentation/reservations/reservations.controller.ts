import { Request, Response } from "express";
import { ReservationsService } from "../services";

export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  getReservations = async (req: Request, res: Response) => {
    try {
      const reservations = await this.reservationsService.getReservations();
      res.json(reservations);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getReservationById = async (req: Request, res: Response) => {
    try {
      const reservation = await this.reservationsService.getReservation(
        req.params.id
      );
      res.json(reservation);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  addReservation = async (req: Request, res: Response) => {
    try {
      await this.reservationsService.addReservation(req.body);
      res.json({ message: "Reservation added successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  deleteReservation = async (req: Request, res: Response) => {
    try {
      await this.reservationsService.deleteReservation(req.params.id);
      res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}
