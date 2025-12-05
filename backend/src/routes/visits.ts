import { Router } from "express";
import {
  createVisitSchema,
  listVisitsQuerySchema,
  updateVisitSchema,
  visitIdParamsSchema,
} from "../schemas/visitSchemas";
import { addVisit, editVisit, getVisit, getVisits, removeVisit } from "../services/visitService";

const router = Router();

router.get("/", (req, res) => {
  const parsedQuery = listVisitsQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      message: "Invalid query params",
      errors: parsedQuery.error.flatten(),
    });
  }
  const visits = getVisits(parsedQuery.data);
  return res.json(visits);
});

router.get("/:id", (req, res) => {
  const parsedParams = visitIdParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid visit id",
      errors: parsedParams.error.flatten(),
    });
  }

  const visit = getVisit(parsedParams.data.id);
  if (!visit) {
    return res.status(404).json({ message: "Visit not found" });
  }
  return res.json(visit);
});

router.post("/", (req, res) => {
  const parsedBody = createVisitSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Invalid payload",
      errors: parsedBody.error.flatten(),
    });
  }

  const visit = addVisit(parsedBody.data);
  return res.status(201).json(visit);
});

router.put("/:id", (req, res) => {
  const parsedParams = visitIdParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid visit id",
      errors: parsedParams.error.flatten(),
    });
  }

  const parsedBody = updateVisitSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Invalid payload",
      errors: parsedBody.error.flatten(),
    });
  }

  const updated = editVisit(parsedParams.data.id, parsedBody.data);
  if (!updated) {
    return res.status(404).json({ message: "Visit not found" });
  }
  return res.json(updated);
});

router.delete("/:id", (req, res) => {
  const parsedParams = visitIdParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid visit id",
      errors: parsedParams.error.flatten(),
    });
  }

  const deleted = removeVisit(parsedParams.data.id);
  if (!deleted) {
    return res.status(404).json({ message: "Visit not found" });
  }
  return res.status(204).send();
});

export default router;
