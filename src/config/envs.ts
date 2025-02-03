import "dotenv/config";
import { get } from "env-var";

/**
 * Provides access to the required environment variables for the application.
 *
 * This constant encapsulates the configuration settings that are essential for
 * the operation of the application. It retrieves and validates the following properties:
 *
 * - port: The port number on which the application server listens.
 *   It uses the "PORT" environment variable and converts it to a valid number.
 *
 * - app_url: The base URL for the application.
 *   It requires the "APP_URL" environment variable as a string.
 *
 * - jwt_secret_key: The secret key for signing JSON Web Tokens (JWT).
 *   It requires the "JWT_SECRET_KEY" environment variable as a string.
 *
 * The underlying accessor methods (e.g., `get`, `required`, `asPortNumber`, and `asString`)
 * ensure that the required environment variables are available and correctly typed.
 *
 * @example
 * // Import and use the environment configuration
 * import { envs } from './config/envs';
 *
 * console.log(`Server is configured to run on port ${envs.port}`);
 *
 * @remarks
 * Make sure that the environment variables are set correctly in your deployment or development environment.
 */
export const envs = {
  port: get("PORT").required().asPortNumber(),
  app_url: get("APP_URL").required().asString(),
  jwt_secret_key: get("JWT_SECRET_KEY").required().asString(),
};
