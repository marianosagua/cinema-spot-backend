import { regularExps } from "../../config";
import { prismaClient } from "../../data/postgres/client-connection";

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string,
    public emailValidated: boolean,
    public role: number
  ) {}

  static async create(data: { [key: string]: any }) {
    if (!data.id) {
      throw new Error("ID is required");
    }

    if (!data.name) {
      throw new Error("Name is required");
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

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || 1,
      emailValidated: data.emailValidated || false,
    };
  }
}
