import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { CategoriesService } from "./categories.service";

/**
 * Controlador de categorías.
 * Gestiona la consulta, creación, actualización y eliminación de categorías de películas.
 * Utiliza CategoriesService para la lógica de negocio.
 *
 * Métodos:
 * - getCategories: Lista todas las categorías.
 * - getCategoryById: Obtiene una categoría por su ID.
 * - createCategory: Crea una nueva categoría a partir del cuerpo de la petición.
 * - updateCategory: Actualiza una categoría existente por ID.
 * - deleteCategory: Elimina una categoría por ID.
 */
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoriesService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      handleError(error, res);
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    try {
      const category = await this.categoriesService.getCategoryById(Number(req.params.id));
      res.status(200).json(category);
    } catch (error) {
      handleError(error, res);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoriesService.createCategory(req.body);
      res.status(201).json({ message: "Categoría creada exitosamente", category });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoriesService.updateCategory(Number(req.params.id), req.body);
      res.status(200).json({ message: "Categoría actualizada exitosamente", category });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      await this.categoriesService.deleteCategory(Number(req.params.id));
      res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
