import { prismaClient } from "../postgres/client-connection";
import { dataSeed } from "./data";

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
    prismaClient.functions.deleteMany(),
    prismaClient.halls.deleteMany(),
  ]);

  const users = await prismaClient.users.createMany({ data: dataSeed.users });

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
          category_id: category?.id,
        },
      });
    })
  );

  const halls = await Promise.all(
    dataSeed.halls.map((hall) => prismaClient.halls.create({ data: hall }))
  );

  const adminUsers = await prismaClient.users.createMany({
    data: dataSeed.users,
  });

  console.log("Seed completed");
}
