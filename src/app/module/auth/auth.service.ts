import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const createCustomer = async (payload: ICreateCustomerPayload) => {
  const { name, email, password } = payload;
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    if (!data.user) {
      throw new Error("Failed to create customer");
    }
    return data.user;
  } catch (error) {
    console.log("Transaction error:", error);
    throw error;
  }
};

const createRestaurant = async (payload: ICreateRestaurantPayload) => {
  console.log(payload)
  const data = await auth.api.signUpEmail({
    body: {
      name: payload.user.name,
      email: payload.user.email,
      password: payload.password,
      role: payload.user.role,
    },
  });

  if (!data.user) {
    throw new Error("Failed to create restaurant user");
  }

  try {
    const slug = payload.restaurant.restaurantName
      .toLowerCase()
      .replace(/\s+/g, "-");
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existingRestaurant) {
      throw new Error(
        "A restaurant with this name already exists. Please choose a different name.",
      );
    }
    const provider = await prisma.$transaction(async (tx) => {
      await tx.restaurant.create({
        data: {
          userId: data.user.id,
          restaurantName: payload.restaurant.restaurantName,
          slug,
          city: payload.restaurant.city,
          address: payload.restaurant.address,
          contactNumber: payload.restaurant.contactNumber,
          cuisine: payload.restaurant.cuisine,
          openingHours: payload.restaurant.openingHours,
          logo: payload.restaurant.logo,
          coverImage: payload.restaurant.coverImage,
          foodCategories: payload.restaurant.foodCategories
            ? {
                connect: payload.restaurant.foodCategories.map((id) => ({
                  id,
                })),
              }
            : undefined,
        },
      });

      const restaurant = await tx.user.findUnique({
        where: { id: data.user.id },
        include: {
          restaurant: true,
        },
      });

      return restaurant;
    });

    return provider;
  } catch (error) {
    await prisma.user.delete({ where: { id: data.user.id } });
    console.log(`Transaction error: ${error}`);
    throw error;
  }
};

const login = async (payload: ISignInPayload) => {
  const { email, password } = payload;
  try {
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    if (!data.user) {
      throw new Error("Invalid email or password");
    }
    return data.user;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};

export const AuthService = {
  createCustomer,
  createRestaurant,
  login,
};
