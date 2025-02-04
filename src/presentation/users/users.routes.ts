import { Router } from "express";
import { UsersController } from "./users.controller";
import { UsersService } from "../services/users.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

/**
 * Class containing the route definitions for user-related endpoints.
 *
 * @remarks
 * This class provides a static method to generate an Express Router that handles
 * all CRUD operations related to users. It configures the following endpoints:
 *
 * - GET "/" to retrieve all users.
 * - GET "/:id" to retrieve a specific user by id.
 * - POST "/" to create a new user.
 * - PUT "/:id" to update an existing user by id.
 * - DELETE "/:id" to remove a user by id.
 *
 * The routes make use of a UsersService for business logic and a UsersController to handle
 * incoming requests and outgoing responses, adhering to the principles of separation of concerns.
 *
 * @example
 * Here's how to incorporate the generated router into an Express application:
 *
 *   import express from 'express';
 *   import { UsersRoutes } from './users.routes';
 *
 *   const app = express();
 *   app.use('/api/users', UsersRoutes.getRoutes());
 *
 * @public
 */
export class UsersRoutes {
  static getRoutes(): Router {
    const router = Router();
    const usersService = new UsersService();
    const usersController = new UsersController(usersService);

    router.get("/", AuthMiddleware.isAdmin, usersController.getUsers);

    router.get("/:id", usersController.getUserById);

    router.post("/", AuthMiddleware.isAdmin, usersController.createUser);

    router.put("/:id", AuthMiddleware.isAdmin, usersController.updateUser);

    router.delete("/:id", AuthMiddleware.isAdmin, usersController.deleteUser);

    return router;
  }
}
