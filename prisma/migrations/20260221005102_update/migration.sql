/*
  Warnings:

  - You are about to drop the column `flag` on the `food_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `food_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `food_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "food_categories_flag_key";

-- DropIndex
DROP INDEX "idx_food_category_flag";

-- AlterTable
ALTER TABLE "food_categories" DROP COLUMN "flag",
ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "food_categories_slug_key" ON "food_categories"("slug");

-- CreateIndex
CREATE INDEX "idx_food_category_slug" ON "food_categories"("slug");
