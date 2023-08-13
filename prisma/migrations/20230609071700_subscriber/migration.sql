-- CreateTable
CREATE TABLE "Subscribers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");
