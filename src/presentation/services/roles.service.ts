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
}
