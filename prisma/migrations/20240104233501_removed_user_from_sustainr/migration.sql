/*
  Warnings:

  - You are about to drop the column `userId` on the `Sustainr` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sustainr" DROP CONSTRAINT "Sustainr_userId_fkey";

-- AlterTable
ALTER TABLE "Sustainr" DROP COLUMN "userId";
