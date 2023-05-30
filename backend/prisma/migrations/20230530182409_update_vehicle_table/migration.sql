/*
  Warnings:

  - You are about to drop the column `amountPaid` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `exit` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `totalSpent` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "amountPaid",
DROP COLUMN "exit",
DROP COLUMN "totalSpent";
