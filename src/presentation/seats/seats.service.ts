import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Seat } from "../../interfaces";

/**
 * Servicio para la gestión de asientos en salas de cine.
 * Proporciona métodos para consultar, crear, actualizar y eliminar asientos en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class SeatsService {
  /**
   * Obtiene todos los asientos existentes.
   * @returns {Promise<any[]>} Lista de asientos ordenados por número.
   * @throws {CustomError} Si no se encuentran asientos.
   */
  async getSeats() {
    const seats = await prismaClient.seats.findMany();

    if (!seats) {
      throw CustomError.notFound("Seats not found");
    }

    return seats.sort((a, b) => a.seat_number - b.seat_number);
  }

  /**
   * Obtiene un asiento por su ID.
   * @param {string} id - ID del asiento.
   * @returns {Promise<any>} Asiento encontrado.
   * @throws {CustomError} Si el asiento no existe.
   */
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

  /**
   * Obtiene todos los asientos de una sala por nombre de sala.
   * @param {string} name - Nombre de la sala.
   * @returns {Promise<any[]>} Lista de asientos ordenados por número.
   * @throws {CustomError} Si no se encuentran asientos.
   */
  async getSeatsByRoom(name: string) {
    const seats = await prismaClient.seats.findMany({
      where: {
        rooms: {
          name,
        },
      },
    });

    if (!seats) {
      throw CustomError.notFound("Seats not found");
    }

    return seats.sort((a, b) => a.seat_number - b.seat_number);
  }

  /**
   * Actualiza un asiento por su ID.
   * @param {string} id - ID del asiento.
   * @param {Seat} data - Datos actualizados del asiento.
   * @returns {Promise<any>} Asiento actualizado.
   * @throws {CustomError} Si el asiento no existe.
   */
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

  /**
   * Crea un nuevo asiento.
   * @param {Seat} data - Datos del asiento.
   * @returns {Promise<any>} Asiento creado.
   */
  async createSeat(data: Seat) {
    const seat = await prismaClient.seats.create({
      data,
    });

    return seat;
  }

  /**
   * Elimina un asiento por su ID.
   * @param {string} id - ID del asiento.
   * @returns {Promise<void>} No retorna valor.
   * @throws {CustomError} Si el asiento no existe.
   */
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
