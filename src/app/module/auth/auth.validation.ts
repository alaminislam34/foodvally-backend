import z from "zod";
import { UserRole } from "../../../generated/enums";

export const createRestaurantZodSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  user: z.object({
    name: z
      .string()
      .min(6, "Name is required, and must be at least 6 characters"),
    email: z.email("Invalid email address"),
    role: z.enum([UserRole.PROVIDER], "Role must be PROVIDER"),
  }),
  restaurant: z.object({
    restaurantName: z
      .string()
      .min(3, "Restaurant name must be at least 3 characters"),
    city: z.string().min(2, "City is required"),
    address: z.string().min(5, "Address is required"),
    contactNumber: z
      .string()
      .min(11, "Contact number must be at least 11 characters")
      .max(14, "Contact number must be at most 14 characters"),
    cuisine: z.string().min(3, "Cuisine is required"),
    openingHours: z.string().min(5, "Opening hours are required"),
    logo: z.string().url("Logo must be a valid URL"),
    coverImage: z.string().url("Cover image must be a valid URL"),
    foodCategories: z
      .array(z.uuid("Each food category must be a valid UUID"))
      .min(1, "At least one food category must be selected"),
  }),
});
