import { Router } from "express";
import { MovieCastService } from "./movie-cast.service";
import { MovieCastController } from "./movie-cast.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class MovieCastRoutes {
  static getRoutes(): Router {
    const router = Router();
    const service = new MovieCastService();
    const controller = new MovieCastController(service);

    router.get("/", controller.getAll);
    router.get("/:movie/:actor", controller.getById);
    router.get("/movie/:movieId", controller.getByMovieId);
    router.post("/", AuthMiddleware.isAdmin, controller.create);
    router.delete("/:movie/:actor", AuthMiddleware.isAdmin, controller.delete);

    return router;
  }
}
