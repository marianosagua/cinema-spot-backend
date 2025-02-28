import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Room } from "../../interfaces/room";

export class RoomsService {
  async getRooms() {
    const rooms = await prismaClient.rooms.findMany();

    if (!rooms) {
      throw CustomError.notFound("Rooms not found");
    }

    return rooms;
  }

  async getRoomById(id: string) {
    const room = await prismaClient.rooms.findFirst({
      where: {
        id,
      },
    });

    if (!room) {
      throw CustomError.notFound("Room not found");
    }

    return room;
  }

  async createRoom(data: Room) {
    const room = await prismaClient.rooms.create({
      data,
    });

    if (!room) {
      throw new Error("Error creating room");
    }

    return room;
  }

  async updateRoom(id: string, data: Room) {
    const room = await prismaClient.rooms.update({
      where: {
        id,
      },
      data,
    });

    if (!room) {
      throw CustomError.notFound("Room not found");
    }

    return room;
  }

  async deleteRoom(id: string) {
    const room = await prismaClient.rooms.delete({
      where: {
        id,
      },
    });

    if (!room) {
      throw CustomError.notFound("Room not found");
    }

    return room;
  }
}
