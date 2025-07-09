// -----------------------------------------------------------------------------
// DTOs para recuperación y restablecimiento de contraseña
// Validan y transforman los datos recibidos para estos procesos
// -----------------------------------------------------------------------------
import { regularExps } from "../../../config";

/**
 * DTO para la solicitud de recuperación de contraseña.
 * @property email Correo electrónico del usuario.
 */
export class ForgotPasswordDto {
  constructor(public email: string) {}

  /**
   * Crea una instancia de ForgotPasswordDto a partir de los datos recibidos.
   * Valida la existencia y formato del email.
   * @param object Objeto con el email del usuario
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
  static create(object: { [key: string]: any }): [string?, ForgotPasswordDto?] {
    const { email } = object;
    if (!email) return ["El email es requerido"];
    if (!regularExps.email.test(email)) return ["El email no es válido"];
    return [undefined, new ForgotPasswordDto(email)];
  }
}

/**
 * DTO para el restablecimiento de contraseña.
 * @property token Token de recuperación.
 * @property password Nueva contraseña.
 */
export class ResetPasswordDto {
  constructor(public token: string, public password: string) {}

  /**
   * Crea una instancia de ResetPasswordDto a partir de los datos recibidos.
   * Valida la existencia del token y la contraseña, y la longitud de la contraseña.
   * @param object Objeto con el token y la nueva contraseña
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
  static create(object: { [key: string]: any }): [string?, ResetPasswordDto?] {
    const { token, password } = object;
    if (!token) return ["El token es requerido"];
    if (!password) return ["La contraseña es requerida"];
    if (password.length < 6) return ["La contraseña es muy corta"];
    return [undefined, new ResetPasswordDto(token, password)];
  }
}
