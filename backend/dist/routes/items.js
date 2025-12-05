"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const itemService_1 = require("../services/itemService");
const itemSchemas_1 = require("../schemas/itemSchemas");
const router = (0, express_1.Router)();
const uploadDir = path_1.default.join(__dirname, "..", "uploads");
fs_1.default.mkdirSync(uploadDir, { recursive: true });
const upload = (0, multer_1.default)({ dest: uploadDir });
router.get("/", (_req, res) => {
    res.json((0, itemService_1.getAllItems)());
});
router.get("/:id", (req, res) => {
    const parsedParams = itemSchemas_1.itemIdParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            message: "Invalid item id",
            errors: parsedParams.error.flatten(),
        });
    }
    const item = (0, itemService_1.getItem)(parsedParams.data.id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    return res.json(item);
});
router.post("/", upload.single("image"), (req, res) => {
    const parsedBody = itemSchemas_1.createItemSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid payload",
            errors: parsedBody.error.flatten(),
        });
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : parsedBody.data.imageUrl;
    const item = (0, itemService_1.addItem)({ ...parsedBody.data, imageUrl });
    return res.status(201).json(item);
});
router.put("/:id", upload.single("image"), (req, res) => {
    const parsedParams = itemSchemas_1.itemIdParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            message: "Invalid item id",
            errors: parsedParams.error.flatten(),
        });
    }
    const parsedBody = itemSchemas_1.updateItemSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid payload",
            errors: parsedBody.error.flatten(),
        });
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : parsedBody.data.imageUrl;
    const updated = (0, itemService_1.editItem)(parsedParams.data.id, { ...parsedBody.data, imageUrl });
    if (!updated) {
        return res.status(404).json({ message: "Item not found" });
    }
    return res.json(updated);
});
router.delete("/:id", (req, res) => {
    const parsedParams = itemSchemas_1.itemIdParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            message: "Invalid item id",
            errors: parsedParams.error.flatten(),
        });
    }
    const deleted = (0, itemService_1.removeItem)(parsedParams.data.id);
    if (!deleted) {
        return res.status(404).json({ message: "Item not found" });
    }
    return res.status(204).send();
});
exports.default = router;
