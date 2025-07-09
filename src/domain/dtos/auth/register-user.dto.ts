// -----------------------------------------------------------------------------
// DTO para el registro de usuarios
// Valida y transforma los datos recibidos para crear un nuevo usuario
// -----------------------------------------------------------------------------
import { regularExps } from "../../../config";

/**
 * Data Transfer Object para el registro de un usuario.
 * @property email Correo electrónico del usuario.
 * @property password Contraseña del usuario.
 * @property first_name Nombre del usuario.
 * @property last_name Apellido del usuario.
 */
export class RegisterUserDto {
  constructor(
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string
  ) {}

  /**
   * Crea una instancia de RegisterUserDto a partir de los datos recibidos.
   * Valida la existencia y formato de los campos requeridos.
   * @param object Objeto con los datos del usuario
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
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
