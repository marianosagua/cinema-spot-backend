import { Request, Response } from "express";

export class ReservtionsController {
  static getReservations = async (req: Request, res: Response) => {
    res.send("Get reservations");
  };

  static getReservation = async (req: Request, res: Response) => {
    res.send("Get reservation");
  };

  static addReservation = async (req: Request, res: Response) => {
    try {
      
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  static deleteReservation = async (req: Request, res: Response) => {
    res.send("Delete reservation");
  };
}
