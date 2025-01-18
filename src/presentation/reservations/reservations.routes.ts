import { Router } from "express";
import { ReservationsController } from "./reservations.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ReservationsService } from "../services";

export class ReservationsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const reservationsService = new ReservationsService();
    const reservationsController = new ReservationsController(
      reservationsService
    );

    router.get(
      "/",
      AuthMiddleware.isAdmin,
      reservationsController.getReservations
    );
    router.get(
      "/:id",
      AuthMiddleware.isAdmin,
      reservationsController.getReservationById
    );
    router.post("/", reservationsController.addReservation);
    router.delete("/:id", reservationsController.deleteReservation);

    return router;
  }
}
