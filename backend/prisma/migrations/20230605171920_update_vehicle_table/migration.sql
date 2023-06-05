/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userEmail_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
