import { prismaClient } from "../../data/postgres/client-connection";
import { MovieEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/CustomErrors";
import { Movie } from "../../interfaces";

export class MoviesService {
  async getMovies() {
    try {
      const movies = await prismaClient.movies.findMany({
        select: {
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

  async addMovie(movie: Movie) {
    try {
      await prismaClient.movies.create({
        data: {
          title: movie.title,
          description: movie.description,
          poster: movie.poster,
          category_id: movie.category,
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
          category_id: movie.category,
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Error updating movie");
    }
  }

  async deleteMovie(id: number) {
    try {
      await prismaClient.movies.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Error deleting movie");
    }
  }
}
