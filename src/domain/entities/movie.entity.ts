import { prismaClient } from "../../data/postgres/client-connection";
import { Movie } from "../../interfaces/movie";
import { CustomError } from "../errors";

export class MovieEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public poster: string,
    public category: string
  ) {}

  static async create(data: { [key: string]: any }): Promise<Movie> {
    let category;

    if (!data.title) {
      throw CustomError.badRequest("Title is required");
    }

    if (!data.description) {
      throw CustomError.badRequest("Description is required");
    }

    if (!data.poster) {
      throw CustomError.badRequest("Poster is required");
    }

    if (!data.category) {
      throw CustomError.badRequest("Category is required");
    }

    category = await prismaClient.categories.findFirst({
      where: {
        name: data.category,
      },
    });

    if (!category) {
      throw new Error("Category not found in DB");
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      poster: data.poster,
      category: category?.id || 0,
    };
  }
}
