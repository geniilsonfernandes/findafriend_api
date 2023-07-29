/*
  Warnings:

  - Added the required column `password` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "password" TEXT NOT NULL;
