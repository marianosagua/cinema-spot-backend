import { Router } from "express";
import { ShowtimesController } from "./showtimes.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ShowtimesService } from "../services/showtimes.service";

export class ShowtimesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const showtimeService = new ShowtimesService();
    const showtimesController = new ShowtimesController(showtimeService);

    router.get("/", AuthMiddleware.isAdmin, showtimesController.getShowtimes);
    router.get("/:id", showtimesController.getShowtimeById);
    router.get("/movie/:movieId", showtimesController.getShowtimesByMovie);
    router.post(
      "/",
      AuthMiddleware.isAdmin,
      showtimesController.createShowtime
    );
    router.put(
      "/:id",
      AuthMiddleware.isAdmin,
      showtimesController.updateShowtime
    );
    router.delete(
      "/:id",
      AuthMiddleware.isAdmin,
      showtimesController.deleteShowtime
    );

    return router;
  }
}
