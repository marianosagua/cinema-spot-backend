import { Response } from "express";
import { CustomError } from "./CustomErrors";

/**
 * Handles an error encountered during request processing by sending an appropriate HTTP response.
 *
 * @remarks
 * This function first checks if the provided error is an instance of CustomError. If so, it sends an HTTP response
 * using the status code and error message defined in the CustomError. If not, it logs the error to the console and
 * responds with a generic HTTP 500 (Internal Server Error) message.
 *
 * @param error - The error encountered during request processing. This can be of any type.
 * @param res - The Express Response object used to send the HTTP response back to the client.
 *
 * @returns A JSON response with an error message and the corresponding HTTP status code.
 *
 * @example
 * ```typescript
 * try {
 *   // Some operation that might throw an error
 * } catch (error) {
 *   handleError(error, res);
 * }
 * ```
 */
export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  console.log(`${error}`);
  return res.status(500).json({ error: "Internal server error" });
};
