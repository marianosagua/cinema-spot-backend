import { Router } from "express";
import { ReservtionsController } from "./reservations.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ReservationsRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.get(
      "/get-all-reservations",
      AuthMiddleware.isAdmin,
      ReservtionsController.getReservations
    );
    router.get("/get-user-reservations", ReservtionsController.getReservation);
    router.post("/add-reservation", ReservtionsController.addReservation);
    router.delete(
      "/delete-reservation",
      ReservtionsController.deleteReservation
    );

    return router;
  }
}
