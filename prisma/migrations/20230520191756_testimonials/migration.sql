-- CreateTable
CREATE TABLE "Testimonials" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);
