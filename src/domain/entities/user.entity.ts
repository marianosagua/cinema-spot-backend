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
    const { id, first_name, last_name, email, password, role, created_at, updated_at, email_validated } = data;

    if (!id) {
      throw new Error("Id is required");
    }
    if (!first_name) {
      throw new Error("First name is required");
    }
    if (!last_name) {
      throw new Error("Last name is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!regularExps.email.test(email)) {
      throw new Error("Email is not valid");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (password.length < 6) {
      throw new Error("Password too short");
    }

    let roles;
    if (role) {
      roles = await prismaClient.roles.findUnique({
        where: {
          id: role,
        },
      });
    }

    let userData;
    if (id) {
      userData = await prismaClient.users.findUnique({
        where: {
          id,
        },
      });
    }

    return {
      id,
      first_name,
      last_name,
      email,
      password,
      role: roles?.name,
      created_at: created_at || userData?.created_at || new Date(),
      updated_at: updated_at || userData?.updated_at || new Date(),
      email_validated: email_validated ?? userData?.email_validated ?? false,
    };
  }
}
