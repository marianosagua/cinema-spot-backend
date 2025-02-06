import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RoomsService } from "../services";
import { RoomsController } from "./rooms.controller";

/**
 * Configures and returns an Express router for managing room-related endpoints.
 *
 * This static method instantiates the necessary service and controller objects, and sets up the following RESTful endpoints:
 *
 * - GET "/"         : Retrieves a list of all available rooms.
 * - GET "/:id"      : Retrieves details of a specific room by its unique identifier.
 * - POST "/"        : Creates a new room. This route is secured with admin authorization.
 * - PUT "/:id"      : Updates an existing room identified by its unique identifier. This route is secured with admin authorization.
 * - DELETE "/:id"   : Deletes a room specified by its unique identifier. This route is secured with admin authorization.
 *
 * The admin authorization is enforced using the AuthMiddleware on routes that modify data (POST, PUT, DELETE).
 *
 * @public
 * @static
 * @returns {Router} A fully configured Express Router instance containing all room management routes.
 */
export class RoomsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const roomsService = new RoomsService();
    const roomsController = new RoomsController(roomsService);

    router.get("/", roomsController.getRooms);
    router.get("/:id", roomsController.getRoomById);
    router.post("/", AuthMiddleware.isAdmin, roomsController.createRoom);
    router.put("/:id", AuthMiddleware.isAdmin, roomsController.updateRoom);
    router.delete("/:id", AuthMiddleware.isAdmin, roomsController.deleteRoom);

    return router;
  }
}
