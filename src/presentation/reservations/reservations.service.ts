import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Reservation } from "../../interfaces";

/**
 * Servicio para la gestión de reservas de asientos.
 * Proporciona métodos para consultar, crear y eliminar reservas en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class ReservationsService {
  /**
   * Obtiene todas las reservas existentes.
   * @returns {Promise<any[]>} Lista de reservas con datos de usuario, función y asiento.
   * @throws {CustomError} Si no se encuentran reservas.
   */
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

  /**
   * Obtiene una reserva por su ID.
   * @param {string} id - ID de la reserva.
   * @returns {Promise<any>} Reserva encontrada con datos de usuario, función y asiento.
   * @throws {CustomError} Si la reserva no existe.
   */
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

  /**
   * Obtiene todas las reservas de un usuario.
   * @param {string} userId - ID del usuario.
   * @returns {Promise<any[]>} Lista de reservas del usuario.
   * @throws {CustomError} Si no se encuentran reservas.
   */
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

  /**
   * Crea una nueva reserva de asiento(s) para un usuario y función.
   * @param {Reservation} reservation - Datos de la reserva.
   * @returns {Promise<void>} No retorna valor, lanza error si falla.
   * @throws {CustomError} Si la función está llena o hay error en la reserva.
   */
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

  /**
   * Elimina una reserva por su ID.
   * @param {string} id - ID de la reserva.
   * @returns {Promise<void>} No retorna valor.
   */
  deleteReservation = async (id: string) => {
    await prismaClient.reservations.delete({
      where: { id },
    });
  };
}
