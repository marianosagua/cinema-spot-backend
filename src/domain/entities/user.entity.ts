import { regularExps } from "../../config";
import { prismaClient } from "../../data/postgres/client-connection";

export class UserEntity {
  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public role?: number,
    public emailValidated?: boolean,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  static async create(data: { [key: string]: any }) {
    if (!data.id) {
      throw new Error("ID is required");
    }

    if (!data.first_name) {
      throw new Error("First name is required");
    }

    if (!data.last_name) {
      throw new Error("Last name is required");
    }

    if (!data.email) {
      throw new Error("Email is required");
    }

    if (!regularExps.email.test(data.email)) {
      throw new Error("Invalid email format");
    }

    if (!data.password) {
      throw new Error("Password is required");
    }

    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const role = await prismaClient.roles.findFirst({
      where: { id: data.role },
    });
    if (!role) {
      throw new Error("Role not found");
    }

    const dataUser = await prismaClient.users.findFirst({
      where: { id: data.id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        role: true,
        created_at: true,
        updated_at: true,
        email_validated: true,
      },
    });

    return {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role,
      createdAt: dataUser?.created_at,
      updatedAt: dataUser?.updated_at,
      emailValidated: dataUser?.email_validated,
    };
  }
}
