import { Request, Response } from "express";
import { handleError } from "../../domain/errors";
import { FutureReleasesService } from "./future-releases.service";

/**
 * Controller class for handling HTTP requests related to future movie releases.
 *
 * This class provides methods to process incoming requests and generate appropriate responses
 * for operations on future movie releases data. It relies on FutureReleasesService to perform
 * the actual business logic and data access operations.
 *
 * The controller implements the following operations:
 * - Retrieving all future releases
 * - Retrieving a specific future release by ID
 * - Creating a new future release record
 * - Updating an existing future release
 * - Deleting a future release
 *
 * @remarks
 * All methods utilize the handleError utility to ensure consistent error handling across the application.
 */
export class FutureReleasesController {
  constructor(private futureReleasesService: FutureReleasesService) {}

  /**
   * Retrieves all future movie releases.
   *
   * @param req - The Express request object
   * @param res - The Express response object
   */
  getFutureReleases = async (req: Request, res: Response) => {
    try {
      const futureReleases =
        await this.futureReleasesService.getFutureReleases();
      res.status(200).json(futureReleases);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   * Retrieves a specific future movie release by its unique identifier.
   *
   * @param req - The Express request object containing the release ID as a URL parameter
   * @param res - The Express response object
   */
  getFutureReleaseById = async (req: Request, res: Response) => {
    try {
      const futureRelease =
        await this.futureReleasesService.getFutureReleaseById(req.params.id);
      res.status(200).json(futureRelease);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   * Creates a new future movie release record.
   *
   * @param req - The Express request object containing the new release data in the body
   * @param res - The Express response object
   */
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

  /**
   * Updates an existing future movie release record.
   *
   * @param req - The Express request object containing the release ID as a URL parameter and updated data in the body
   * @param res - The Express response object
   */
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

  /**
   * Deletes a future movie release record.
   *
   * @param req - The Express request object containing the release ID as a URL parameter
   * @param res - The Express response object
   */
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
