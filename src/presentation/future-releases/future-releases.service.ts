import { prismaClient } from "../../data/postgres/client-connection";

/**
 * Service class that handles the business logic for future movie releases.
 *
 * This class provides methods to interact with the database for creating,
 * retrieving, updating, and deleting information about upcoming movie releases.
 * It utilizes Prisma ORM to communicate with the PostgreSQL database.
 */
export class FutureReleasesService {
  /**
   * Retrieves all future movie releases from the database.
   *
   * @returns A promise that resolves to an array of future release objects.
   * @throws Error if database operation fails.
   */
  public async getFutureReleases() {
    try {
      const futureReleases = await prismaClient.future_releases.findMany();
      return futureReleases;
    } catch (error) {
      throw new Error(`Error fetching future releases: ${error}`);
    }
  }

  /**
   * Retrieves a specific future release by its ID with related category information.
   *
   * @param id - The unique identifier of the future release to retrieve.
   * @returns A promise that resolves to the future release with its categories or null if not found.
   * @throws Error if database operation fails.
   */
  public async getFutureReleaseById(id: string) {
    try {
      const futureRelease = await prismaClient.future_releases.findFirst({
        where: { id: parseInt(id) },
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
          duration: true,
          banner: true,
          synopsis: true,
          trailer: true,
          director: true,
          rating: true,
          release_date: true,
        },
      });
      return futureRelease;
    } catch (error) {
      throw new Error(`Error fetching future release with ID ${id}: ${error}`);
    }
  }

  /**
   * Creates a new future release in the database.
   *
   * @param data - The data for the new future release, including title, description, poster, categoryId,
   *               duration, banner, synopsis, trailer, director, rating, and release_date.
   * @returns A promise that resolves when the future release is successfully created.
   * @throws Error if future release creation fails or required data is missing.
   */
  public async createFutureRelease(data: any) {
    try {
      const newFutureRelease = await prismaClient.future_releases.create({
        data: {
          title: data.title,
          description: data.description,
          poster: data.poster,
          categories: {
            connect: { id: data.categoryId },
          },
          duration: data.duration,
          banner: data.banner,
          synopsis: data.synopsis,
          trailer: data.trailer,
          director: data.director,
          rating: data.rating,
          release_date: data.release_date,
        },
      });
      if (!newFutureRelease) {
        throw new Error("Future release not created");
      }
    } catch (error) {
      throw new Error(`Error creating future release: ${error}`);
    }
  }

  /**
   * Updates an existing future release in the database.
   *
   * @param id - The unique identifier of the future release to update.
   * @param data - The updated data for the future release, including title, description, poster, categoryId,
   *               duration, banner, synopsis, trailer, director, rating, and release_date.
   * @returns A promise that resolves when the future release is successfully updated.
   * @throws Error if future release update fails or if the specified ID doesn't exist.
   */
  public async updateFutureRelease(id: string, data: any) {
    try {
      const updatedFutureRelease = await prismaClient.future_releases.update({
        where: { id: parseInt(id) },
        data: {
          title: data.title,
          description: data.description,
          poster: data.poster,
          categories: {
            connect: { id: data.categoryId },
          },
          duration: data.duration,
          banner: data.banner,
          synopsis: data.synopsis,
          trailer: data.trailer,
          director: data.director,
          rating: data.rating,
          release_date: data.release_date,
        },
      });
      if (!updatedFutureRelease) {
        throw new Error("Future release not updated");
      }
    } catch (error) {
      throw new Error(`Error updating future release with ID ${id}: ${error}`);
    }
  }

  /**
   * Deletes a future release from the database.
   *
   * @param id - The unique identifier of the future release to delete.
   * @returns A promise that resolves when the future release is successfully deleted.
   * @throws Error if deletion fails or if the specified ID doesn't exist.
   */
  public async deleteFutureRelease(id: string) {
    try {
      const deletedFutureRelease = await prismaClient.future_releases.delete({
        where: { id: parseInt(id) },
      });

      if (!deletedFutureRelease) {
        throw new Error("Future release not eliminated");
      }
    } catch (error) {
      throw new Error(`Error deleting future release with ID ${id}: ${error}`);
    }
  }
}
