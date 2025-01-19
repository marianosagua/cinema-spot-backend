import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors/CustomErrors";
import { Movie } from "../../interfaces";

export class MoviesService {
  async getMovies() {
    try {
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

      const transformedMovies = movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        category: movie.categories?.name,
      }));

      return transformedMovies;
    } catch (error) {
      throw CustomError.internalServer("Error getting movies");
    }
  }

  async getMovie(id: string) {
    try {
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
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer("Error getting movie");
    }
  }

  async addMovie(movie: Movie) {
    try {
      await prismaClient.movies.create({
        data: {
          title: movie.title,
          description: movie.description,
          poster: movie.poster,
          category: movie.category,
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Error adding movie");
    }
  }

  async updateMovie(movie: Movie) {
    try {
      await prismaClient.movies.update({
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
    } catch (error) {
      throw CustomError.internalServer("Error updating movie");
    }
  }

  async deleteMovie(id: string) {
    try {
      await prismaClient.movies.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Error deleting movie");
    }
  }
}
