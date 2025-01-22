import { prismaClient } from "../../../data/postgres/client-connection";
import { Showtime } from "../../../interfaces";

export class CreateShowtimeDto {
  constructor(
    public movieId: number,
    public startTime: string,
    public endTime: string,
    public roomId: string
  ) {}

  static async fromRequest(
    body: Showtime
  ): Promise<[string?, CreateShowtimeDto?]> {
    const { movie, start_time, end_time, room } = body;

    if (!movie) {
      return ["Movie is required"];
    }

    if (!start_time) {
      return ["Start time is required"];
    }

    if (!end_time) {
      return ["End time is required"];
    }

    if (!room) {
      return ["Room is required"];
    }

    const movieFound = await prismaClient.movies.findFirst({
      where: {
        title: body.movie,
      },
    });

    if (!movieFound) {
      throw new Error("Movie not found in DB");
    }

    const roomFound = await prismaClient.rooms.findFirst({
      where: {
        name: body.room,
      },
    });

    if (!roomFound) {
      throw new Error("Room not found in DB");
    }

    return [
      undefined,
      new CreateShowtimeDto(movieFound.id, start_time, end_time, roomFound.id),
    ];
  }
}
