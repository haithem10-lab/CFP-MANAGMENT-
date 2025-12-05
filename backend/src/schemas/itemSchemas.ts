import { z } from "zod";

export const itemIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export const createItemSchema = z.object({
  title: z.string().min(1, "title is required"),
  city: z.string().min(1, "city is required"),
  price: z.coerce.number().positive("price must be positive"),
  surface: z.coerce.number().positive("surface must be positive"),
  category: z.enum(["sale", "rent"]),
  description: z.string().max(500).optional(),
  imageUrl: z.string().url("imageUrl must be a valid URL").optional(),
});

export const updateItemSchema = createItemSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
