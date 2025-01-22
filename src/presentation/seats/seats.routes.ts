import { Router } from "express";
import { SeatsService } from "../services/seats.service";
import { SeatsController } from "./seats.controller";

export class SeatsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const seatsService = new SeatsService();
    const seatsController = new SeatsController(seatsService);

    router.get("/", seatsController.getSeats);
    router.get("/:id", seatsController.getSeatById);
    router.put("/:id", seatsController.updateSeat);
    router.post("/", seatsController.createSeat);
    router.delete("/:id", seatsController.deleteSeat);

    return router;
  }
}
