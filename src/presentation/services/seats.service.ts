import { prismaClient } from "../../data/postgres/client-connection";

export class SeatsService {
  async getSeatsByRoom(room: string) {
    try {
      const seats = await prismaClient.seats.findMany({
        where: {
          room,
        },
      });

      return seats.sort((a, b) => a.seat_number - b.seat_number);
    } catch (error) {
      throw new Error("Error occurred while fetching seats");
    }
  }

  async getRoomByName(name: string) {
    try {
      const room = await prismaClient.rooms.findFirst({
        where: {
          name,
        },
      });

      return room;
    } catch (error) {
      throw new Error("Error occurred while fetching rooms");
    }
  }
}
