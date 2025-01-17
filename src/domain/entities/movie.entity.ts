import { prismaClient } from "../../data/postgres/client-connection";
import { Movie } from "../../interfaces/movie";

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

    if (!data.id) {
      throw new Error("ID is required");
    }

    try {
      category = await prismaClient.categories.findFirst({
        where: {
          name: data.category,
        },
      });
    } catch (error) {
      throw new Error("Category not found");
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
