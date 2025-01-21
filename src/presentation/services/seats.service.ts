import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";

export class SeatsService {
  async getSeatsByRoom(room: string) {
    const seats = await prismaClient.seats.findMany({
      where: {
        room,
      },
    });

    if (!seats) {
      throw CustomError.notFound("Seats of the room not found");
    }

    return seats.sort((a, b) => a.seat_number - b.seat_number);
  }

  async getRoomByName(name: string) {
    const room = await prismaClient.rooms.findFirst({
      where: {
        name,
      },
    });

    if (!room) {
      throw CustomError.notFound("Room not found");
    }

    return room;
  }
}
