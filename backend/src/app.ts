import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import itemsRouter from "./routes/items";
import visitsRouter from "./routes/visits";

const app = express();

const uploadDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

app.use("/items", itemsRouter);
app.use("/visits", visitsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Fallback for unknown routes
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
