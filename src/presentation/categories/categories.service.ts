import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";

export class CategoriesService {
  async getCategories() {
    const categories = await prismaClient.categories.findMany();
    if (!categories) {
      throw CustomError.notFound("Categories not found");
    }
    return categories;
  }

  async getCategoryById(id: number) {
    const category = await prismaClient.categories.findFirst({
      where: { id },
    });
    if (!category) {
      throw CustomError.notFound("Category not found");
    }
    return category;
  }

  async createCategory(data: { name: string }) {
    const category = await prismaClient.categories.create({
      data,
    });
    if (!category) {
      throw new Error("Error creating category");
    }
    return category;
  }

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
