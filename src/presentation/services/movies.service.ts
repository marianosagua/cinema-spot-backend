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
    }));

    return transformedMovies;
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
    };
  }

  async addMovie(movie: Movie) {
    const movieCreated = await prismaClient.movies.create({
      data: {
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        category: movie.category,
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
      throw new Error("Movie not deleted");
    }
  }
}
