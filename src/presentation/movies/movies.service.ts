import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Movie } from "../../interfaces";

export class MoviesService {
  async getMovies() {
    const movies = await prismaClient.movies.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        poster: true,
        categories: {
          select: {
            name: true,
          },
        },
        duration: true,
        banner: true,
        synopsis: true,
        trailer: true,
        director: true,
        rating: true,
        review: true,
        showtimes: {
          select: {
            id: true,
            start_time: true,
            end_time: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
            is_full: true,
          },
        },
      },
    });

    if (!movies) {
      throw CustomError.notFound("Movies not found");
    }

    const transformedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      poster: movie.poster,
      category: movie.categories?.name,
      duration: movie.duration,
      banner: movie.banner,
      synopsis: movie.synopsis,
      trailer: movie.trailer,
      director: movie.director,
      rating: movie.rating,
      review: movie.review,
      showtimes: movie.showtimes.map((showtime) => ({
        id: showtime.id,
        start_time: showtime.start_time,
        end_time: showtime.end_time,
        room: {
          id: showtime.rooms.id,
          name: showtime.rooms.name,
        },
        is_full: showtime.is_full,
      })),
    }));

    return transformedMovies.sort((a, b) => a.id - b.id);
  }

  async getMovie(id: string) {
    const movie = await prismaClient.movies.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        poster: true,
        categories: {
          select: {
            name: true,
          },
        },
        duration: true,
        banner: true,
        synopsis: true,
        trailer: true,
        director: true,
        rating: true,
        review: true,
        showtimes: {
          select: {
            id: true,
            start_time: true,
            end_time: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
            is_full: true,
          },
        },
      },
    });

    if (!movie) {
      throw CustomError.notFound("Movie not found");
    }

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      poster: movie.poster,
      category: movie.categories?.name,
      duration: movie.duration,
      banner: movie.banner,
      synopsis: movie.synopsis,
      trailer: movie.trailer,
      director: movie.director,
      rating: movie.rating,
      review: movie.review,
      showtimes: movie.showtimes.map((showtime) => ({
        id: showtime.id,
        start_time: showtime.start_time,
        end_time: showtime.end_time,
        room: {
          id: showtime.rooms.id,
          name: showtime.rooms.name,
        },
        is_full: showtime.is_full,
      })),
    };
  }

  async addMovie(movie: Movie) {
    const movieCreated = await prismaClient.movies.create({
      data: {
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        category: movie.category,
        duration: movie.duration,
        banner: movie.banner,
        synopsis: movie.synopsis,
        trailer: movie.trailer,
        director: movie.director,
        rating: movie.rating,
        review: movie.review,
        showtimes: {
          create: movie.showtimes.map((showtime) => ({
            start_time: showtime.start_time,
            end_time: showtime.end_time,
            is_full: showtime.is_full,
            rooms: {
              connect: {
                id: showtime.room,
              },
            },
          })),
        },
      },
    });

    if (!movieCreated) {
      throw new Error("Movie not added");
    }
  }

  async updateMovie(movie: Movie) {
    const movieUpdated = await prismaClient.movies.update({
      where: {
        id: movie.id,
      },
      data: {
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        category: movie.category,
        duration: movie.duration,
        banner: movie.banner,
        synopsis: movie.synopsis,
        trailer: movie.trailer,
        director: movie.director,
        rating: movie.rating,
        review: movie.review,
        showtimes: {
          update: movie.showtimes.map((showtime) => ({
            where: {
              id: showtime.id,
            },
            data: {
              start_time: showtime.start_time,
              end_time: showtime.end_time,
              is_full: showtime.is_full,
              rooms: {
                connect: {
                  id: showtime.room,
                },
              },
            },
          })),
        },
      },
    });

    if (!movieUpdated) {
      throw new Error("Movie not updated");
    }
  }

  async deleteMovie(id: string) {
    const deletedMovie = await prismaClient.movies.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deletedMovie) {
      throw new Error("La película no fue eliminada");
    }
  }
}
