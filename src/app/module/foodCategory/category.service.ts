import { prisma } from "../../lib/prisma";

const createCategory = async (payload: ICreateFoodCategoryPayload) => {
  const { title, description } = payload;
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  try {
    const result = await prisma.foodCategory.create({
      data: {
        title,
        slug,
        description,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CategoryService = {
  createCategory,
};
