"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitSchemas_1 = require("../schemas/visitSchemas");
const visitService_1 = require("../services/visitService");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const parsedQuery = visitSchemas_1.listVisitsQuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
        return res.status(400).json({
            message: "Invalid query params",
            errors: parsedQuery.error.flatten(),
        });
    }
    const visits = (0, visitService_1.getVisits)(parsedQuery.data);
    return res.json(visits);
});
router.get("/:id", (req, res) => {
    const parsedParams = visitSchemas_1.visitIdParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            message: "Invalid visit id",
            errors: parsedParams.error.flatten(),
        });
    }
    const visit = (0, visitService_1.getVisit)(parsedParams.data.id);
    if (!visit) {
        return res.status(404).json({ message: "Visit not found" });
    }
    return res.json(visit);
});
router.post("/", (req, res) => {
    const parsedBody = visitSchemas_1.createVisitSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid payload",
            errors: parsedBody.error.flatten(),
        });
    }
    const visit = (0, visitService_1.addVisit)(parsedBody.data);
    return res.status(201).json(visit);
});
router.put("/:id", (req, res) => {
    const parsedParams = visitSchemas_1.visitIdParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            message: "Invalid visit id",
            errors: parsedParams.error.flatten(),
        });
    }
    const parsedBody = visitSchemas_1.updateVisitSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid payload",
            errors: parsedBody.error.flatten(),
        });
    }
    const updated = (0, visitService_1.editVisit)(parsedParams.data.id, parsedBody.data);
    if (!updated) {
        return res.status(404).json({ message: "Visit not found" });
    }
    return res.json(updated);
});
router.delete("/:id", (req, res) => {
    const parsedParams = visitSchemas_1.visitIdParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
        return res.status(400).json({
            message: "Invalid visit id",
            errors: parsedParams.error.flatten(),
        });
    }
    const deleted = (0, visitService_1.removeVisit)(parsedParams.data.id);
    if (!deleted) {
        return res.status(404).json({ message: "Visit not found" });
    }
    return res.status(204).send();
});
exports.default = router;
