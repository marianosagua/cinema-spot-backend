import { compareSync, genSaltSync, hashSync } from "bcryptjs";

/**
 * An adapter module that provides utility functions for bcrypt hashing and comparison.
 *
 * This module exposes two primary functions:
 *
 * - hash: Generates a salt synchronously and hashes the provided password using bcrypt.
 * - compare: Compares a plaintext password with a hashed password synchronously using bcrypt.
 *
 * @remarks
 * The module utilizes bcrypt's synchronous functions (genSaltSync, hashSync, and compareSync) to ensure that all operations are performed in a blocking manner.
 * This may be suitable for use cases where simplicity is preferred over non-blocking asynchronous code.
 *
 * @example
 * // Hashing a password
 * const hashedPassword = bcryptAdapter.hash("mySecretPassword");
 *
 * // Comparing a password with its hashed version
 * const isMatch = bcryptAdapter.compare("mySecretPassword", hashedPassword);
 */
export const bcryptAdapter = {
  hash(password: string) {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },
  compare(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  },
};
