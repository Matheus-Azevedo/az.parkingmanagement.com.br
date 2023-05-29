/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CurrencyStock` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CurrencyStock" ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyStock_name_key" ON "CurrencyStock"("name");
