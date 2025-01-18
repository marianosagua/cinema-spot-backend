import { prismaClient } from "../../data/postgres/client-connection";
import { Reservation } from "../../interfaces";

export class ReservationsService {
  getReservations = async () => {
    try {
      const reservations = await prismaClient.reservations.findMany({
        select: {
          id: true,
          users: {
            select: {
              name: true,
            },
          },
          showtime_id: true,
        },
      });

      const transformedReservations = reservations.map((reservation) => ({
        id: reservation.id,
        user: reservation.users.name,
        showtime_id: reservation.showtime_id,
      }));

      return transformedReservations;
    } catch (error) {
      throw new Error("Error occurred while fetching reservations");
    }
  };

  getReservation = async (id: string) => {
    try {
      const reservation = prismaClient.reservations.findUnique({
        where: { id },
      });
      return reservation;
    } catch (error) {
      throw new Error("Error occurred while fetching reservation");
    }
  };

  addReservation = async (reservation: Reservation) => {
    try {
      const showtime = await prismaClient.showtimes.findFirst({
        where: {
          id: reservation.showtime_id,
        },
      });

      if (showtime?.reservationscount === 0) {
        throw new Error("No more reservations available for this showtime");
      }

      await prismaClient.reservations.create({
        data: {
          user_id: reservation.user_id,
          showtime_id: reservation.showtime_id,
        },
      });

      await prismaClient.showtimes.update({
        where: {
          id: reservation.showtime_id,
        },
        data: {
          reservationscount: {
            decrement: 1,
          },
        },
      });
    } catch (error) {
      throw new Error("Error occurred while adding reservation");
    }
  };

  deleteReservation = async (id: string) => {
    try {
      const reservation = await prismaClient.reservations.delete({
        where: { id },
      });

      await prismaClient.showtimes.update({
        where: {
          id: reservation.showtime_id,
        },
        data: {
          reservationscount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      throw new Error("Error occurred while deleting reservation");
    }
  };
}
