import { Router } from "express";
import { ShowtimesController } from "./showtimes.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ShowtimesService } from "../services/showtimes.service";

export class ShowtimesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const showtimeService = new ShowtimesService();
    const showtimesController = new ShowtimesController(showtimeService);

    router.get("/", AuthMiddleware.isAdmin, showtimesController.getAll);
    router.get("/:id", showtimesController.getById);
    router.get("/movie/:movieId", showtimesController.getAllByMovie);
    router.post("/", AuthMiddleware.isAdmin, showtimesController.create);
    router.put("/:id", AuthMiddleware.isAdmin, showtimesController.update);
    router.delete("/:id", AuthMiddleware.isAdmin, showtimesController.delete);

    return router;
  }
}
