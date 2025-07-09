import { Request, Response } from "express";
import { RolesService } from "./roles.service";
import { handleError } from "../../domain/errors";

/**
 * Controlador de roles.
 * Gestiona la asignación, consulta, actualización y eliminación de roles de usuario.
 * Utiliza RolesService para la lógica de negocio.
 *
 * Métodos:
 * - assignRole: Asigna un rol a un usuario.
 * - getAllRoles: Lista todos los roles.
 * - getRoleById: Obtiene un rol por ID.
 * - updateRole: Actualiza un rol existente.
 * - deleteRole: Elimina un rol por ID.
 */
export class RolesController {
  constructor(private rolesService: RolesService) {}

  assignRole = async (req: Request, res: Response) => {
    const { userId, newRole } = req.body;

    try {
      await this.rolesService.assignRole(userId, newRole);
      res.status(200).json({ message: "Rol asignado exitosamente" });
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
      res.status(200).json({ message: "Rol eliminado exitosamente" });
    } catch (error) {
      handleError(error, res);
    }
  };
}
