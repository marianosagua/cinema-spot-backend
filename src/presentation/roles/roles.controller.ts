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

  getAllRoles = async (req: Request, res: Response) => {
    try {
      const roles = await this.rolesService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      handleError(error, res);
    }
  };

  getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const role = await this.rolesService.getRoleById(Number(id));
      res.status(200).json(role);
    } catch (error) {
      handleError(error, res);
    }
  };

  updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const role = await this.rolesService.updateRole(Number(id), name);
      res.status(200).json(role);
    } catch (error) {
      handleError(error, res);
    }
  };

  deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.rolesService.deleteRole(Number(id));
      res.status(200).json({ message: "Role deleted !!!" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
