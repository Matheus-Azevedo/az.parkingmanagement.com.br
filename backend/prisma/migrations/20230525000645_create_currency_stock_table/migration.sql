-- CreateTable
CREATE TABLE "CurrencyStock" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CurrencyStock_pkey" PRIMARY KEY ("id")
);
