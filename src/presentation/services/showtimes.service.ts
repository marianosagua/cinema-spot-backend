import { prismaClient } from "../../data/postgres/client-connection";
import { CreateShowtimeDto } from "../../domain/dtos/showtimes/create-showtime.dto";
import { CustomError } from "../../domain/errors";
import { Showtime } from "../../interfaces";

export class ShowtimesService {
  async getShowtimes() {
    const showtimes = await prismaClient.showtimes.findMany({
      select: {
        id: true,
        movies: {
          select: {
            title: true,
          },
        },
        start_time: true,
        end_time: true,
        rooms: {
          select: {
            name: true,
          },
        },
        is_full: true,
      },
    });

    if (!showtimes) {
      throw CustomError.notFound("Showtimes not found");
    }

    const transformedShowtimes = showtimes.map((showtime) => ({
      id: showtime.id,
      movie: showtime.movies?.title,
      start_time: showtime.start_time.toISOString().substring(11, 19),
      end_time: showtime.end_time.toISOString().substring(11, 19),
      room: showtime.rooms?.name,
      is_full: showtime.is_full,
    }));

    return transformedShowtimes;
  }

  async getShowtimesById(id: string) {
    const showtime = await prismaClient.showtimes.findUnique({
      where: {
        id,
      },
    });

    if (!showtime) {
      throw CustomError.notFound("Showtime not found");
    }

    const movieTitle = await prismaClient.movies.findFirst({
      where: {
        id: showtime.movie!,
      },
      select: {
        title: true,
      },
    });

    if (!movieTitle) {
      throw new Error("Movie not found in DB");
    }

    const roomName = await prismaClient.rooms.findFirst({
      where: {
        id: showtime.room,
      },
      select: {
        name: true,
      },
    });

    if (!roomName) {
      throw CustomError.notFound("Room not found");
    }

    return {
      id: showtime.id,
      movie: movieTitle?.title,
      start_time: showtime.start_time.toISOString().substring(11, 19),
      end_time: showtime.end_time.toISOString().substring(11, 19),
      room: roomName?.name,
      is_full: showtime.is_full,
    };
  }

  async getShowtimesByMovie(movieId: string) {
    const showtimes = await prismaClient.showtimes.findMany({
      where: {
        movie: parseInt(movieId, 10),
      },
      select: {
        id: true,
        start_time: true,
        end_time: true,
        rooms: {
          select: {
            name: true,
          },
        },
        is_full: true,
      },
    });

    if (!showtimes) {
      throw CustomError.notFound("Showtimes not found");
    }

    const transformedShowtimes = showtimes.map((showtime) => ({
      id: showtime.id,
      start_time: showtime.start_time.toISOString().substring(11, 19),
      end_time: showtime.end_time.toISOString().substring(11, 19),
      room: showtime.rooms?.name,
      is_full: showtime.is_full,
    }));

    return transformedShowtimes;
  }

  async createShowtime(showtime: CreateShowtimeDto) {
    const movieCreated = await prismaClient.showtimes.create({
      data: {
        movie: showtime.movieId,
        start_time: showtime.startTime,
        end_time: showtime.endTime,
        room: showtime.roomId,
      },
    });

    if (!movieCreated) {
      throw new Error("Error creating showtime");
    }
  }

  async updateShowtime(id: string, showtimeUpdated: Showtime) {
    const showtime = await prismaClient.showtimes.update({
      where: {
        id,
      },
      data: {
        start_time: showtimeUpdated.start_time,
        end_time: showtimeUpdated.end_time,
        room: showtimeUpdated.room,
        is_full: showtimeUpdated.is_full,
      },
    });

    if (!showtime) {
      throw CustomError.notFound("Showtime not found");
    }
  }

  async deleteShowtime(id: string) {
    const showtimeDeleted = await prismaClient.showtimes.delete({
      where: {
        id,
      },
    });

    if (!showtimeDeleted) {
      throw CustomError.notFound("Showtime not found");
    }
  }
}
