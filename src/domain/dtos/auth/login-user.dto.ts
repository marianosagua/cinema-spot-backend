import { regularExps } from "../../../config";

/**
 * Represents the Data Transfer Object (DTO) for handling user login credentials.
 *
 * This class encapsulates a user's email and password and provides validation 
 * via its static create method. The create method verifies that:
 * - Both email and password are provided.
 * - The email conforms to a specified regular expression for valid email formats.
 * - The password meets a minimum length requirement of 6 characters.
 *
 * @remarks
 * The static {@link LoginUserDto.create} method accepts a plain object and returns a tuple.
 * On failure, the tuple contains an error message; on success, it returns an instance of LoginUserDto.
 *
 * @example
 * ```typescript
 * const [error, loginDto] = LoginUserDto.create({ email: "user@example.com", password: "secret123" });
 * if (error) {
 *   // Handle the error, e.g., display validation message
 * } else {
 *   // Proceed with login using loginDto
 * }
 * ```
 */
export class LoginUserDto {
  constructor(public email: string, public password: string) {}

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
