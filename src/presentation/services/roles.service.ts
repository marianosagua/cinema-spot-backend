import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors/CustomErrors";

export class RolesService {
  assignRole = async (userId: string, newRole: string) => {
    try {
      const role = await prismaClient.roles.findFirst({
        where: {
          role_name: newRole,
        },
      });

      if (!role) {
        throw CustomError.badRequest(`Role ${newRole} not found!!!`);
      }

      await prismaClient.users.update({
        where: {
          id: userId,
        },
        data: {
          role_id: role.id,
        },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log("Error:\n" + error);
      throw CustomError.internalServer("An unknown error occurred");
    }
  };
}
