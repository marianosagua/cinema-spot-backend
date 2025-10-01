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
      return ["El nombre es requerido"];
    }

    if (!last_name) {
      return ["El apellido es requerido"];
    }

    if (!email) {
      return ["El email es requerido"];
    }

    if (!password) {
      return ["La contraseña es requerida"];
    }

    if (!regularExps.email.test(email)) {
      return ["El email no es válido"];
    }

    if (password.length < 6) {
      return ["La contraseña es muy corta"];
    }

    return [
      undefined,
      new RegisterUserDto(email, password, first_name, last_name),
    ];
  }
}
