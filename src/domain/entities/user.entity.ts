import { regularExps } from "../../config";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role_id: number,
    public emailValidated: boolean
  ) {}

  static create(data: { [key: string]: any }) {
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

    return new UserEntity(
      data.id,
      data.name,
      data.email,
      data.password,
      data.role_id || 2,
      data.emailValidated || false
    );
  }
}
