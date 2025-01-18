/*
  Warnings:

  - You are about to drop the column `category_id` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "fk_category";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "fk_user";

-- DropIndex
DROP INDEX "roles_role_name_key";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "category_id",
ADD COLUMN     "category" INTEGER;

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "user_id",
ADD COLUMN     "user" UUID;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "role_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_id",
ADD COLUMN     "role" INTEGER DEFAULT 2,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email_validated" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("name");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "fk_category" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_fkey" FOREIGN KEY ("role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
