import { prismaClient } from "../../data/postgres/client-connection";
import { User } from "../../interfaces/user";

export class UsersService {
  async getUsers() {
    const users = prismaClient.users.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = prismaClient.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async createUser(userData: User) {
    const { role, ...dataWithoutRole } = userData;
    const newUser = prismaClient.users.create({
      data: dataWithoutRole,
    });
    return newUser;
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
