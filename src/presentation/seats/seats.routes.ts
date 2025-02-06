import { Router } from "express";
import { SeatsService } from "../services/seats.service";
import { SeatsController } from "./seats.controller";

/**
 * @class SeatsRoutes
 * @description
 * Provides routing configuration for seat-related API endpoints within the Movie Reservation System.
 *
 * The static method `getRoutes` creates and configures an Express Router instance, setting up the following endpoints:
 * - GET "/" – Retrieves a list of all seats.
 * - GET "/:id" – Retrieves details for a specific seat by its unique identifier.
 * - GET "/room/:name" – Retrieves a list of seats filtered by the name of their associated room.
 * - PUT "/:id" – Updates the details of an existing seat identified by its unique identifier.
 * - POST "/" – Creates a new seat.
 * - DELETE "/:id" – Deletes a specific seat identified by its unique identifier.
 *
 * Internally, the method instantiates:
 * - A SeatsService to handle the business logic associated with seat operations.
 * - A SeatsController to handle incoming HTTP requests and map them to the appropriate service methods.
 *
 * @returns {Router} A fully configured Express Router instance with all seat-related routes mounted.
 */
export class SeatsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const seatsService = new SeatsService();
    const seatsController = new SeatsController(seatsService);

    router.get("/", seatsController.getSeats);
    router.get("/:id", seatsController.getSeatById);
    router.get("/room/:name", seatsController.getSeatsByRoom);
    router.put("/:id", seatsController.updateSeat);
    router.post("/", seatsController.createSeat);
    router.delete("/:id", seatsController.deleteSeat);

    return router;
  }
}
