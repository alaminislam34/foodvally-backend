-- CreateTable
CREATE TABLE "food_categories" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "flag" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255),
    "description" TEXT,
    "bannerImage" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "averageRating" DOUBLE PRECISION DEFAULT 0,
    "popularityScore" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "food_categories_flag_key" ON "food_categories"("flag");

-- CreateIndex
CREATE INDEX "idx_food_category_flag" ON "food_categories"("flag");

-- CreateIndex
CREATE INDEX "idx_food_category_is_active" ON "food_categories"("isActive");
