import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addItem,
  editItem,
  getAllItems,
  getItem,
  removeItem,
} from "../services/itemService";
import {
  createItemSchema,
  itemIdParamsSchema,
  updateItemSchema,
} from "../schemas/itemSchemas";

const router = Router();
const uploadDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir });

router.get("/", (_req, res) => {
  res.json(getAllItems());
});

router.get("/:id", (req, res) => {
  const parsedParams = itemIdParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid item id",
      errors: parsedParams.error.flatten(),
    });
  }

  const item = getItem(parsedParams.data.id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json(item);
});

router.post("/", upload.single("image"), (req, res) => {
  const parsedBody = createItemSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Invalid payload",
      errors: parsedBody.error.flatten(),
    });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : parsedBody.data.imageUrl;
  const item = addItem({ ...parsedBody.data, imageUrl });
  return res.status(201).json(item);
});

router.put("/:id", upload.single("image"), (req, res) => {
  const parsedParams = itemIdParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid item id",
      errors: parsedParams.error.flatten(),
    });
  }

  const parsedBody = updateItemSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Invalid payload",
      errors: parsedBody.error.flatten(),
    });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : parsedBody.data.imageUrl;
  const updated = editItem(parsedParams.data.id, { ...parsedBody.data, imageUrl });
  if (!updated) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json(updated);
});

router.delete("/:id", (req, res) => {
  const parsedParams = itemIdParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid item id",
      errors: parsedParams.error.flatten(),
    });
  }

  const deleted = removeItem(parsedParams.data.id);
  if (!deleted) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.status(204).send();
});

export default router;
