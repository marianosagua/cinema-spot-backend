// Entidad que representa una función (showtime) en el dominio de la aplicación.
// Incluye validaciones y método de construcción a partir de datos crudos.
import { CustomError } from "../errors";

export class ShowtimeEntity {
  /**
   * @param movie ID de la película asociada a la función
   * @param start_time Hora de inicio de la función (formato string)
   * @param end_time Hora de fin de la función (formato string)
   * @param room ID de la sala donde se proyecta
   * @param id Identificador único de la función (opcional)
   * @param is_full Indica si la función está llena (opcional)
   */
  constructor(
    public readonly movie: string,
    public readonly start_time: string,
    public readonly end_time: string,
    public readonly room: string,
    public readonly id?: string,
    public readonly is_full?: boolean
  ) {}

  /**
   * Crea una instancia de Showtime validando los datos requeridos.
   * @param params Objeto con los datos de la función
   * @returns Instancia de ShowtimeEntity
   * @throws CustomError si falta algún campo obligatorio
   */
  static create({
    movie,
    start_time,
    end_time,
    room,
    id,
    is_full,
  }: ShowtimeEntity): ShowtimeEntity {
    if (!movie) {
      throw CustomError.badRequest("Movie is required");
    }
    if (!start_time) {
      throw CustomError.badRequest("Start time is required");
    }
    if (!end_time) {
      throw CustomError.badRequest("End time is required");
    }
    if (!room) {
      throw CustomError.badRequest("Room is required");
    }
    return new ShowtimeEntity(
      movie,
      start_time,
      end_time,
      room,
      id ?? "",
      is_full ?? false
    );
  }
}
