/**
 * Rutas del módulo de actores (Actors)
 *
 * Este archivo define las rutas para consultar, crear, actualizar y eliminar actores.
 * TODAS las rutas están protegidas por AuthMiddleware.isAdmin - solo administradores pueden acceder.
 *
 * ENDPOINTS DISPONIBLES (TODOS REQUIEREN AUTENTICACIÓN DE ADMIN):
 *
 * - GET /actors - Lista todos los actores
 * - GET /actors/search - Busca actores por nombre o apellido
 * - GET /actors/:id - Obtiene un actor específico por ID
 * - POST /actors - Crea un nuevo actor
 * - PUT /actors/:id - Actualiza un actor existente
 * - DELETE /actors/:id - Elimina un actor
 */

import { Router } from "express";
import { ActorsController } from "./actors.controller";
import { ActorsService } from "./actors.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ActorsRoutes {
  static getRoutes(): Router {
    const router = Router();
    const actorsService = new ActorsService();
    const actorsController = new ActorsController(actorsService);

    // ============================================================================
    // TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN DE ADMINISTRADOR
    // ============================================================================

    // GET /actors - Lista todos los actores
    router.get("/", AuthMiddleware.isAdmin, actorsController.getAllActors);

    // GET /actors/search - Busca actores por nombre o apellido
    router.get(
      "/search",
      AuthMiddleware.isAdmin,
      actorsController.searchActors
    );

    // GET /actors/:id - Obtiene un actor específico por ID
    router.get("/:id", AuthMiddleware.isAdmin, actorsController.getActorById);

    // POST /actors - Crea un nuevo actor
    router.post("/", AuthMiddleware.isAdmin, actorsController.createActor);

    // PUT /actors/:id - Actualiza un actor existente
    router.put("/:id", AuthMiddleware.isAdmin, actorsController.updateActor);

    // DELETE /actors/:id - Elimina un actor
    router.delete("/:id", AuthMiddleware.isAdmin, actorsController.deleteActor);

    return router;
  }
}
