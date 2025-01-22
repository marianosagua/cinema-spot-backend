import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Seat } from "../../interfaces";

export class SeatsService {
  async getSeats() {
    const seats = await prismaClient.seats.findMany();

    if (!seats) {
      throw CustomError.notFound("Seats not found");
    }

    return seats.sort((a, b) => a.seat_number - b.seat_number);
  }

  async getSeatById(id: string) {
    const seat = await prismaClient.seats.findFirst({
      where: {
        id,
      },
    });

    if (!seat) {
      throw CustomError.notFound("Seat not found");
    }

    return seat;
  }

  async updateSeat(id: string, data: Seat) {
    const seat = await prismaClient.seats.update({
      where: {
        id,
      },
      data,
    });

    if (!seat) {
      throw CustomError.notFound("Seat not found");
    }

    return seat;
  }

  async createSeat(data: Seat) {
    const seat = await prismaClient.seats.create({
      data,
    });

    return seat;
  }

  async deleteSeat(id: string) {
    const seat = await prismaClient.seats.delete({
      where: {
        id,
      },
    });

    if (!seat) {
      throw CustomError.notFound("Seat not found");
    }
  }
}
