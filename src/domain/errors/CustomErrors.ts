/**
 * CustomError is a custom error class that extends the built-in Error class to include an HTTP status code.
 *
 * @remarks
 * This class provides a cohesive mechanism for throwing errors with standardized HTTP status codes and messages.
 * It offers static factory methods for common error scenarios:
 * - {@link CustomError.badRequest} creates a 400 Bad Request error.
 * - {@link CustomError.unauthorized} creates a 401 Unauthorized error.
 * - {@link CustomError.forbidden} creates a 403 Forbidden error.
 * - {@link CustomError.notFound} creates a 404 Not Found error.
 *
 * These methods enable you to generate errors in a clear and expressive manner, making error handling
 * and debugging easier in your application.
 *
 * @example
 * ```typescript
 * // Throw a 400 Bad Request error with a descriptive message
 * throw CustomError.badRequest("The provided input is invalid.");
 * ```
 *
 * @public
 */
export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  static forbidden(message: string) {
    return new CustomError(403, message);
  }

  static notFound(message: string) {
    return new CustomError(404, message);
  }
}
