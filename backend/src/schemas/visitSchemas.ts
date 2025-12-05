import { z } from "zod";

export const visitIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export const listVisitsQuerySchema = z.object({
  itemId: z.string().optional(),
});

export const createVisitSchema = z.object({
  itemId: z.string().min(1, "itemId is required"),
  fullName: z.string().min(1, "fullName is required"),
  email: z.string().email("email is invalid"),
  phone: z.string().min(3, "phone is required"),
  preferredDate: z.string().min(1, "preferredDate is required"),
  message: z.string().min(1, "message is required").max(500),
  status: z.enum(["pending", "confirmed", "canceled"]).optional(),
});

export const updateVisitSchema = createVisitSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
