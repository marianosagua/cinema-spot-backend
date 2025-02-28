import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Reservation } from "../../interfaces";

export class ReservationsService {
  getReservations = async () => {
    const reservations = await prismaClient.reservations.findMany({
      select: {
        id: true,
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        showtimes: {
          select: {
            id: true,
            movies: {
              select: {
                id: true,
                title: true,
                description: true,
                poster: true,
              },
            },
            start_time: true,
            end_time: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        seats: {
          select: {
            id: true,
            seat_number: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!reservations) {
      throw CustomError.notFound("Reservations not found");
    }

    const transformedReservations = reservations.map((reservation) => ({
      id_reservation: reservation.id,
      user_data: {
        id: reservation.users.id,
        first_name: reservation.users.first_name,
        last_name: reservation.users.last_name,
        email: reservation.users.email,
      },
      showtime_data: {
        id: reservation.showtimes.id,
        movie: {
          id: reservation.showtimes.movies?.id ?? null,
          title: reservation.showtimes.movies?.title ?? null,
          description: reservation.showtimes.movies?.description ?? null,
          poster: reservation.showtimes.movies?.poster ?? null,
        },
        start_time: reservation.showtimes.start_time,
        end_time: reservation.showtimes.end_time,
        room: {
          id: reservation.showtimes.rooms.id,
          name: reservation.showtimes.rooms.name,
        },
      },
      seat_data: {
        id: reservation.seats.id,
        seat_number: reservation.seats.seat_number,
        room: {
          id: reservation.seats.rooms?.id ?? null,
          name: reservation.seats.rooms?.name ?? null,
        },
      },
    }));

    return transformedReservations;
  };

  getReservation = async (id: string) => {
    const reservation = await prismaClient.reservations.findUnique({
      where: { id },
      select: {
        id: true,
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        showtimes: {
          select: {
            id: true,
            movies: {
              select: {
                id: true,
                title: true,
                description: true,
                poster: true,
              },
            },
            start_time: true,
            end_time: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        seats: {
          select: {
            id: true,
            seat_number: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!reservation) {
      throw CustomError.notFound("Reservation not found");
    }

    return {
      id_reservation: reservation.id,
      user_data: {
        id: reservation.users.id,
        first_name: reservation.users.first_name,
        last_name: reservation.users.last_name,
        email: reservation.users.email,
      },
      showtime_data: {
        id: reservation.showtimes.id,
        movie: {
          id: reservation.showtimes.movies?.id ?? null,
          title: reservation.showtimes.movies?.title ?? null,
          description: reservation.showtimes.movies?.description ?? null,
          poster: reservation.showtimes.movies?.poster ?? null,
        },
        start_time: reservation.showtimes.start_time,
        end_time: reservation.showtimes.end_time,
        room: {
          id: reservation.showtimes.rooms.id,
          name: reservation.showtimes.rooms.name,
        },
      },
      seat_data: {
        id: reservation.seats.id,
        seat_number: reservation.seats.seat_number,
        room: {
          id: reservation.seats.rooms?.id ?? null,
          name: reservation.seats.rooms?.name ?? null,
        },
      },
    };
  };

  getReservationsByUser = async (userId: string) => {
    const reservations = await prismaClient.reservations.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        showtimes: {
          select: {
            id: true,
            movies: {
              select: {
                id: true,
                title: true,
                description: true,
                poster: true,
              },
            },
            start_time: true,
            end_time: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        seats: {
          select: {
            id: true,
            seat_number: true,
            rooms: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!reservations) {
      throw CustomError.notFound("Reservations not found");
    }

    const transformedReservations = reservations.map((reservation) => ({
      id_reservation: reservation.id,
      user_data: {
        id: reservation.users.id,
        first_name: reservation.users.first_name,
        last_name: reservation.users.last_name,
        email: reservation.users.email,
      },
      showtime_data: {
        id: reservation.showtimes.id,
        movie: {
          id: reservation.showtimes.movies?.id ?? null,
          title: reservation.showtimes.movies?.title ?? null,
          description: reservation.showtimes.movies?.description ?? null,
          poster: reservation.showtimes.movies?.poster ?? null,
        },
        start_time: reservation.showtimes.start_time,
        end_time: reservation.showtimes.end_time,
        room: {
          id: reservation.showtimes.rooms.id,
          name: reservation.showtimes.rooms.name,
        },
      },
      seat_data: {
        id: reservation.seats.id,
        seat_number: reservation.seats.seat_number,
        room: {
          id: reservation.seats.rooms?.id ?? null,
          name: reservation.seats.rooms?.name ?? null,
        },
      },
    }));

    return transformedReservations;
  };

  addReservation = async (reservation: Reservation) => {
    const showtime = await prismaClient.showtimes.findFirst({
      where: {
        id: reservation.showtime_id,
      },
    });

    const reservations = await prismaClient.reservations.findMany({
      where: {
        showtime_id: showtime?.id,
      },
    });

    if (showtime?.is_full) {
      throw CustomError.forbidden("Showtime is already full");
    }

    if (reservations.length === 19) {
      await prismaClient.showtimes.update({
        where: { id: reservation.showtime_id },
        data: { is_full: true },
      });
    }

    for (const seat_id of reservation.seat_ids) {
      await prismaClient.reservations.create({
        data: {
          user_id: reservation.user_id,
          showtime_id: reservation.showtime_id,
          seat_id,
        },
      });
    }
  };

  deleteReservation = async (id: string) => {
    await prismaClient.reservations.delete({
      where: { id },
    });
  };
}
