/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `CurrencyStock` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CurrencyStock" ALTER COLUMN "value" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyStock_value_key" ON "CurrencyStock"("value");
