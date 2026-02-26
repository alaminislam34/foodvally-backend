import z from "zod";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../../generated/enums";

const generateSlug = async (name: string) => {
  let baseSlug = name.toLowerCase().trim().replace(/\s+/g, "-");
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.restaurant.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

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

/*
{
  "password": "provider123",
  "user": {
    "name": "Provider 2",
    "email": "provider2@gmail.com",
    "role": "PROVIDER"
  },
  "restaurant": {
    "restaurantName": "Burger Hub",
    "city": "Dhaka",
    "address": "House 12, Road 5, Dhanmondi",
    "contactNumber": "+8801712345678",
    "cuisine": "Italian",
    "openingHours": "10:00 AM - 11:00 PM",
    "logo": "https://example.com/logo.png",
    "coverImage": "https://example.com/cover.jpg",
    "foodCategories": [
      "bb548d04-007d-4f38-9042-512282492960",
      "ad771b5d-9e71-4139-bab2-485bfb918cc0"
    ]
  }
}
*/

const createRestaurant = async (payload: ICreateRestaurantPayload) => {
  return await prisma.$transaction(async (tx: any) => {
    // 1️⃣ Create User
    const authUser = await auth.api.signUpEmail({
      body: {
        name: payload.user.name,
        email: payload.user.email,
        password: payload.password,
        role: payload.user.role,
      },
    });

    if (!authUser.user) {
      throw new Error("User creation failed");
    }

    // 2️⃣ Generate Unique Slug
    const slug = await generateSlug(payload.restaurant.restaurantName);

    // 3️⃣ Create Restaurant
    await tx.restaurant.create({
      data: {
        userId: authUser.user.id,
        restaurantName: payload.restaurant.restaurantName,
        slug,
        city: payload.restaurant.city,
        address: payload.restaurant.address,
        contactNumber: payload.restaurant.contactNumber,
        cuisine: payload.restaurant.cuisine,
        openingHours: payload.restaurant.openingHours,
        logo: payload.restaurant.logo,
        coverImage: payload.restaurant.coverImage,
        foodCategories: payload.restaurant.foodCategories?.length
          ? {
              connect: payload.restaurant.foodCategories.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    // 4️⃣ Return full provider info
    return tx.user.findUnique({
      where: { id: authUser.user.id },
      include: { restaurant: true },
    });
  });
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
