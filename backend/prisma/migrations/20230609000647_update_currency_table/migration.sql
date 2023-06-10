/*
  Warnings:

  - You are about to drop the column `value` on the `CurrencyStock` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CurrencyStock_value_key";

-- AlterTable
ALTER TABLE "CurrencyStock" DROP COLUMN "value";
