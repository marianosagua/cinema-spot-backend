import jwt from "jsonwebtoken";
import { envs } from "./envs";

/**
 * A utility adapter class that provides helper functions to generate and verify JSON Web Tokens (JWT).
 *
 * @remarks
 * The JwtAdapter class abstracts the interaction with the JSON Web Token mechanism by offering
 * static methods to sign payloads into tokens and verify tokens using a secret key from the environment
 * configuration. This enables a standardized approach to JWT management throughout the application.
 *
 * @example
 * ```typescript
 * // Generate a token with default expiration of 2 hours
 * const token = JwtAdapter.generateToken({ userId: 123 });
 *
 * // Verify the token and retrieve the parsed payload
 * const decoded = JwtAdapter.verifyToken(token);
 * ```
 */
export class JwtAdapter {
  static generateToken(payload: object, duration: string = "2h") {
    return jwt.sign(payload, envs.jwt_secret_key, { expiresIn: duration });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, envs.jwt_secret_key);
  }
}
