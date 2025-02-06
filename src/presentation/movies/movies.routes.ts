import { Router } from "express";
import { MoviesController } from "./movies.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MoviesService } from "../services/movies.service";

/**
 * MoviesRoutes class encapsulates the routing configuration for movie-related API endpoints.
 *
 * This class is responsible for creating and configuring an Express Router with endpoints to manage movies:
 *
 * - GET "/" - Retrieves a list of movies by invoking the MoviesController.getMovies method.
 * - GET "/:id" - Retrieves the details of a specific movie identified by the ":id" parameter, handled by MoviesController.getMovie.
 * - POST "/" - Creates a new movie entry. This endpoint is secured by admin authentication via AuthMiddleware.isAdmin and is handled by MoviesController.addMovie.
 * - PUT "/" - Updates a movie entry. This endpoint is also secured by admin authentication via AuthMiddleware.isAdmin and is handled by MoviesController.updateMovie.
 * - DELETE "/:id" - Deletes a specific movie identified by the ":id" parameter. This endpoint is secured by admin authentication via AuthMiddleware.isAdmin and is handled by MoviesController.deleteMovie.
 *
 * The router is constructed by first instantiating a MoviesService and a MoviesController, which together handle the business logic and translate HTTP requests to service calls.
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { MoviesRoutes } from './movies.routes';
 *
 * const app = express();
 * app.use('/api/movies', MoviesRoutes.getRoutes());
 * ```
 *
 * @public
 */
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
