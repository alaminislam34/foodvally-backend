import { prisma } from "../../lib/prisma";

const createCategory = async (payload: ICreateFoodCategoryPayload) => {
  const { title, description } = payload;
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const isExist = await prisma.foodCategory.findUnique({
    where: { slug },
  });

  if (isExist) {
    throw new Error("This food category already exists");
  }
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

const getAllCategories = async () => {
  try {
    const result = await prisma.foodCategory.findMany();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
