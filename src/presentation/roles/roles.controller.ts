import { Request, Response } from "express";
import { RolesService } from "../services/roles.service";

export class RolesController {
  constructor(private rolesService: RolesService) {}

  assignRole = async (req: Request, res: Response) => {
    const { userId, newRole } = req.body;

    try {
      await this.rolesService.assignRole(userId, newRole);
      res.status(200).json({ message: "Role assigned !!!" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}
