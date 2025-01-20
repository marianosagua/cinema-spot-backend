import { prismaClient } from "../../data/postgres/client-connection";
import { Showtime } from "../../interfaces";

export class ShowtimesService {
  async getAll() {
    try {
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

      const transformedShowtimes = showtimes.map((showtime) => ({
        id: showtime.id,
        movie: showtime.movies?.title,
        start_time: showtime.start_time.toISOString().substring(11, 19),
        end_time: showtime.end_time.toISOString().substring(11, 19),
        room: showtime.rooms?.name,
        is_full: showtime.is_full,
      }));

      return transformedShowtimes;
    } catch (error) {
      throw new Error("Error occurred while fetching showtimes");
    }
  }

  async getById(id: string) {
    try {
      const showtime = await prismaClient.showtimes.findUnique({
        where: {
          id,
        },
      });

      if (!showtime) {
        throw new Error("Showtime not found");
      }

      const movieTitle = await prismaClient.movies.findUnique({
        where: {
          id: showtime.movie!,
        },
        select: {
          title: true,
        },
      });

      const roomName = await prismaClient.rooms.findFirst({
        where: {
          id: showtime.room,
        },
        select: {
          name: true,
        },
      });

      return {
        id: showtime.id,
        movie: movieTitle?.title,
        start_time: showtime.start_time.toISOString().substring(11, 19),
        end_time: showtime.end_time.toISOString().substring(11, 19),
        room: roomName?.name,
        is_full: showtime.is_full,
      };
    } catch (error) {
      throw new Error("Error occurred while fetching showtime");
    }
  }

  async getAllByMovie(movieId: string) {
    try {
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

      const transformedShowtimes = showtimes.map((showtime) => ({
        id: showtime.id,
        start_time: showtime.start_time.toISOString().substring(11, 19),
        end_time: showtime.end_time.toISOString().substring(11, 19),
        room: showtime.rooms?.name,
        is_full: showtime.is_full,
      }));

      return transformedShowtimes;
    } catch (error) {
      throw new Error("Error occurred while fetching showtimes");
    }
  }

  async create(showtime: Showtime) {
    try {
      const movieTitle = await prismaClient.movies.findFirst({
        where: {
          title: showtime.movie,
        },
      });

      await prismaClient.showtimes.create({
        data: {
          movie: movieTitle?.id,
          start_time: showtime.start_time,
          end_time: showtime.end_time,
          room: showtime.room,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error occurred while creating showtime");
    }
  }

  async update(id: string, showtimeUpdated: Showtime) {
    try {
      await prismaClient.showtimes.update({
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
    } catch (error) {
      throw new Error("Error occurred while updating showtime");
    }
  }

  async delete(id: string) {
    try {
      await prismaClient.showtimes.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Error occurred while deleting showtime");
    }
  }
}
