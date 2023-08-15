/*
  Warnings:

  - Added the required column `CategoryId` to the `ShowCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShowCase" ADD COLUMN     "CategoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ShowCaseCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ShowCaseCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShowCase" ADD CONSTRAINT "ShowCase_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "ShowCaseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
