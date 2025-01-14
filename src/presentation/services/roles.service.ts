import { prismaClient } from "../../data/postgres/client-connection";

export class RolesService {
  assignRole = async (userId: string, newRole: string) => {
    try {
      const role = await prismaClient.roles.findFirst({
        where: {
          role_name: newRole,
        },
      });

      if (!role) {
        throw new Error("Role not found");
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
      throw new Error(String(error));
    }
  };
}
