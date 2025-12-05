"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemSchema = exports.createItemSchema = exports.itemIdParamsSchema = void 0;
const zod_1 = require("zod");
exports.itemIdParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "id is required"),
});
exports.createItemSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "title is required"),
    city: zod_1.z.string().min(1, "city is required"),
    price: zod_1.z.coerce.number().positive("price must be positive"),
    surface: zod_1.z.coerce.number().positive("surface must be positive"),
    category: zod_1.z.enum(["sale", "rent"]),
    description: zod_1.z.string().max(500).optional(),
    imageUrl: zod_1.z.string().url("imageUrl must be a valid URL").optional(),
});
exports.updateItemSchema = exports.createItemSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
