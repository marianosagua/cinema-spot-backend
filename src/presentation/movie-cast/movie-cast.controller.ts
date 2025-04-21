import { Request, Response } from "express";
import { MovieCastService } from "./movie-cast.service";
import { handleError } from "../../domain/errors/HandleError";

export class MovieCastController {
  constructor(private movieCastService: MovieCastService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const cast = await this.movieCastService.getAll();
      res.status(200).json(cast);
    } catch (error) {
      handleError(error, res);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { movie, actor } = req.params;
      const cast = await this.movieCastService.getById(Number(movie), Number(actor));
      res.status(200).json(cast);
    } catch (error) {
      handleError(error, res);
    }
  };

  getByMovieId = async (req: Request, res: Response) => {
    try {
      const cast = await this.movieCastService.getByMovieId(Number(req.params.movieId));
      res.status(200).json(cast);
    } catch (error) {
      handleError(error, res);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const cast = await this.movieCastService.create(req.body);
      res.status(201).json({ message: "Movie cast created successfully", cast });
    } catch (error) {
      handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { movie, actor } = req.params;
      await this.movieCastService.delete(Number(movie), Number(actor));
      res.status(200).json({ message: "Movie cast deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
