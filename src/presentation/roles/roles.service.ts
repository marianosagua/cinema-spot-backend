import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";

export class RolesService {
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

  getAllRoles = async () => {
    return await prismaClient.roles.findMany();
  };

  getRoleById = async (id: number) => {
    return await prismaClient.roles.findFirst({
      where: {
        id,
      },
    });
  };

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

  deleteRole = async (id: number) => {
    return await prismaClient.roles.delete({
      where: {
        id,
      },
    });
  };
}
