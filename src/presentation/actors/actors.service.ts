// -----------------------------------------------------------------------------
// Servicio para la gestión de actores
// Maneja toda la lógica de negocio relacionada con los actores
// -----------------------------------------------------------------------------

import { PrismaClient } from "@prisma/client";
import { CreateActorDto } from "../../domain/dtos/actors";
import { UpdateActorDto } from "../../domain/dtos/actors";
import { Actor } from "../../interfaces/actor";
import { CustomError } from "../../domain/errors";

const prisma = new PrismaClient();

export class ActorsService {
  /**
   * Obtiene todos los actores del sistema
   * @returns Lista de todos los actores ordenados por ID
   */
  async getAllActors(): Promise<Actor[]> {
    try {
      const actors = await prisma.actors.findMany({
        orderBy: {
          id: "asc",
        },
      });

      return actors;
    } catch (error) {
      throw CustomError.internal("Error al obtener los actores");
    }
  }

  /**
   * Obtiene un actor por su ID
   * @param id ID del actor a buscar
   * @returns Actor encontrado
   */
  async getActorById(id: number): Promise<Actor> {
    try {
      const actor = await prisma.actors.findUnique({
        where: { id },
      });

      if (!actor) {
        throw CustomError.notFound("Actor no encontrado");
      }

      return actor;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal("Error al obtener el actor");
    }
  }

  /**
   * Crea un nuevo actor
   * @param createActorDto Datos del actor a crear
   * @returns Actor creado
   */
  async createActor(createActorDto: CreateActorDto): Promise<Actor> {
    try {
      const actor = await prisma.actors.create({
        data: {
          first_name: createActorDto.first_name,
          last_name: createActorDto.last_name,
          age: createActorDto.age,
          nationality: createActorDto.nationality,
        },
      });

      return actor;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Unique constraint")) {
        throw CustomError.badRequest("Ya existe un actor con ese nombre y apellido");
      }
      throw CustomError.internal("Error al crear el actor");
    }
  }

  /**
   * Actualiza un actor existente
   * @param id ID del actor a actualizar
   * @param updateActorDto Datos a actualizar
   * @returns Actor actualizado
   */
  async updateActor(
    id: number,
    updateActorDto: UpdateActorDto
  ): Promise<Actor> {
    try {
      // Verificar que el actor existe
      const existingActor = await prisma.actors.findUnique({
        where: { id },
      });

      if (!existingActor) {
        throw CustomError.notFound("Actor no encontrado");
      }

      // Preparar los datos a actualizar
      const updateData: any = {};
      if (updateActorDto.first_name !== undefined) {
        updateData.first_name = updateActorDto.first_name;
      }
      if (updateActorDto.last_name !== undefined) {
        updateData.last_name = updateActorDto.last_name;
      }
      if (updateActorDto.age !== undefined) {
        updateData.age = updateActorDto.age;
      }
      if (updateActorDto.nationality !== undefined) {
        updateData.nationality = updateActorDto.nationality;
      }

      const actor = await prisma.actors.update({
        where: { id },
        data: updateData,
      });

      return actor;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof Error && error.message.includes("Unique constraint")) {
        throw CustomError.badRequest("Ya existe un actor con ese nombre y apellido");
      }
      throw CustomError.internal("Error al actualizar el actor");
    }
  }

  /**
   * Elimina un actor por su ID
   * @param id ID del actor a eliminar
   * @returns Mensaje de confirmación
   */
  async deleteActor(id: number): Promise<{ message: string }> {
    try {
      // Verificar que el actor existe
      const existingActor = await prisma.actors.findUnique({
        where: { id },
      });

      if (!existingActor) {
        throw CustomError.notFound("Actor no encontrado");
      }

      // Verificar si el actor está asociado a alguna película
      const movieCast = await prisma.movie_cast.findFirst({
        where: { actor: id },
      });

      if (movieCast) {
        throw CustomError.badRequest(
          "No se puede eliminar el actor porque está asociado a una película"
        );
      }

      await prisma.actors.delete({
        where: { id },
      });

      return { message: "Actor eliminado exitosamente" };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal("Error al eliminar el actor");
    }
  }

  /**
   * Busca actores por nombre o apellido
   * @param searchTerm Término de búsqueda
   * @returns Lista de actores que coinciden con la búsqueda
   */
  async searchActors(searchTerm: string): Promise<Actor[]> {
    try {
      const actors = await prisma.actors.findMany({
        where: {
          OR: [
            {
              first_name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              last_name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          first_name: "asc",
        },
      });

      return actors;
    } catch (error) {
      throw CustomError.internal("Error al buscar actores");
    }
  }
} 