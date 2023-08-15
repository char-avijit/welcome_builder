-- CreateTable
CREATE TABLE "ShowCase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

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
CREATE UNIQUE INDEX "ShowCase_slug_key" ON "ShowCase"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ShowCaseMetaData_showCaseId_key" ON "ShowCaseMetaData"("showCaseId");

-- AddForeignKey
ALTER TABLE "ShowCaseImages" ADD CONSTRAINT "ShowCaseImages_showCaseId_fkey" FOREIGN KEY ("showCaseId") REFERENCES "ShowCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCaseMetaData" ADD CONSTRAINT "ShowCaseMetaData_showCaseId_fkey" FOREIGN KEY ("showCaseId") REFERENCES "ShowCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
