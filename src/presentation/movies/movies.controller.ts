import { Response, Request } from "express";
import { MoviesService } from "../services/movies.service";
import { MovieEntity } from "../../domain/entities";

export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  getMovies = async (req: Request, res: Response) => {
    try {
      const movies = await this.moviesService.getMovies();
      res.status(200).json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  addMovie = async (req: Request, res: Response) => {
    try {
      const movie = await MovieEntity.create(req.body);
      await this.moviesService.addMovie(movie);
      res.status(200).json({ message: "Movie added successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  updateMovie = async (req: Request, res: Response) => {
    try {
      const movie = await MovieEntity.create(req.body);
      await this.moviesService.updateMovie(movie);
      res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  deleteMovie = async (req: Request, res: Response) => {
    try {
      await this.moviesService.deleteMovie(req.body.id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}
