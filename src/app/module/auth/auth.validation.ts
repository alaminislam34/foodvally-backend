import z from "zod";
import { UserRole } from "../../../generated/enums";

<<<<<<< HEAD
export const createRestaurantZodSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  user: z.object({
    name: z
      .string()
      .min(6, "Name is required, and must be at least 6 characters"),
    email: z.email("Invalid email address"),
=======
export const createCustomerZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(5, "Name must be at least 5 characters long"),
  email: z.string("Email must be a string").email("Invalid email address"),
  password: z
    .string("Password must be a string")
    .min(8, "Password must be at least 8 characters long"),
});

export const createRestaurantZodSchema = z.object({
  password: z
    .string("Password must be a string")
    .min(8, "Password must be at least 8 characters long"),
  user: z.object({
    name: z
      .string("Name must be a string")
      .min(5, "Name must be at least 5 characters long"),
    email: z.string("Email must be a string").email("Invalid email address"),
>>>>>>> dad5dce35d84736dae97e5646ed3b9510e07fb2a
    role: z.enum([UserRole.PROVIDER], "Role must be PROVIDER"),
  }),
  restaurant: z.object({
    restaurantName: z
<<<<<<< HEAD
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
=======
      .string("Restaurant name must be a string")
      .min(3, "Restaurant name must be at least 3 characters long"),
    city: z
      .string("City must be a string")
      .min(2, "City must be at least 2 characters long"),
    address: z
      .string("Address must be a string")
      .min(5, "Address must be at least 5 characters long"),
    contactNumber: z
      .string("Contact number must be a string")
      .min(11, "Contact number must be at least 11 characters long")
      .max(14, "Contact number must be at most 14 characters long"),
    cuisine: z
      .string("Cuisine must be a string")
      .min(3, "Cuisine must be at least 3 characters long"),
    openingHours: z
      .string("Opening hours must be a string")
      .min(5, "Opening hours must be at least 5 characters long"),
    logo: z.string("Logo must be a string").url("Logo must be a valid URL"),
    coverImage: z
      .string("Cover image must be a string")
      .url("Cover image must be a valid URL"),
    foodCategories: z
      .array(z.uuid("Food category IDs must be valid UUIDs"))
>>>>>>> dad5dce35d84736dae97e5646ed3b9510e07fb2a
      .min(1, "At least one food category must be selected"),
  }),
});
