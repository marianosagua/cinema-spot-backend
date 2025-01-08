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
