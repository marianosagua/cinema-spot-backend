import { regularExps } from "../../config";
import { prismaClient } from "../../data/postgres/client-connection";

/**
 * Represents a user entity within the Movie Reservation System.
 *
 * This class encapsulates user details including the identifier, first and last names, email, password,
 * role, email validation status, and timestamps for creation and update. It ensures that all required fields
 * are present and valid before returning a user object.
 *
 * The static async create method performs the following operations:
 * - Validates the presence of required properties: id, first_name, last_name, email, and password.
 * - Checks that the email matches a valid format as defined by a regular expression.
 * - Ensures that the password is at least 6 characters long.
 * - Looks up the user's role in the database using the provided role identifier.
 * - Retrieves any existing user metadata (such as created_at, updated_at, and email_validated) from the database.
 *
 * @param data - An object containing the user properties:
 *   - id: The unique identifier of the user.
 *   - first_name: The user's first name.
 *   - last_name: The user's last name.
 *   - email: The user's email address.
 *   - password: The user's password which must have a minimum length of 6 characters.
 *   - role: (Optional) A numeric identifier for the role to be assigned to the user.
 *   - Additional properties may be included.
 *
 * @throws {Error} Throws an error if any of the required fields (id, first_name, last_name, email, password) are missing,
 * if the email format is invalid, if the password is too short, or if the specified role cannot be found.
 *
 * @returns A Promise that resolves to an object containing the validated user data:
 *   - id, first_name, last_name, email, password,
 *   - role: The name of the role retrieved from the database,
 *   - created_at and updated_at: Timestamps for when the user was created and last updated,
 *   - emailValidated: The email validation status retrieved from the database.
 */
export class UserEntity {
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

  static async create(data: { [key: string]: any }) {
    if (!data.id) {
      throw new Error("ID is required");
    }

    if (!data.first_name) {
      throw new Error("First name is required");
    }

    if (!data.last_name) {
      throw new Error("Last name is required");
    }

    if (!data.email) {
      throw new Error("Email is required");
    }

    if (!regularExps.email.test(data.email)) {
      throw new Error("Invalid email format");
    }

    if (!data.password) {
      throw new Error("Password is required");
    }

    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const role = await prismaClient.roles.findFirst({
      where: { id: data.role },
    });
    if (!role) {
      throw new Error("Role not found");
    }

    const dataUser = await prismaClient.users.findFirst({
      where: { id: data.id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        role: true,
        created_at: true,
        updated_at: true,
        email_validated: true,
      },
    });

    return {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: role.name,
      created_at: dataUser?.created_at,
      updated_at: dataUser?.updated_at,
      emailValidated: dataUser?.email_validated,
    };
  }
}
