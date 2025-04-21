import { regularExps } from "../../../config";

export class ForgotPasswordDto {
  constructor(public email: string) {}

  static create(object: { [key: string]: any }): [string?, ForgotPasswordDto?] {
    const { email } = object;
    if (!email) return ["Email is required"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    return [undefined, new ForgotPasswordDto(email)];
  }
}

export class ResetPasswordDto {
  constructor(public token: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, ResetPasswordDto?] {
    const { token, password } = object;
    if (!token) return ["Token is required"];
    if (!password) return ["Password is required"];
    if (password.length < 6) return ["Password too short"];
    return [undefined, new ResetPasswordDto(token, password)];
  }
}
