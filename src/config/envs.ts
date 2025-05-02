// Configuración de variables de entorno para la aplicación CinemaSpot.
//
// Este archivo centraliza y valida el acceso a las variables de entorno necesarias para el funcionamiento del backend.
// Utiliza la librería 'env-var' para asegurar que todas las variables requeridas estén presentes y sean del tipo correcto.
//
// Variables exportadas:
// - port: Puerto en el que se ejecuta la aplicación (number).
// - app_url: URL base de la aplicación, útil para construir enlaces en emails (string).
// - jwt_secret_key: Clave secreta utilizada para firmar y verificar JWT (string).
//
// Ejemplo de uso:
// import { envs } from "../config/envs";
// const port = envs.port;
//
// Se recomienda documentar aquí cada variable utilizada y su propósito.

import "dotenv/config";
import { get } from "env-var";

export const envs = {
  // Puerto en el que se ejecuta la aplicación
  port: get("PORT").required().asPortNumber(),
  // URL base de la aplicación (por ejemplo, para construir enlaces en emails)
  app_url: get("APP_URL").required().asString(),
  // Clave secreta utilizada para firmar y verificar JWT
  jwt_secret_key: get("JWT_SECRET_KEY").required().asString(),
};
