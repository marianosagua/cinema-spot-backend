/*
  Warnings:

  - Added the required column `banner` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailer` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "rating" TEXT NOT NULL,
ADD COLUMN     "review" DECIMAL(3,1) NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL,
ADD COLUMN     "trailer" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "actors" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,

    CONSTRAINT "actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_cast" (
    "movie_id" INTEGER NOT NULL,
    "actor_id" INTEGER NOT NULL,

    CONSTRAINT "movie_cast_pkey" PRIMARY KEY ("movie_id","actor_id")
);

-- CreateTable
CREATE TABLE "future_releases" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "category" INTEGER,
    "duration" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "release_date" DATE NOT NULL,

    CONSTRAINT "future_releases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "future_releases" ADD CONSTRAINT "fk_category" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
