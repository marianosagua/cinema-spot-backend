import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { CategoriesService } from "./categories.service";

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
      res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoriesService.updateCategory(Number(req.params.id), req.body);
      res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      await this.categoriesService.deleteCategory(Number(req.params.id));
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
