import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prismaClient } from "../../data/postgres/client-connection";
import { UserEntity } from "../../domain/entities/user.entity";

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

      if (user.role !== 2) {
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
