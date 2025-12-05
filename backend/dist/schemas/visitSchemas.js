"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVisitSchema = exports.createVisitSchema = exports.listVisitsQuerySchema = exports.visitIdParamsSchema = void 0;
const zod_1 = require("zod");
exports.visitIdParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "id is required"),
});
exports.listVisitsQuerySchema = zod_1.z.object({
    itemId: zod_1.z.string().optional(),
});
exports.createVisitSchema = zod_1.z.object({
    itemId: zod_1.z.string().min(1, "itemId is required"),
    fullName: zod_1.z.string().min(1, "fullName is required"),
    email: zod_1.z.string().email("email is invalid"),
    phone: zod_1.z.string().min(3, "phone is required"),
    preferredDate: zod_1.z.string().min(1, "preferredDate is required"),
    message: zod_1.z.string().min(1, "message is required").max(500),
    status: zod_1.z.enum(["pending", "confirmed", "canceled"]).optional(),
});
exports.updateVisitSchema = exports.createVisitSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
