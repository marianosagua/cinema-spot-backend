// -----------------------------------------------------------------------------
// Clase de error personalizado para el dominio de la aplicación CinemaSpot
// Permite lanzar errores con códigos de estado HTTP y mensajes personalizados
// -----------------------------------------------------------------------------
export class CustomError extends Error {
  /**
   * Constructor de CustomError
   * @param statusCode Código de estado HTTP asociado al error
   * @param message Mensaje descriptivo del error
   */
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  /**
   * Error 400 - Solicitud incorrecta
   * @param message Mensaje descriptivo
   * @returns Instancia de CustomError
   */
  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  /**
   * Error 401 - No autorizado
   * @param message Mensaje descriptivo
   * @returns Instancia de CustomError
   */
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  /**
   * Error 403 - Prohibido
   * @param message Mensaje descriptivo
   * @returns Instancia de CustomError
   */
  static forbidden(message: string) {
    return new CustomError(403, message);
  }

  /**
   * Error 404 - No encontrado
   * @param message Mensaje descriptivo
   * @returns Instancia de CustomError
   */
  static notFound(message: string) {
    return new CustomError(404, message);
  }
}
