import { Request, Response } from "express";
import { ShowtimesService } from "../services/showtimes.service";

export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const showtimes = await this.showtimesService.getAll();
      res.status(200).json(showtimes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const showtime = await this.showtimesService.getById(req.params.id);
      res.status(200).json(showtime);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getAllByMovie = async (req: Request, res: Response) => {
    try {
      const showtimes = await this.showtimesService.getAllByMovie(
        req.params.movieId
      );
      res.status(200).json(showtimes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      await this.showtimesService.create(req.body);
      res.status(200).json({ message: "Showtime created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      await this.showtimesService.update(req.params.id, req.body);
      res.status(200).json({ message: "Showtime updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.showtimesService.delete(req.params.id);
      res.status(200).json({ message: "Showtime deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}
