import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";

/**
 * Servicio para la gestión de categorías de películas.
 * Proporciona métodos para consultar, crear, actualizar y eliminar categorías en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class CategoriesService {
  /**
   * Obtiene todas las categorías existentes.
   * @returns {Promise<any[]>} Lista de categorías.
   * @throws {CustomError} Si no se encuentran categorías.
   */
  async getCategories() {
    const categories = await prismaClient.categories.findMany();
    if (!categories) {
      throw CustomError.notFound("Categories not found");
    }
    return categories;
  }

  /**
   * Obtiene una categoría por su ID.
   * @param {number} id - ID de la categoría.
   * @returns {Promise<any>} Categoría encontrada.
   * @throws {CustomError} Si la categoría no existe.
   */
  async getCategoryById(id: number) {
    const category = await prismaClient.categories.findFirst({
      where: { id },
    });
    if (!category) {
      throw CustomError.notFound("Category not found");
    }
    return category;
  }

  /**
   * Crea una nueva categoría.
   * @param {{ name: string }} data - Datos de la nueva categoría.
   * @returns {Promise<any>} Categoría creada.
   * @throws {Error} Si ocurre un error al crear la categoría.
   */
  async createCategory(data: { name: string }) {
    const category = await prismaClient.categories.create({
      data,
    });
    if (!category) {
      throw new Error("Error creating category");
    }
    return category;
  }

  /**
   * Actualiza una categoría existente por su ID.
   * @param {number} id - ID de la categoría.
   * @param {{ name: string }} data - Datos actualizados.
   * @returns {Promise<any>} Categoría actualizada.
   * @throws {CustomError} Si la categoría no existe.
   */
  async updateCategory(id: number, data: { name: string }) {
    const category = await prismaClient.categories.update({
      where: { id },
      data,
    });
    if (!category) {
      throw CustomError.notFound("Category not found");
    }
    return category;
  }

  /**
   * Elimina una categoría por su ID.
   * @param {number} id - ID de la categoría.
   * @returns {Promise<any>} Categoría eliminada.
   * @throws {CustomError} Si la categoría no existe.
   */
  async deleteCategory(id: number) {
    const category = await prismaClient.categories.delete({
      where: { id },
    });
    if (!category) {
      throw CustomError.notFound("Category not found");
    }
    return category;
  }
}
