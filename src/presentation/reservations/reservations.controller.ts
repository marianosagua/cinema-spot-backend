import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { ReservationsService } from "./reservations.service";

/**
 * Controlador de reservas.
 * Gestiona la consulta, creación y eliminación de reservas de asientos.
 * Utiliza ReservationsService para la lógica de negocio.
 *
 * Métodos:
 * - getReservations: Lista todas las reservas.
 * - getReservationById: Obtiene una reserva por ID.
 * - getReservationsByUser: Lista reservas de un usuario.
 * - addReservation: Crea una nueva reserva.
 * - deleteReservation: Elimina una reserva por ID.
 */
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

  getReservationsByUser = async (req: Request, res: Response) => {
    try {
      const reservations = await this.reservationsService.getReservationsByUser(
        req.params.userId
      );
      res.json(reservations);
    } catch (error) {
      handleError(error, res);
    }
  };

  addReservation = async (req: Request, res: Response) => {
    try {
      await this.reservationsService.addReservation(req.body);
      res.json({ message: "Reserva agregada exitosamente" });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteReservation = async (req: Request, res: Response) => {
    try {
      await this.reservationsService.deleteReservation(req.params.id);
      res.json({ message: "Reserva eliminada exitosamente" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
