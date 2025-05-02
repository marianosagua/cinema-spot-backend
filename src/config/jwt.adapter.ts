// Adaptador para generación y verificación de JWT en CinemaSpot.
//
// Este archivo centraliza la lógica para crear y verificar tokens JWT usando la librería 'jsonwebtoken'.
// Utiliza la clave secreta definida en las variables de entorno.
//
// Exportaciones:
// - JwtAdapter: Clase con métodos estáticos para generar y verificar JWT.
//
// Métodos:
// - generateToken(payload: object, duration: string = "2h"): string
//   Genera un token JWT firmado con el payload y duración especificados.
// - verifyToken(token: string): string | object
//   Verifica la validez de un token JWT y retorna el payload si es válido.
//
// Ejemplo de uso:
// import { JwtAdapter } from "../config/jwt.adapter";
// const token = JwtAdapter.generateToken({ userId: 1 });
// const payload = JwtAdapter.verifyToken(token);

import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {
  static generateToken(payload: object, duration: string = "2h") {
    return jwt.sign(payload, envs.jwt_secret_key, { expiresIn: duration });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, envs.jwt_secret_key);
  }
}
