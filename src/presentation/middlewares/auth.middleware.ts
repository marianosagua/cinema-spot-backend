import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prismaClient } from "../../data/postgres/client-connection";
import { UserEntity } from "../../domain/entities/user.entity";

/**
 * Middleware to verify that the incoming request is made by an admin user.
 *
 * This method checks for the presence of an "Authorization" header in the incoming HTTP request.
 * It ensures that the header contains a bearer token ("Bearer <token>") and verifies the token
 * using JwtAdapter. After token verification, it retrieves the user from the database based on the token's payload.
 *
 * If the user is not found or does not have admin privileges (i.e., the user's role is not equal to 1),
 * the middleware responds with a 401 status code and an appropriate error message. In case of any token
 * verification error (such as a "JsonWebTokenError"), it also returns a 401. For any other errors, it responds
 * with a 500 status indicating an internal server error.
 *
 * Upon successful validation, the middleware creates a user entity and attaches it to the request body,
 * then calls the next middleware in the pipeline.
 *
 * @param req - The Express Request object containing information about the HTTP request.
 * @param res - The Express Response object used to send a response back to the client.
 * @param next - The NextFunction callback to pass control to the next middleware function.
 *
 * @throws {401} If the "Authorization" header is missing.
 * @throws {401} If the token does not start with "Bearer ".
 * @throws {401} If the token is invalid, or if the user is not found, or if the user is not an admin.
 * @throws {500} For any other internal errors during token verification or database lookup.
 *
 * @example
 * ```typescript
 * import express from 'express';
 * const app = express();
 *
 * app.get('/admin/dashboard', AuthMiddleware.isAdmin, (req, res) => {
 *   res.send('Welcome, Admin!');
 * });
 * ```
 */
export class AuthMiddleware {
  static async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authorization = req.header("Authorization");

    if (!authorization) {
      res.status(401).json({ error: "No token provider" });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Invalid bearer token" });
      return;
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = JwtAdapter.verifyToken(token);
      const { id } = payload as { id: string };

      const user = await prismaClient.users.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        res.status(401).json({ error: "User not found" });
        return;
      }

      if (user.role !== 1) {
        res.status(401).json({ error: "User is not an admin" });
        return;
      }

      const userEntity = UserEntity.create(user);
      req.body.user = userEntity;
      next();
    } catch (error) {
      console.log("Error:\n" + error);
      if (error instanceof Error && error.name === "JsonWebTokenError") {
        res.status(401).json({ error: "Invalid token" });
      } else {
        console.log("Error:\n" + error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
