import z from "zod";

export const updateUserZodSchema = z.object({
    name: z.string("Name must be a string").min(5, "Name must be at least 5 characters long").optional(),
    image: z.string("Image must be a string").url("Image must be a valid URL").optional(),
})