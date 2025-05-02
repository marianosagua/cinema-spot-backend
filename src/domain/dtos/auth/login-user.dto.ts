// -----------------------------------------------------------------------------
// DTO para el inicio de sesión de usuarios
// Valida y transforma los datos recibidos para autenticar un usuario
// -----------------------------------------------------------------------------
import { regularExps } from "../../../config";

/**
 * Data Transfer Object para el inicio de sesión de un usuario.
 * @property email Correo electrónico del usuario.
 * @property password Contraseña del usuario.
 */
export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  /**
   * Crea una instancia de LoginUserDto a partir de los datos recibidos.
   * Valida la existencia y formato de los campos requeridos.
   * @param object Objeto con los datos de inicio de sesión
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
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

    return [undefined, new LoginUserDto(email, password)];
  }
}
