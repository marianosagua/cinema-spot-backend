import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RoomsService } from "../services";
import { RoomsController } from "./rooms.controller";

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
