import { CustomError } from "../errors";

/**
 * Represents a showtime entity within the Movie Reservation System.
 *
 * This class encapsulates all properties related to a movie showtime, including the movie
 * identifier, start time, end time, and the room where the showtime will take place. Optional
 * properties include an identifier and a flag to indicate whether the showtime is full.
 *
 * @remarks
 * The static {@link create} method validates the input by ensuring that the movie, start time,
 * end time, and room are provided. If any of these required fields are missing, it throws a
 * {@link CustomError} with an appropriate error message. Optional properties are given default
 * values when not provided (an empty string for the id and false for is_full).
 *
 * @example
 * ```typescript
 * const showtime = ShowtimeEntity.create({
 *   movie: "Inception",
 *   start_time: "2022-01-01T09:00:00",
 *   end_time: "2022-01-01T12:00:00",
 *   room: "A1"
 * });
 * ```
 *
 * @public
 */
export class ShowtimeEntity {
  constructor(
    public readonly movie: string,
    public readonly start_time: string,
    public readonly end_time: string,
    public readonly room: string,
    public readonly id?: string,
    public readonly is_full?: boolean
  ) {}

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
