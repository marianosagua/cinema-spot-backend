/**
 * Controlador de actores.
 * Gestiona la consulta, creación, actualización y eliminación de actores.
 * Utiliza ActorsService para la lógica de negocio.
 *
 * Métodos:
 * - getAllActors: Lista todos los actores.
 * - getActorById: Obtiene un actor por ID.
 * - createActor: Crea un nuevo actor validando los datos recibidos.
 * - updateActor: Actualiza un actor existente validando los datos recibidos.
 * - deleteActor: Elimina un actor por ID.
 * - searchActors: Busca actores por nombre o apellido.
 */

import { Response, Request } from "express";
import { ActorsService } from "./actors.service";
import { CreateActorDto, UpdateActorDto } from "../../domain/dtos/actors";
import { handleError } from "../../domain/errors";

export class ActorsController {
  constructor(private actorsService: ActorsService) {}

  getAllActors = async (req: Request, res: Response): Promise<void> => {
    try {
      const actors = await this.actorsService.getAllActors();
      res.status(200).json(actors);
    } catch (error) {
      handleError(error, res);
    }
  };

  getActorById = async (req: Request, res: Response): Promise<void> => {
    try {
      const actor = await this.actorsService.getActorById(parseInt(req.params.id));
      res.status(200).json(actor);
    } catch (error) {
      handleError(error, res);
    }
  };

  createActor = async (req: Request, res: Response): Promise<void> => {
    try {
      const [error, createActorDto] = CreateActorDto.create(req.body);

      if (error) {
        res.status(400).json({
          ok: false,
          error,
        });
        return;
      }

      const actor = await this.actorsService.createActor(createActorDto!);
      res.status(201).json({
        ok: true,
        message: "Actor creado exitosamente",
        actor,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateActor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const actorId = parseInt(id);

      if (isNaN(actorId)) {
        res.status(400).json({
          ok: false,
          error: "ID de actor inválido",
        });
        return;
      }

      const [error, updateActorDto] = UpdateActorDto.create(req.body);

      if (error) {
        res.status(400).json({
          ok: false,
          error,
        });
        return;
      }

      const actor = await this.actorsService.updateActor(actorId, updateActorDto!);
      res.status(200).json({
        ok: true,
        message: "Actor actualizado exitosamente",
        actor,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteActor = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.actorsService.deleteActor(parseInt(req.params.id));
      res.status(200).json({
        ok: true,
        message: result.message,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  searchActors = async (req: Request, res: Response): Promise<void> => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== "string") {
        res.status(400).json({
          ok: false,
          error: "Término de búsqueda requerido",
        });
        return;
      }

      const actors = await this.actorsService.searchActors(q);
      res.status(200).json({
        ok: true,
        actors,
      });
    } catch (error) {
      handleError(error, res);
    }
  };
} 