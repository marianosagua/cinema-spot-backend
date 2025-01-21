import { Request, Response } from "express";
import { ShowtimesService } from "../services/showtimes.service";
import { handleError } from "../../domain/errors";

export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  getShowtimes = async (req: Request, res: Response) => {
    try {
      const showtimes = await this.showtimesService.getShowtimes();
      res.status(200).json(showtimes);
    } catch (error) {
      handleError(error, res);
    }
  };

  getShowtimeById = async (req: Request, res: Response) => {
    try {
      const showtime = await this.showtimesService.getShowtimesById(
        req.params.id
      );
      res.status(200).json(showtime);
    } catch (error) {
      handleError(error, res);
    }
  };

  getShowtimesByMovie = async (req: Request, res: Response) => {
    try {
      const showtimes = await this.showtimesService.getShowtimesByMovie(
        req.params.movieId
      );
      res.status(200).json(showtimes);
    } catch (error) {
      handleError(error, res);
    }
  };

  createShowtime = async (req: Request, res: Response) => {
    try {
      await this.showtimesService.createShowtime(req.body);
      res.status(200).json({ message: "Showtime created successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateShowtime = async (req: Request, res: Response) => {
    try {
      await this.showtimesService.updateShowtime(req.params.id, req.body);
      res.status(200).json({ message: "Showtime updated successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteShowtime = async (req: Request, res: Response) => {
    try {
      await this.showtimesService.deleteShowtime(req.params.id);
      res.status(200).json({ message: "Showtime deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
