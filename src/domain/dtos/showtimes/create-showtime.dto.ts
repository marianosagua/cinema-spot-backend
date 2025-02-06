import { prismaClient } from "../../../data/postgres/client-connection";
import { Showtime } from "../../../interfaces";

/**
 * Data Transfer Object (DTO) for creating a new showtime.
 *
 * This class encapsulates the data required to create a showtime,
 * including the identifiers for the movie and room, as well as the
 * start and end times for the showtime.
 *
 * The constructor accepts the following parameters:
 * @param movieId - The numeric identifier of the movie, retrieved from the database.
 * @param startTime - The start time of the showtime in string format.
 * @param endTime - The end time of the showtime in string format.
 * @param roomId - The UUID of the room where the showtime will take place.
 *
 * The static method {@link CreateShowtimeDto.fromRequest} is responsible for:
 *  - Validating the incoming request body to ensure that the required fields are present:
 *    - movie: The title of the movie.
 *    - start_time: The starting time for the showtime.
 *    - end_time: The ending time for the showtime.
 *    - room: The name of the room.
 *  - Querying the database for a movie that matches the provided title.
 *  - Querying the database for a room that matches the provided name.
 *  - If both the movie and room are found, the method returns a tuple containing:
 *      - Undefined as the first element, indicating the absence of an error.
 *      - A new instance of {@link CreateShowtimeDto} with the corresponding movieId, startTime, endTime, and roomId as the second element.
 *
 * In case any of the required fields are missing, the method immediately returns a tuple with an 
 * appropriate error message as the first element.
 *
 * If the movie or room is not found in the database, the method throws an error.
 *
 * @example
 * ```typescript
 * const [error, showtimeDto] = await CreateShowtimeDto.fromRequest(requestBody);
 * if (error) {
 *   // Handle the error (e.g., return a 400 response)
 * } else {
 *   // Proceed with creating the showtime using showtimeDto
 * }
 * ```
 *
 * @public
 */
export class CreateShowtimeDto {
  constructor(
    public movieId: number,
    public startTime: string,
    public endTime: string,
    public roomId: string
  ) {}

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
