import { regularExps } from "../../../config";

/**
 * Data Transfer Object for user registration.
 *
 * This class encapsulates the required information for registering a new user, including the user's email, password,
 * first name, and last name. It provides a static factory method, `create`, which validates an input object to ensure
 * that all necessary fields are present and meet the required criteria. If any validation fails, an error message is returned;
 * otherwise, a new instance of `RegisterUserDto` is created.
 *
 * The `create` method performs the following validations:
 * - Verifies that `first_name` is provided.
 * - Verifies that `last_name` is provided.
 * - Checks that `email` is provided and conforms to the valid email format.
 * - Checks that `password` is provided and has a minimum length of 6 characters.
 *
 * @remarks
 * This DTO is intended to be used when receiving and validating user registration data before creating a new user account.
 * The design ensures that only valid data is processed, reducing the possibility of errors during user registration.
 *
 * @example
 * ```typescript
 * const [error, registrationDto] = RegisterUserDto.create({
 *   first_name: "Jane",
 *   last_name: "Doe",
 *   email: "jane.doe@example.com",
 *   password: "mySecurePass",
 * });
 * if (error) {
 *   // Handle the validation error.
 * } else {
 *   // Proceed with registration using registrationDto.
 * }
 * ```
 *
 * @category Data Transfer Objects
 */
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
      return ["First name is required"];
    }

    if (!last_name) {
      return ["Last name is required"];
    }

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

    return [
      undefined,
      new RegisterUserDto(email, password, first_name, last_name),
    ];
  }
}
