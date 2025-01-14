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
    prismaClient.functions.deleteMany(),
    prismaClient.halls.deleteMany(),
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
          category_id: category?.id,
        },
      });
    })
  );

  const halls = await Promise.all(
    dataSeed.halls.map((hall) => prismaClient.halls.create({ data: hall }))
  );

  const roles = await Promise.all(
    dataSeed.roles.map((role) =>
      prismaClient.roles.create({
        data: { role_name: role.name, description: role.description },
      })
    )
  );

  const adminUsers = await prismaClient.users.createMany({
    data: dataSeed.users.map((user) => {
      const role = roles.find((r) => r.role_name === user.role_id);
      const hashedPassword = bcryptAdapter.hash(user.password);
      return {
        ...user,
        password: hashedPassword,
        role_id: role?.id,
      };
    }),
  });

  console.log("Seed completed");
}
