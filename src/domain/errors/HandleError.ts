// -----------------------------------------------------------------------------
// Función para manejar errores y enviar respuestas HTTP apropiadas
// Utiliza CustomError para errores controlados y responde con 500 para errores inesperados
// -----------------------------------------------------------------------------
import { Response } from "express";
import { CustomError } from "./CustomErrors";

/**
 * Maneja errores lanzados en la aplicación y responde con el código y mensaje adecuado.
 * Si el error es una instancia de CustomError, responde con su código y mensaje.
 * Si es un error desconocido, responde con 500 y un mensaje genérico.
 * @param error Error capturado
 * @param res Objeto Response de Express
 * @returns Respuesta HTTP con el error correspondiente
 */
export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  console.log(`${error}`);
  return res.status(500).json({ error: "Error interno del servidor" });
};
