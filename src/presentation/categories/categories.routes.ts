import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoriesRoutes {
  static getRoutes(): Router {
    const router = Router();
    const categoriesService = new CategoriesService();
    const categoriesController = new CategoriesController(categoriesService);

    router.get("/", categoriesController.getCategories);
    router.get("/:id", categoriesController.getCategoryById);
    router.post("/", AuthMiddleware.isAdmin, categoriesController.createCategory);
    router.put("/:id", AuthMiddleware.isAdmin, categoriesController.updateCategory);
    router.delete("/:id", AuthMiddleware.isAdmin, categoriesController.deleteCategory);

    return router;
  }
}
