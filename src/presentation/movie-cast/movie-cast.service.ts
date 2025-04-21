import { prismaClient } from "../../data/postgres/client-connection";
import { MovieCast } from "../../interfaces";
import { CustomError } from "../../domain/errors/CustomErrors";

export class MovieCastService {
  async getAll(): Promise<MovieCast[]> {
    const cast = await prismaClient.movie_cast.findMany({
      include: { actors: true, movies: true },
    });
    return cast.map((c) => ({
      movie: c.movie,
      actor: c.actor,
      movieTitle: c.movies.title,
      actorFirstName: c.actors.first_name,
      actorLastName: c.actors.last_name,
    }));
  }

  async getById(movie: number, actor: number): Promise<MovieCast | null> {
    const cast = await prismaClient.movie_cast.findUnique({
      where: { movie_actor: { movie, actor } },
      include: { actors: true, movies: true },
    });
    if (!cast) throw CustomError.notFound("Movie cast not found");
    return {
      movie: cast.movie,
      actor: cast.actor,
      movieTitle: cast.movies.title,
      actorFirstName: cast.actors.first_name,
      actorLastName: cast.actors.last_name,
    };
  }

  async getByMovieId(movie: number): Promise<MovieCast[]> {
    const cast = await prismaClient.movie_cast.findMany({
      where: { movie },
      include: { actors: true, movies: true },
    });
    return cast.map((c) => ({
      movie: c.movie,
      actor: c.actor,
      movieTitle: c.movies.title,
      actorFirstName: c.actors.first_name,
      actorLastName: c.actors.last_name,
    }));
  }

  async create(data: { movie: number; actor: number }): Promise<MovieCast> {
    const cast = await prismaClient.movie_cast.create({
      data,
      include: { actors: true, movies: true },
    });
    return {
      movie: cast.movie,
      actor: cast.actor,
      movieTitle: cast.movies.title,
      actorFirstName: cast.actors.first_name,
      actorLastName: cast.actors.last_name,
    };
  }

  async delete(movie: number, actor: number): Promise<void> {
    await prismaClient.movie_cast.delete({
      where: { movie_actor: { movie, actor } },
    });
  }
}
