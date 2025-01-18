import { regularExps } from "../../../config";

export class LoginDto {
  constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = object;

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

    return [undefined, new LoginDto(email, password)];
  }
}
