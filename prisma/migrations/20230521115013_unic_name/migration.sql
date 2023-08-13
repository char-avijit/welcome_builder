/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Testimonials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Testimonials_name_key" ON "Testimonials"("name");
