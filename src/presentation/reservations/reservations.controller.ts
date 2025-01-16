import { Request, Response } from "express";

export class ReservtionsController {
  static getReservations = async (req: Request, res: Response) => {
    res.send("Get reservations");
  };

  static getReservation = async (req: Request, res: Response) => {
    res.send("Get reservation");
  };

  static addReservation = async (req: Request, res: Response) => {
    res.send("Add reservation");
  };

  static deleteReservation = async (req: Request, res: Response) => {
    res.send("Delete reservation");
  };
}
