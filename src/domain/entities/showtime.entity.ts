import { CustomError } from "../errors";

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
