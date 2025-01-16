import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors/CustomErrors";

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

  async addMovie() {
    return { message: "Create movie" };
  }

  async updateMovie() {
    return { message: "Update movie" };
  }

  async deleteMovie() {
    return { message: "Delete movie" };
  }
}
