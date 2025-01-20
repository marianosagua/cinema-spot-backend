/*
  Warnings:

  - You are about to drop the column `showtime` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `state_reservation` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `hall` on the `showtimes` table. All the data in the column will be lost.
  - You are about to drop the column `reservationscount` on the `showtimes` table. All the data in the column will be lost.
  - You are about to drop the `halls` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `showtime_id` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `showtimes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "fk_function";

-- DropForeignKey
ALTER TABLE "showtimes" DROP CONSTRAINT "fk_halls";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "showtime",
DROP COLUMN "state_reservation",
DROP COLUMN "user",
ADD COLUMN     "showtime_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "showtimes" DROP COLUMN "hall",
DROP COLUMN "reservationscount",
ADD COLUMN     "room" UUID NOT NULL;

-- AlterTable
ALTER TABLE "users" RENAME CONSTRAINT "users_pkey" TO "users_pkey1",
ALTER COLUMN "role" SET DEFAULT 1;

-- DropTable
DROP TABLE "halls";

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "seat_occupied" INTEGER,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "seat_number" INTEGER NOT NULL,
    "room" UUID,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reservations_user_id_key" ON "reservations"("user_id");

-- RenameForeignKey
ALTER TABLE "users" RENAME CONSTRAINT "users_role_fkey" TO "users_role_fkey1";

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtimes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_room_fkey" FOREIGN KEY ("room") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_room_fkey" FOREIGN KEY ("room") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER INDEX "users_email_key" RENAME TO "users_email_key1";

-- RenameIndex
ALTER INDEX "users_password_key" RENAME TO "users_password_key1";
