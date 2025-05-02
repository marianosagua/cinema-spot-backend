import { prismaClient } from "../../data/postgres/client-connection";
import { User } from "../../interfaces/user";

/**
 * Servicio para la gestión de usuarios.
 * Proporciona métodos para consultar, crear, actualizar y eliminar usuarios en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class UsersService {
  /**
   * Obtiene todos los usuarios existentes.
   * @returns {Promise<any[]>} Lista de usuarios con sus roles y datos principales.
   * @throws {Error} Si no se encuentran usuarios.
   */
  async getUsers() {
    const users = await prismaClient.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        roles: {
          select: {
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
        email_validated: true,
      },
    });

    if (!users) {
      throw new Error("Users not found");
    }

    const transformedUsers = users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.roles.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      email_validated: user.email_validated,
    }));

    return transformedUsers;
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} id - ID del usuario.
   * @returns {Promise<any>} Usuario encontrado con su rol y datos principales.
   * @throws {Error} Si el usuario no existe.
   */
  async getUserById(id: string) {
    const user = await prismaClient.users.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        roles: {
          select: {
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
        email_validated: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.roles.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      email_validated: user.email_validated,
    };
  }

  /**
   * Crea un nuevo usuario.
   * @param {User} userData - Datos del usuario.
   * @returns {Promise<any>} Usuario creado.
   */
  async createUser(userData: User) {
    const { role, ...dataWithoutRole } = userData;
    const createdUser = prismaClient.users.create({
      data: dataWithoutRole,
    });
    return createdUser;
  }

  /**
   * Actualiza un usuario existente por su ID.
   * @param {string} id - ID del usuario.
   * @param {User} userData - Datos actualizados del usuario.
   * @returns {Promise<any>} Usuario actualizado.
   */
  async updateUser(id: string, userData: User) {
    const { role, ...dataWithoutRole } = userData;
    const updatedUser = prismaClient.users.update({
      where: {
        id,
      },
      data: dataWithoutRole,
    });
    return updatedUser;
  }

  /**
   * Elimina un usuario por su ID.
   * @param {string} id - ID del usuario.
   * @returns {Promise<void>} No retorna valor.
   */
  async deleteUser(id: string) {
    await prismaClient.users.delete({
      where: {
        id,
      },
    });
  }
}
