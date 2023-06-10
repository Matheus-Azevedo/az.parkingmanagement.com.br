/*
  Warnings:

  - You are about to drop the column `name` on the `CurrencyStock` table. All the data in the column will be lost.
  - Added the required column `origin` to the `CurrencyStock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CurrencyStock_name_key";

-- AlterTable
ALTER TABLE "CurrencyStock" DROP COLUMN "name",
ADD COLUMN     "origin" TEXT NOT NULL;
