import { Response, Request } from "express";
import { MoviesService } from "../services/movies.service";
import { MovieEntity } from "../../domain/entities";
import { handleError } from "../../domain/errors";

export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  getMovies = async (req: Request, res: Response) => {
    try {
      const movies = await this.moviesService.getMovies();
      res.status(200).json(movies);
    } catch (error) {
      handleError(error, res);
    }
  };

  getMovie = async (req: Request, res: Response) => {
    try {
      const movie = await this.moviesService.getMovie(req.params.id);
      res.status(200).json(movie);
    } catch (error) {
      handleError(error, res);
    }
  };

  addMovie = async (req: Request, res: Response) => {
    try {
      const movie = await MovieEntity.create(req.body);
      await this.moviesService.addMovie(movie);
      res.status(200).json({ message: "Movie added successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateMovie = async (req: Request, res: Response) => {
    try {
      const movie = await MovieEntity.create(req.body);
      await this.moviesService.updateMovie(movie);
      res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteMovie = async (req: Request, res: Response) => {
    try {
      await this.moviesService.deleteMovie(req.params.id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
