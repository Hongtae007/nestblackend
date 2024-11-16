/*
  Warnings:

  - A unique constraint covering the columns `[rfid]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rfid` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rfid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_rfid_key" ON "Product"("rfid");
