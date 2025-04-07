import { prismaClient } from "../../data/postgres/client-connection";
import { Movie } from "../../interfaces/movie";
import { CustomError } from "../errors";

/**
 * Represents a movie entity with its associated properties, including title, description, poster, and category.
 *
 * @remarks
 * The MovieEntity class encapsulates the logic for validating input data and creating a movie record.
 * The static create method validates that all required properties (title, description, poster, and category)
 * are provided in the data object. It then retrieves the corresponding category from the database using the Prisma Client.
 *
 * If any required field is missing, a custom BadRequest error is thrown. Likewise, if the category is not found
 * in the database, an Error is thrown to indicate the absence of a valid category. On successful validation and retrieval
 * of the category, the method returns an object adhering to the expected Movie interface, where the category is represented
 * by its database identifier.
 *
 * @example
 * ```typescript
 * const movieData = {
 *   id: 1,
 *   title: "Inception",
 *   description: "A mind-bending thriller about dream invasion.",
 *   poster: "https://example.com/inception-poster.jpg",
 *   category: "Science Fiction"
 * };
 *
 * try {
 *   const movie = await MovieEntity.create(movieData);
 *   console.log("Movie created successfully:", movie);
 * } catch (error) {
 *   console.error("Error creating movie:", error);
 * }
 * ```
 *
 * @public
 */
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
