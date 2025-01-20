import { Router } from "express";
import { SeatsService } from "../services/seats.service";
import { SeatsController } from "./seats.controller";

export class SeatsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const seatsService = new SeatsService();
    const seatsController = new SeatsController(seatsService);

    router.get("/rooms/:name", seatsController.getRoomByName);
    router.get("/:room", seatsController.getSeats);

    return router;
  }
}
