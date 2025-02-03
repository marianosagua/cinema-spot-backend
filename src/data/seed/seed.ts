import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prismaClient } from "../postgres/client-connection";
import { dataSeed } from "./dataSeed";

(async () => {
  await prismaClient.$connect();
  await seed();
  await prismaClient.$disconnect();
})();

async function seed() {
  await Promise.all([
    prismaClient.movies.deleteMany(),
    prismaClient.categories.deleteMany(),
    prismaClient.showtimes.deleteMany(),
    prismaClient.seats.deleteMany(),
    prismaClient.rooms.deleteMany(),
    prismaClient.users.deleteMany(),
    prismaClient.roles.deleteMany(),
  ]);

  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."seats_id_seq" RESTART WITH 1`;
  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."users_id_seq" RESTART WITH 1`;
  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."roles_id_seq" RESTART WITH 1`;
  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."showtimes_id_seq" RESTART WITH 1`;
  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."movies_id_seq" RESTART WITH 1`;
  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."rooms_id_seq" RESTART WITH 1`;
  // await prismaClient.$executeRaw`ALTER SEQUENCE "public"."categories_id_seq" RESTART WITH 1`;

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
