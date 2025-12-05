"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const items_1 = __importDefault(require("./routes/items"));
const visits_1 = __importDefault(require("./routes/visits"));
const app = (0, express_1.default)();
const uploadDir = path_1.default.join(__dirname, "..", "uploads");
fs_1.default.mkdirSync(uploadDir, { recursive: true });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(uploadDir));
app.use("/items", items_1.default);
app.use("/visits", visits_1.default);
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// Fallback for unknown routes
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
