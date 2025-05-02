import { prismaClient } from "../../data/postgres/client-connection";
import { CustomError } from "../../domain/errors";
import { Room } from "../../interfaces/room";

/**
 * Servicio para la gestión de salas de cine.
 * Proporciona métodos para consultar, crear, actualizar y eliminar salas en la base de datos.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */
export class RoomsService {
  /**
   * Obtiene todas las salas existentes.
   * @returns {Promise<any[]>} Lista de salas.
   * @throws {CustomError} Si no se encuentran salas.
   */
  async getRooms() {
    const rooms = await prismaClient.rooms.findMany();

    if (!rooms) {
      throw CustomError.notFound("Rooms not found");
    }

    return rooms;
  }

  /**
   * Obtiene una sala por su ID.
   * @param {string} id - ID de la sala.
   * @returns {Promise<any>} Sala encontrada.
   * @throws {CustomError} Si la sala no existe.
   */
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

  /**
   * Crea una nueva sala.
   * @param {Room} data - Datos de la sala.
   * @returns {Promise<any>} Sala creada.
   * @throws {Error} Si ocurre un error al crear la sala.
   */
  async createRoom(data: Room) {
    const room = await prismaClient.rooms.create({
      data,
    });

    if (!room) {
      throw new Error("Error creating room");
    }

    return room;
  }

  /**
   * Actualiza una sala existente por su ID.
   * @param {string} id - ID de la sala.
   * @param {Room} data - Datos actualizados.
   * @returns {Promise<any>} Sala actualizada.
   * @throws {CustomError} Si la sala no existe.
   */
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

  /**
   * Elimina una sala por su ID.
   * @param {string} id - ID de la sala.
   * @returns {Promise<any>} Sala eliminada.
   * @throws {CustomError} Si la sala no existe.
   */
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
