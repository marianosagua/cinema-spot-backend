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
    prismaClient.users.deleteMany(),
    prismaClient.movies.deleteMany(),
    prismaClient.categories.deleteMany(),
    prismaClient.reservations.deleteMany(),
    prismaClient.rooms.deleteMany(),
    prismaClient.roles.deleteMany(),
    prismaClient.showtimes.deleteMany(),
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
        data: { name: role.name, description: role.description },
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

  console.log("Seed completed");
}
