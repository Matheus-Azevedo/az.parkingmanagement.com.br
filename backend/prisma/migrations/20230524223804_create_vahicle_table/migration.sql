/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "plaque" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit" TIMESTAMP(3),
    "totalSpent" DOUBLE PRECISION,
    "amountPaid" DOUBLE PRECISION,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plaque_key" ON "Vehicle"("plaque");
