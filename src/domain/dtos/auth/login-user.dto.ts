import { regularExps } from "../../../config";

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

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

    return [undefined, new LoginUserDto(email, password)];
  }
}
