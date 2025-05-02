// ----------------------------------------------------------------------------------
// DTO para la creación de funciones de cine (showtimes)
// Valida y transforma los datos recibidos para crear una función en la base de datos
// ----------------------------------------------------------------------------------
import { prismaClient } from "../../../data/postgres/client-connection";
import { Showtime } from "../../../interfaces";

/**
 * Data Transfer Object para la creación de una función de cine.
 * @property movieId ID de la película.
 * @property startTime Hora de inicio de la función.
 * @property endTime Hora de fin de la función.
 * @property roomId ID de la sala donde se proyecta la función.
 */
export class CreateShowtimeDto {
  constructor(
    public movieId: number,
    public startTime: string,
    public endTime: string,
    public roomId: string
  ) {}

  /**
   * Crea una instancia de CreateShowtimeDto a partir de los datos recibidos en la petición.
   * Valida la existencia de los campos requeridos y busca los IDs en la base de datos.
   * @param body Objeto con los datos de la función (Showtime)
   * @returns Una tupla con un mensaje de error o la instancia creada
   */
  static async fromRequest(
    body: Showtime
  ): Promise<[string?, CreateShowtimeDto?]> {
    const { movie, start_time, end_time, room } = body;

    if (!movie) {
      return ["Movie is required"];
    }

    if (!start_time) {
      return ["Start time is required"];
    }

    if (!end_time) {
      return ["End time is required"];
    }

    if (!room) {
      return ["Room is required"];
    }

    const movieFound = await prismaClient.movies.findFirst({
      where: {
        title: body.movie,
      },
    });

    if (!movieFound) {
      throw new Error("Movie not found in DB");
    }

    const roomFound = await prismaClient.rooms.findFirst({
      where: {
        name: body.room,
      },
    });

    if (!roomFound) {
      throw new Error("Room not found in DB");
    }

    return [
      undefined,
      new CreateShowtimeDto(movieFound.id, start_time, end_time, roomFound.id),
    ];
  }
}
