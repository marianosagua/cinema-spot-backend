import { Request, Response } from "express";
import { RolesService } from "../services/roles.service";
import { handleError } from "../../domain/errors";

export class RolesController {
  constructor(private rolesService: RolesService) {}

  assignRole = async (req: Request, res: Response) => {
    const { userId, newRole } = req.body;

    try {
      await this.rolesService.assignRole(userId, newRole);
      res.status(200).json({ message: "Role assigned !!!" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
