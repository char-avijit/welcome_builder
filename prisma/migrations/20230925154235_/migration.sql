-- CreateTable
CREATE TABLE "Testimonials" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "avatarImageKey" TEXT NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscribers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCaseCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ShowCaseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "areaUnit" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    CONSTRAINT "ShowCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCaseImages" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "showCaseId" INTEGER NOT NULL,

    CONSTRAINT "ShowCaseImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCaseMetaData" (
    "id" SERIAL NOT NULL,
    "showCaseId" INTEGER NOT NULL,
    "keywords" TEXT,
    "description" TEXT,
    "ogImage" TEXT,

    CONSTRAINT "ShowCaseMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Testimonials_name_key" ON "Testimonials"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ShowCase_slug_key" ON "ShowCase"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ShowCaseMetaData_showCaseId_key" ON "ShowCaseMetaData"("showCaseId");

-- AddForeignKey
ALTER TABLE "ShowCase" ADD CONSTRAINT "ShowCase_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "ShowCaseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCaseImages" ADD CONSTRAINT "ShowCaseImages_showCaseId_fkey" FOREIGN KEY ("showCaseId") REFERENCES "ShowCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCaseMetaData" ADD CONSTRAINT "ShowCaseMetaData_showCaseId_fkey" FOREIGN KEY ("showCaseId") REFERENCES "ShowCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
