// seed.ts - Script de inicialización (seeding) de la base de datos para CinemaSpot Backend
//
// Este archivo ejecuta el proceso de seeding para poblar la base de datos PostgreSQL con datos de ejemplo y configuración inicial.
// Utiliza Prisma ORM y los datos definidos en dataSeed.ts. Es útil para entornos de desarrollo, pruebas o despliegue inicial.
//
// Funcionalidades principales:
// - Limpia todas las tablas relevantes y resetea las secuencias de IDs.
// - Inserta categorías, películas, próximos estrenos, salas, roles, usuarios, funciones, asientos, actores y el reparto de películas.
// - Hashea las contraseñas de los usuarios antes de insertarlas.
//
// Estructura del archivo:
// - Ejecución automática (IIFE) que conecta, ejecuta el seed y desconecta Prisma.
// - Función seed(): Orquesta el proceso de borrado, reseteo e inserción de datos.
// - Función deleteAllData(): Elimina todos los registros de las tablas principales.
// - Función resetSequences(): Reinicia los contadores de secuencias de IDs en la base de datos.
//
// Uso:
// Ejecutar este archivo con Node.js para poblar la base de datos:
//   npx ts-node src/data/seed/seed.ts
//
// Modifica dataSeed.ts para cambiar los datos de ejemplo según las necesidades del proyecto.
//
// Recomendación:
// No ejecutar en entornos de producción, ya que elimina todos los datos existentes.

import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prismaClient } from "../postgres/client-connection";
import { dataSeed } from "./dataSeed";

(async () => {
  try {
    console.log("Iniciando el seed de la base de datos...");
    await prismaClient.$connect();
    await seed();
    console.log("Seed completado exitosamente");
  } catch (error) {
    console.error("Error al ejecutar el seed de la base de datos:", error);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
})();

async function seed() {
  try {
    console.log("Eliminando datos existentes...");
    await deleteAllData();

    console.log("Reseteando secuencias...");
    await resetSequences();

    console.log("Creando categorías...");
    await prismaClient.categories.createMany({
      data: dataSeed.categories,
    });

    console.log("Creando películas...");
    const movies = await Promise.all(
      dataSeed.movies.map((movie) =>
        prismaClient.movies.create({
          data: {
            title: movie.title,
            description: movie.description,
            poster: movie.poster,
            category: movie.category,
            duration: movie.duration,
            banner: movie.banner,
            synopsis: movie.synopsis,
            trailer: movie.trailer,
            director: movie.director,
            rating: movie.rating,
            review: movie.review,
          },
        })
      )
    );

    console.log("Creando próximos estrenos...");
    await Promise.all(
      dataSeed.futureReleases.map((release) =>
        prismaClient.future_releases.create({
          data: {
            title: release.title,
            description: release.description,
            poster: release.poster,
            category: release.category,
            duration: release.duration,
            banner: release.banner,
            synopsis: release.synopsis,
            trailer: release.trailer,
            director: release.director,
            rating: release.rating,
            release_date: release.release_date,
          },
        })
      )
    );

    console.log("Creando salas...");
    await prismaClient.rooms.createMany({
      data: dataSeed.rooms,
    });

    console.log("Creando roles...");
    await prismaClient.roles.createMany({
      data: dataSeed.roles,
    });

    console.log("Creando usuarios...");
    const roles = await prismaClient.roles.findMany();

    await Promise.all(
      dataSeed.users.map((user) =>
        prismaClient.users.create({
          data: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: bcryptAdapter.hash(user.password),
            role: roles.find((role) => role.name === user.role)?.id,
          },
        })
      )
    );

    console.log("Creando funciones...");
    const moviesFetch = await prismaClient.movies.findMany();
    const rooms = await prismaClient.rooms.findMany();
    await Promise.all(
      dataSeed.showtimes.map((showtime) =>
        prismaClient.showtimes.create({
          data: {
            movie:
              moviesFetch.find((movie) => movie.title === showtime.movie)?.id ??
              0,
            start_time: new Date(showtime.start_time),
            end_time: new Date(showtime.end_time),
            room: rooms.find((room) => room.name === showtime.room)?.id ?? "",
          },
        })
      )
    );

    console.log("Creando asientos...");
    await Promise.all(
      dataSeed.seats.map((seat) =>
        prismaClient.seats.create({
          data: {
            seat_number: seat.seat_number,
            room: rooms.find((room) => room.name === seat.room)?.id ?? "",
            is_available: seat.is_available,
          },
        })
      )
    );

    console.log("Creando actores...");
    await prismaClient.actors.createMany({
      data: dataSeed.actors,
    });

    console.log("Creando reparto de películas...");
    const actors = await prismaClient.actors.findMany();

    await Promise.all(
      dataSeed.movieCast.map((cast) =>
        prismaClient.movie_cast.create({
          data: {
            actor:
              actors.find((actor) =>
                actor.last_name.includes(cast.actor.split(" ").at(-1) ?? "")
              )?.id ?? 0,
            movie:
              moviesFetch.find((movie) => movie.title === cast.movie)?.id ?? 0,
          },
        })
      )
    );

    console.log("Seed finalizado");
  } catch (error) {
    console.error("Error durante el seed:", error);
    throw error;
  }
}

async function deleteAllData() {
  await prismaClient.movie_cast.deleteMany({});
  await prismaClient.actors.deleteMany({});
  await prismaClient.reservations.deleteMany({});
  await prismaClient.seats.deleteMany({});
  await prismaClient.showtimes.deleteMany({});
  await prismaClient.future_releases.deleteMany({});
  await prismaClient.movies.deleteMany({});
  await prismaClient.users.deleteMany({});
  await prismaClient.categories.deleteMany({});
  await prismaClient.rooms.deleteMany({});
  await prismaClient.roles.deleteMany({});
}

async function resetSequences() {
  try {
    await prismaClient.$queryRaw`SELECT setval('"actors_id_seq"', 1, false)`;
    await prismaClient.$queryRaw`SELECT setval('"categories_id_seq"', 1, false)`;
    await prismaClient.$queryRaw`SELECT setval('"future_releases_id_seq"', 1, false)`;
    await prismaClient.$queryRaw`SELECT setval('"movies_id_seq"', 1, false)`;
    await prismaClient.$queryRaw`SELECT setval('"roles_id_seq"', 1, false)`;
  } catch (error) {
    console.error("Error reseteando secuencias:", error);
    throw error;
  }
}
