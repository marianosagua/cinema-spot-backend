import { Request, Response } from "express";
import { ShowtimesService } from "./showtimes.service";
import { handleError } from "../../domain/errors";
import { CreateShowtimeDto } from "../../domain/dtos/showtimes/create-showtime.dto";

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
    const [error, showtime] = await CreateShowtimeDto.fromRequest(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      await this.showtimesService.createShowtime(showtime!);
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
