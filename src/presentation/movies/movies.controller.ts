import { Response, Request } from "express";
import { MoviesService } from "../services/movies.service";

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
    const movie = req.body;
    res.json(movie);
  };

  updateMovie = async (req: Request, res: Response) => {
    res.json({ message: "Update movie" });
  };

  deleteMovie = async (req: Request, res: Response) => {
    res.json({ message: "Delete movie" });
  };
}
