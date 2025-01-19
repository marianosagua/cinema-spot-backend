import { Router } from "express";
import { MoviesController } from "./movies.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MoviesService } from "../services/movies.service";

export class MoviesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const moviesService = new MoviesService();
    const moviesController = new MoviesController(moviesService);

    router.get("/", moviesController.getMovies);
    router.get("/:id", moviesController.getMovie);  
    router.post("/", AuthMiddleware.isAdmin, moviesController.addMovie);
    router.put("/", AuthMiddleware.isAdmin, moviesController.updateMovie);
    router.delete("/:id", AuthMiddleware.isAdmin, moviesController.deleteMovie);

    return router;
  }
}
