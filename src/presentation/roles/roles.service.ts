import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";

/**
 * Servicio para la gestión de roles de usuario.
 * Proporciona métodos para asignar, consultar, actualizar y eliminar roles en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class RolesService {
  /**
   * Asigna un nuevo rol a un usuario.
   * @param {string} userId - ID del usuario.
   * @param {string} newRole - Nombre del nuevo rol.
   * @returns {Promise<void>} No retorna valor, lanza error si falla.
   * @throws {CustomError} Si el rol o el usuario no existen.
   */
  assignRole = async (userId: string, newRole: string) => {
    const role = await prismaClient.roles.findFirst({
      where: {
        name: newRole,
      },
    });

    if (!role) {
      throw CustomError.notFound(`Role not found`);
    }

    const userUpdated = await prismaClient.users.update({
      where: {
        id: userId,
      },
      data: {
        role: role.id,
      },
    });

    if (!userUpdated) {
      throw CustomError.notFound(`User not found`);
    }
  };

  /**
   * Obtiene todos los roles existentes.
   * @returns {Promise<any[]>} Lista de roles.
   */
  getAllRoles = async () => {
    return await prismaClient.roles.findMany();
  };

  /**
   * Obtiene un rol por su ID.
   * @param {number} id - ID del rol.
   * @returns {Promise<any>} Rol encontrado.
   */
  getRoleById = async (id: number) => {
    return await prismaClient.roles.findFirst({
      where: {
        id,
      },
    });
  };

  /**
   * Actualiza el nombre de un rol por su ID.
   * @param {number} id - ID del rol.
   * @param {string} name - Nuevo nombre del rol.
   * @returns {Promise<any>} Rol actualizado.
   */
  updateRole = async (id: number, name: string) => {
    return await prismaClient.roles.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  };

  /**
   * Elimina un rol por su ID.
   * @param {number} id - ID del rol.
   * @returns {Promise<any>} Rol eliminado.
   */
  deleteRole = async (id: number) => {
    return await prismaClient.roles.delete({
      where: {
        id,
      },
    });
  };
}
