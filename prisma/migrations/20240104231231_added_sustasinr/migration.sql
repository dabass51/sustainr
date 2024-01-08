/*
  Warnings:

  - You are about to drop the column `description` on the `Sustainr` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Sustainr` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Sustainr` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `Sustainr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sustainr" DROP COLUMN "description",
DROP COLUMN "metadata",
DROP COLUMN "title",
ADD COLUMN     "client_id" TEXT NOT NULL,
ADD COLUMN     "data" TEXT,
ADD COLUMN     "resources" TEXT;
