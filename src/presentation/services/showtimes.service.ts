import { prismaClient } from "../../data/postgres/client-connection";
import { Showtime } from "../../interfaces";

export class ShowtimesService {
  async getAll() {
    try {
      const showtimes = await prismaClient.showtimes.findMany({
        select: {
          movies: {
            select: {
              title: true,
            },
          },
          start_time: true,
          end_time: true,
          halls: {
            select: {
              hall_number: true,
            },
          },
          reservationscount: true,
        },
      });

      const transformedShowtimes = showtimes.map((showtime) => ({
        movie: showtime.movies?.title,
        start_time: showtime.start_time.toISOString().substring(11, 19),
        end_time: showtime.end_time.toISOString().substring(11, 19),
        hall: showtime.halls?.hall_number,
        reservationscount: showtime.reservationscount,
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

      const hallNumber = await prismaClient.halls.findUnique({
        where: {
          hall_number: showtime.hall!,
        },
        select: {
          hall_number: true,
        },
      });

      return {
        movie: movieTitle?.title,
        start_time: showtime.start_time.toISOString().substring(11, 19),
        end_time: showtime.end_time.toISOString().substring(11, 19),
        hall: hallNumber?.hall_number,
        reservationscount: showtime.reservationscount,
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
          start_time: true,
          end_time: true,
          halls: {
            select: {
              hall_number: true,
            },
          },
          reservationscount: true,
        },
      });

      const transformedShowtimes = showtimes.map((showtime) => ({
        start_time: showtime.start_time.toISOString().substring(11, 19),
        end_time: showtime.end_time.toISOString().substring(11, 19),
        hall: showtime.halls?.hall_number,
        reservationscount: showtime.reservationscount,
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
          hall: showtime.hall,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error occurred while creating showtime");
    }
  }

  async update(id: string, data: any) {
    try {
      await prismaClient.showtimes.update({
        where: {
          id,
        },
        data: {
          start_time: data.start_time,
          end_time: data.end_time,
          hall: data.hall,
          reservationscount: data.reservationscount,
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
