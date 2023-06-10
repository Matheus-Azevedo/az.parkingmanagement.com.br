/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `CurrencyStock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `CurrencyStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrencyStock" ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyStock_value_key" ON "CurrencyStock"("value");
