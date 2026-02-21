-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slag" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(255),
    "contactNumber" VARCHAR(20),
    "email" VARCHAR(255),
    "bannerImage" VARCHAR(255),
    "logo" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slag_key" ON "Restaurant"("slag");
