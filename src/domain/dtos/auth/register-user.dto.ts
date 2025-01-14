import { regularExps } from "../../../config";

export class RegisterUserDto {
  constructor(
    public email: string,
    public password: string,
    public name: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email, password, name } = object;

    if (!name) return ["Name is required"];
    if (!email) return ["Email is required"];
    if (!password) return ["Password is required"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new RegisterUserDto(email, password, name)];
  }
}
