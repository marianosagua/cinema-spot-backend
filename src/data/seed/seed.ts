import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prismaClient } from "../postgres/client-connection";
import { dataSeed } from "./dataSeed";

(async () => {
  await prismaClient.$connect();
  await seed();
  await prismaClient.$disconnect();
})();

/**
 * Seeds the database with initial data for the Movie Reservation System.
 *
 * This asynchronous function performs the following operations:
 *
 * 1. Deletes all existing records concurrently from the database tables: movies, categories, showtimes, seats, rooms, users, and roles.
 *
 * 2. Creates new category records from the data provided in `dataSeed.categories`.
 *
 * 3. Creates new movie records from `dataSeed.movies`, associating each movie with its corresponding category by matching on the category name.
 *
 * 4. Creates new room records using the entries in `dataSeed.rooms`.
 *
 * 5. Creates new role records using the entries in `dataSeed.roles`. Each role is inserted with its specific id, name, and description.
 *
 * 6. Creates new user records in bulk from `dataSeed.users`. For each user, the function hashes the provided password using `bcryptAdapter` and assigns the appropriate role based on the role name.
 *
 * 7. Creates new showtime records from `dataSeed.showtimes`, linking the showtime to its corresponding movie and room, and converting the start and end times to Date objects.
 *
 * 8. Creates new seat records from `dataSeed.seats`, associating each seat with the correct room and setting its availability status.
 *
 * 9. Logs a "Seed completed" message upon successful completion of all operations.
 *
 * @async
 * @function seed
 * @throws {Error} If any of the database operations fail during the seeding process.
 */
async function seed() {
  await Promise.all([
    prismaClient.movies.deleteMany(),
    prismaClient.future_releases.deleteMany(),
    prismaClient.categories.deleteMany(),
    prismaClient.showtimes.deleteMany(),
    prismaClient.seats.deleteMany(),
    prismaClient.rooms.deleteMany(),
    prismaClient.users.deleteMany(),
    prismaClient.roles.deleteMany(),
  ]);

  const categories = await Promise.all(
    dataSeed.categories.map((category) =>
      prismaClient.categories.create({ data: category })
    )
  );

  const movies = await Promise.all(
    dataSeed.movies.map((movie) => {
      const category = categories.find(
        (category: any) => category.name === movie.category
      );
      return prismaClient.movies.create({
        data: {
          title: movie.title,
          description: movie.description,
          poster: movie.poster,
          category: category?.id,
          duration: movie.duration,
          banner: movie.banner,
          synopsis: movie.synopsis,
          trailer: movie.trailer,
          director: movie.director,
          rating: movie.rating,
          review: movie.review,
        },
      });
    })
  );

  await Promise.all(
    dataSeed.futureReleases.map((futureRelease) => {
      const category = categories.find(
        (category: any) => category.name === futureRelease.category
      );
      return prismaClient.future_releases.create({
        data: {
          title: futureRelease.title,
          description: futureRelease.description,
          poster: futureRelease.poster,
          category: category?.id,
          duration: futureRelease.duration,
          banner: futureRelease.banner,
          synopsis: futureRelease.synopsis,
          trailer: futureRelease.trailer,
          director: futureRelease.director,
          rating: futureRelease.rating,
          release_date: futureRelease.release_date,
        },
      });
    })
  );

  const rooms = await Promise.all(
    dataSeed.rooms.map((room) => prismaClient.rooms.create({ data: room }))
  );

  const roles = await Promise.all(
    dataSeed.roles.map((role) =>
      prismaClient.roles.create({
        data: { id: role.id, name: role.name, description: role.description },
      })
    )
  );

  await prismaClient.users.createMany({
    data: dataSeed.users.map((user) => {
      const role = roles.find((r) => r.name === user.role);
      const hashedPassword = bcryptAdapter.hash(user.password);
      return {
        ...user,
        password: hashedPassword,
        role: role?.id,
      };
    }),
  });

  await Promise.all(
    dataSeed.showtimes.map((showtime) => {
      const movie = movies.find((movie) => movie.title === showtime.movie);
      const room = rooms.find((room) => room.name === showtime.room);
      return prismaClient.showtimes.create({
        data: {
          movie: movie?.id,
          room: room?.id!,
          start_time: new Date(showtime.start_time),
          end_time: new Date(showtime.end_time),
        },
      });
    })
  );

  await Promise.all(
    dataSeed.seats.map((seat) => {
      const room = rooms.find((room) => room.name === seat.room);
      return prismaClient.seats.create({
        data: {
          seat_number: seat.seat_number,
          room: room?.id!,
          is_available: seat.is_available,
        },
      });
    })
  );

  console.log("Seed completed");
}
