import { regularExps } from "../../../config";

export class RegisterUserDto {
  constructor(
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email, password, first_name, last_name } = object;

    if (!first_name) {
      return ["First name is required"];
    }

    if (!last_name) {
      return ["Last name is required"];
    }

    if (!email) {
      return ["Email is required"];
    }

    if (!password) {
      return ["Password is required"];
    }

    if (!regularExps.email.test(email)) {
      return ["Email is not valid"];
    }

    if (password.length < 6) {
      return ["Password too short"];
    }

    return [
      undefined,
      new RegisterUserDto(email, password, first_name, last_name),
    ];
  }
}
