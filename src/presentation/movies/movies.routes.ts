import { Router } from "express";
import { MoviesController } from "./movies.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MoviesService } from "../services/movies.service";

export class MoviesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const moviesService = new MoviesService();
    const moviesController = new MoviesController(moviesService);

    router.get("/get-movies", moviesController.getMovies);
    router.post(
      "/add-movie",
      AuthMiddleware.isAdmin,
      moviesController.addMovie
    );
    router.put(
      "/update-movie",
      AuthMiddleware.isAdmin,
      moviesController.updateMovie
    );

    router.delete(
      "/delete-movie",
      AuthMiddleware.isAdmin,
      moviesController.deleteMovie
    );

    return router;
  }
}
