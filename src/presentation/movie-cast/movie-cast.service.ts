import { prismaClient } from "../../data/postgres/client-connection";
import { MovieCast } from "../../interfaces";
import { CustomError } from "../../domain/errors/CustomErrors";

/**
 * Servicio para la gestión del reparto de películas (movie cast).
 * Proporciona métodos para consultar, crear y eliminar relaciones entre películas y actores.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class MovieCastService {
  /**
   * Obtiene todas las relaciones de reparto.
   * @returns {Promise<MovieCast[]>} Lista de relaciones película-actor.
   */
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

  /**
   * Obtiene una relación de reparto por IDs de película y actor.
   * @param {number} movie - ID de la película.
   * @param {number} actor - ID del actor.
   * @returns {Promise<MovieCast | null>} Relación encontrada o null.
   * @throws {CustomError} Si no se encuentra la relación.
   */
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

  /**
   * Obtiene todas las relaciones de reparto para una película.
   * @param {number} movie - ID de la película.
   * @returns {Promise<MovieCast[]>} Lista de relaciones para la película.
   */
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

  /**
   * Crea una nueva relación de reparto.
   * @param {{ movie: number; actor: number }} data - IDs de película y actor.
   * @returns {Promise<MovieCast>} Relación creada.
   */
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

  /**
   * Elimina una relación de reparto por IDs de película y actor.
   * @param {number} movie - ID de la película.
   * @param {number} actor - ID del actor.
   * @returns {Promise<void>} No retorna valor.
   */
  async delete(movie: number, actor: number): Promise<void> {
    await prismaClient.movie_cast.delete({
      where: { movie_actor: { movie, actor } },
    });
  }
}
