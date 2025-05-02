/**
 * Controlador de próximos estrenos.
 * Permite consultar, crear, actualizar y eliminar próximos estrenos de películas.
 * Utiliza FutureReleasesService para la lógica de negocio.
 *
 * Métodos:
 * - getFutureReleases: Lista todos los próximos estrenos.
 * - getFutureReleaseById: Obtiene un próximo estreno por ID.
 * - createFutureRelease: Crea un nuevo próximo estreno.
 * - updateFutureRelease: Actualiza un próximo estreno existente.
 * - deleteFutureRelease: Elimina un próximo estreno.
 */

import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { FutureReleasesService } from "./future-releases.service";

export class FutureReleasesController {
  constructor(private futureReleasesService: FutureReleasesService) {}

  getFutureReleases = async (req: Request, res: Response) => {
    try {
      const futureReleases = await this.futureReleasesService.getFutureReleases();
      res.status(200).json(futureReleases);
    } catch (error) {
      handleError(error, res);
    }
  };

  getFutureReleaseById = async (req: Request, res: Response) => {
    try {
      const futureRelease = await this.futureReleasesService.getFutureReleaseById(
        req.params.id
      );
      res.status(200).json(futureRelease);
    } catch (error) {
      handleError(error, res);
    }
  };

  createFutureRelease = async (req: Request, res: Response) => {
    try {
      const futureRelease =
        await this.futureReleasesService.createFutureRelease(req.body);
      res.status(201).json({
        message: "Future release created successfully",
        futureRelease,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  updateFutureRelease = async (req: Request, res: Response) => {
    try {
      const futureRelease =
        await this.futureReleasesService.updateFutureRelease(
          req.params.id,
          req.body
        );
      res.status(200).json({
        message: "Future release updated successfully",
        futureRelease,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteFutureRelease = async (req: Request, res: Response) => {
    try {
      await this.futureReleasesService.deleteFutureRelease(req.params.id);
      res.status(200).json({
        message: "Future release deleted successfully",
      });
    } catch (error) {
      handleError(error, res);
    }
  };
}
