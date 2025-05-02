import { prismaClient } from "../../data/postgres/client-connection";

/**
 * Servicio para la gestión de próximos estrenos (future releases).
 * Proporciona métodos para consultar, crear, actualizar y eliminar próximos estrenos en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class FutureReleasesService {
  /**
   * Obtiene todos los próximos estrenos.
   * @returns {Promise<any[]>} Lista de próximos estrenos.
   * @throws {Error} Si ocurre un error al consultar los datos.
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
   * Obtiene un próximo estreno por su ID.
   * @param {string} id - ID del próximo estreno.
   * @returns {Promise<any>} Próximo estreno encontrado.
   * @throws {Error} Si no se encuentra el próximo estreno.
   */
  public async getFutureReleaseById(id: string) {
    try {
      const futureRelease = await prismaClient.future_releases.findUnique({
        where: { id: parseInt(id) },
        include: {
          categories: true,
        },
      });

      if (!futureRelease) {
        throw new Error(`Future release with ID ${id} not found`);
      }

      return futureRelease;
    } catch (error) {
      throw new Error(`Error fetching future release with ID ${id}: ${error}`);
    }
  }

  /**
   * Crea un nuevo próximo estreno.
   * @param {any} data - Datos del próximo estreno.
   * @returns {Promise<void>} No retorna valor, lanza error si falla.
   * @throws {Error} Si ocurre un error al crear el próximo estreno.
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
   * Actualiza un próximo estreno existente por su ID.
   * @param {string} id - ID del próximo estreno.
   * @param {any} data - Datos actualizados.
   * @returns {Promise<void>} No retorna valor, lanza error si falla.
   * @throws {Error} Si ocurre un error al actualizar el próximo estreno.
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
   * Elimina un próximo estreno por su ID.
   * @param {string} id - ID del próximo estreno.
   * @returns {Promise<void>} No retorna valor, lanza error si falla.
   * @throws {Error} Si ocurre un error al eliminar el próximo estreno.
   */
  public async deleteFutureRelease(id: string) {
    try {
      const deletedFutureRelease = await prismaClient.future_releases.delete({
        where: { id: parseInt(id) },
      });
      if (!deletedFutureRelease) {
        throw new Error("Future release not deleted");
      }
    } catch (error) {
      throw new Error(`Error deleting future release with ID ${id}: ${error}`);
    }
  }
}
