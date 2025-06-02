// Entidad que representa a un usuario en el dominio de la aplicación.
// Incluye validaciones y método de construcción a partir de datos crudos.
import { regularExps } from "../../config";
import { prismaClient } from "../../data/postgres/client-connection";

export class UserEntity {
  /**
   * @param id Identificador único del usuario
   * @param first_name Nombre del usuario
   * @param last_name Apellido del usuario
   * @param email Correo electrónico del usuario
   * @param password Contraseña hasheada del usuario
   * @param role Rol del usuario (opcional)
   * @param emailValidated Indica si el email fue validado (opcional)
   * @param created_at Fecha de creación (opcional)
   * @param updated_at Fecha de actualización (opcional)
   */
  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public role?: number,
    public emailValidated?: boolean,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  /**
   * Crea una instancia de usuario validando los datos y resolviendo el rol.
   * @param data Objeto con los datos del usuario
   * @returns Objeto usuario validado y listo para usar
   * @throws Error si falta algún campo obligatorio o el formato es incorrecto
   */
  static async create(data: { [key: string]: any }) {
    const { id, first_name, last_name, email, password, role, created_at, updated_at, email_validated } = data;

    if (!id) {
      throw new Error("Id is required");
    }
    if (!first_name) {
      throw new Error("First name is required");
    }
    if (!last_name) {
      throw new Error("Last name is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!regularExps.email.test(email)) {
      throw new Error("Email is not valid");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (password.length < 6) {
      throw new Error("Password too short");
    }

    let roles;
    if (role) {
      roles = await prismaClient.roles.findUnique({
        where: {
          id: role,
        },
      });
    }

    let userData;
    if (id) {
      userData = await prismaClient.users.findUnique({
        where: {
          id,
        },
      });
    }

    return {
      id,
      first_name,
      last_name,
      email,
      password,
      role: roles?.name,
      created_at: created_at || userData?.created_at || new Date(),
      updated_at: updated_at || userData?.updated_at || new Date(),
      email_validated: email_validated ?? userData?.email_validated ?? false,
    };
  }
}
