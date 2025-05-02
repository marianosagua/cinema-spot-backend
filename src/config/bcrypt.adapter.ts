// Adaptador para operaciones de hash y comparación de contraseñas usando bcryptjs.
//
// Este archivo proporciona una interfaz centralizada para el uso de bcryptjs en la aplicación CinemaSpot.
// Permite hashear contraseñas y compararlas de forma segura.
//
// Exportaciones:
// - bcryptAdapter: Objeto con métodos para hashear y comparar contraseñas.
//
// Métodos:
// - hash(password: string): string
//   Genera un hash seguro para la contraseña proporcionada.
// - compare(password: string, hashedPassword: string): boolean
//   Compara una contraseña en texto plano con un hash.
//
// Ejemplo de uso:
// import { bcryptAdapter } from "../config/bcrypt.adapter";
// const hash = bcryptAdapter.hash("miPassword");
// const isValid = bcryptAdapter.compare("miPassword", hash);

import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcryptAdapter = {
  hash(password: string) {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },
  compare(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  },
};
