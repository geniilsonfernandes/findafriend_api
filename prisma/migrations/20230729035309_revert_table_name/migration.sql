/*
  Warnings:

  - You are about to drop the `pets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pets";

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy_level" TEXT NOT NULL,
    "independence_level" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "photos" TEXT[],
    "requirements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);
