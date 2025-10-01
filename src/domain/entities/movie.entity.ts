import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../errors";
import { Showtime } from "../../interfaces";

export class MovieEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public poster: string,
    public category: string
  ) {}

  static async create(data: { [key: string]: any }): Promise<Movie> {
    const category = await prismaClient.categories.findFirst({
      where: {
        id: data.category,
      },
    });

    if(!data.title){
      throw CustomError.badRequest("El título es requerido");
    }
    if(!data.description){
      throw CustomError.badRequest("La descripción es requerida");
    }
    if(!data.poster){
      throw CustomError.badRequest("El póster es requerido");
    }
    if(!data.category){
      throw CustomError.badRequest("La categoría es requerida");
    }
    if(!data.duration){
      throw CustomError.badRequest("La duración es requerida");
    }
    if(!data.banner){
      throw CustomError.badRequest("El banner es requerido");
    }
    if(!data.synopsis){
      throw CustomError.badRequest("La sinopsis es requerida");
    }
    if(!data.trailer){
      throw CustomError.badRequest("El trailer es requerido");
    }
    if(!data.director){
      throw CustomError.badRequest("El director es requerido");
    }
    if(!data.rating){
      throw CustomError.badRequest("La calificación es requerida");
    }
    if(!data.review){
      throw CustomError.badRequest("La reseña es requerida");
    }
    if(!data.showtimes){
      throw CustomError.badRequest("Los horarios son requeridos");
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
