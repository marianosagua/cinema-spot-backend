/*
  Warnings:

  - The primary key for the `movie_cast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actor_id` on the `movie_cast` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `movie_cast` table. All the data in the column will be lost.
  - Added the required column `actor` to the `movie_cast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie` to the `movie_cast` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_movie_id_fkey";

-- AlterTable
ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_pkey",
DROP COLUMN "actor_id",
DROP COLUMN "movie_id",
ADD COLUMN     "actor" INTEGER NOT NULL,
ADD COLUMN     "movie" INTEGER NOT NULL,
ADD CONSTRAINT "movie_cast_pkey" PRIMARY KEY ("movie", "actor");

-- AddForeignKey
ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_actor_fkey" FOREIGN KEY ("actor") REFERENCES "actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_movie_fkey" FOREIGN KEY ("movie") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
