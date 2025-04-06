import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prismaClient } from "../postgres/client-connection";
import { dataSeed } from "./dataSeed";

(async () => {
  try {
    console.log("Starting database seeding...");
    await prismaClient.$connect();
    await seed();
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
})();

/**
 * Seeds the database with initial data for the Movie Reservation System.
 *
 * This function creates all necessary records in the database, maintaining proper
 * relationship integrity and optimizing for performance with batch operations
 * and efficient lookups.
 */
async function seed() {
  try {
    // Clean up existing data - order matters due to foreign key constraints
    console.log("Cleaning up existing data...");
    await deleteAllData();

    // Reset sequences for primary keys
    console.log("Resetting sequences...");
    await resetSequences();

    // Create categories
    console.log("Creating categories...");
    await prismaClient.categories.createMany({
      data: dataSeed.categories,
    });

    // Create movies
    console.log("Creating movies...");
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

    // Create future releases
    console.log("Creating future releases...");
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

    // Create rooms
    console.log("Creating rooms...");
    await prismaClient.rooms.createMany({
      data: dataSeed.rooms,
    });

    // Create roles
    console.log("Creating roles...");
    await prismaClient.roles.createMany({
      data: dataSeed.roles,
    });

    // Create users
    console.log("Creating users...");
    // Fetch roles from the database
    const roles = await prismaClient.roles.findMany();
    // Create users with hashed passwords
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

    // Create showtimes
    console.log("Creating showtimes...");
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

    // Create seats
    console.log("Creating seats...");
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

    // Create actors
    console.log("Creating actors...");
    await prismaClient.actors.createMany({
      data: dataSeed.actors,
    });

    // Create movie cast
    console.log("Creating movie cast...");
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

    console.log("Seed completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

/**
 * Deletes all existing data from the database tables.
 */
async function deleteAllData() {
  await prismaClient.reservations.deleteMany();
  await prismaClient.showtimes.deleteMany();
  await prismaClient.seats.deleteMany();
  await prismaClient.users.deleteMany();
  await prismaClient.movie_cast.deleteMany();
  await prismaClient.movies.deleteMany();
  await prismaClient.rooms.deleteMany();
  await prismaClient.roles.deleteMany();
  await prismaClient.future_releases.deleteMany();
  await prismaClient.categories.deleteMany();
  await prismaClient.actors.deleteMany();
}

/**
 * Resets the sequences.
 */
async function resetSequences() {
  await prismaClient.$executeRaw`ALTER SEQUENCE "movies_id_seq" RESTART WITH 1;`;
  await prismaClient.$executeRaw`ALTER SEQUENCE "actors_id_seq" RESTART WITH 1;`;
  await prismaClient.$executeRaw`ALTER SEQUENCE "future_releases_id_seq" RESTART WITH 1;`;
  await prismaClient.$executeRaw`ALTER SEQUENCE "categories_id_seq" RESTART WITH 1;`;
  await prismaClient.$executeRaw`ALTER SEQUENCE "roles_id_seq" RESTART WITH 1;`;
}
