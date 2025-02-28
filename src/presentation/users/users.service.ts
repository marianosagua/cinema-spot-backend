import { prismaClient } from "../../data/postgres/client-connection";
import { User } from "../../interfaces/user";

export class UsersService {
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

  async createUser(userData: User) {
    const { role, ...dataWithoutRole } = userData;
    const createdUser = prismaClient.users.create({
      data: dataWithoutRole,
    });
    return createdUser;
  }

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

  async deleteUser(id: string) {
    await prismaClient.users.delete({
      where: {
        id,
      },
    });
  }
}
