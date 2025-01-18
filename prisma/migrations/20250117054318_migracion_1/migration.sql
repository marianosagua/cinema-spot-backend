/*
  Warnings:

  - You are about to drop the column `function_id` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `functions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[role_name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "functions" DROP CONSTRAINT "fk_movie";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "fk_function";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "fk_user";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "fk_user";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "function_id",
ADD COLUMN     "showtime" UUID,
ADD COLUMN     "state_reservation" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email_validated" DROP DEFAULT;

-- DropTable
DROP TABLE "functions";

-- CreateTable
CREATE TABLE "showtimes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "movie" INTEGER,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "hall" INTEGER NOT NULL,
    "reservationscount" INTEGER DEFAULT 20,

    CONSTRAINT "functions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "fk_function" FOREIGN KEY ("showtime") REFERENCES "showtimes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_user" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "fk_halls" FOREIGN KEY ("hall") REFERENCES "halls"("hall_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "fk_movie" FOREIGN KEY ("movie") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
