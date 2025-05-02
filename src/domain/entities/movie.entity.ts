// Entidad que representa una película en el dominio de la aplicación.
// Incluye validaciones y método de construcción a partir de datos crudos.
import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../errors";
import { Showtime } from "../../interfaces";

export class MovieEntity {
  /**
   * @param id Identificador único de la película
   * @param title Título de la película
   * @param description Descripción de la película
   * @param poster URL del póster de la película
   * @param category Categoría (nombre o id) de la película
   */
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public poster: string,
    public category: string
  ) {}

  /**
   * Crea una instancia de Movie validando los datos y resolviendo la categoría.
   * @param data Objeto con los datos de la película
   * @returns Objeto Movie validado y listo para usar
   * @throws CustomError si falta algún campo obligatorio
   */
  static async create(data: { [key: string]: any }): Promise<Movie> {
    const category = await prismaClient.categories.findFirst({
      where: {
        id: data.category,
      },
    });

    if(!data.title){
      throw CustomError.badRequest("Title is required");
    }
    if(!data.description){
      throw CustomError.badRequest("Description is required");
    }
    if(!data.poster){
      throw CustomError.badRequest("Poster is required");
    }
    if(!data.category){
      throw CustomError.badRequest("Category is required");
    }
    if(!data.duration){
      throw CustomError.badRequest("Duration is required");
    }
    if(!data.banner){
      throw CustomError.badRequest("Banner is required");
    }
    if(!data.synopsis){
      throw CustomError.badRequest("Synopsis is required");
    }
    if(!data.trailer){
      throw CustomError.badRequest("Trailer is required");
    }
    if(!data.director){
      throw CustomError.badRequest("Director is required");
    }
    if(!data.rating){
      throw CustomError.badRequest("Rating is required");
    }
    if(!data.review){
      throw CustomError.badRequest("Review is required");
    }
    if(!data.showtimes){
      throw CustomError.badRequest("Showtimes is required");
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      poster: data.poster,
      category: category?.id || 0,
      duration: data.duration,
      banner: data.banner,
      synopsis: data.synopsis,
      trailer: data.trailer,
      director: data.director,
      rating: data.rating,
      review: data.review,
      showtimes: data.showtimes,
    };
  }
}

// Interfaz que define la estructura de un objeto Movie
interface Movie {
  id: number;
  title: string;
  description: string;
  poster: string;
  category: number;
  duration: string;
  banner: string;
  synopsis: string;
  trailer: string;
  director: string;
  rating: string;
  review: number;
  showtimes: Showtime[];
}
