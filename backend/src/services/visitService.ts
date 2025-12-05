import {
  createVisit,
  deleteVisit,
  findVisitById,
  listVisits,
  updateVisit,
} from "../models/visitStore";
import { CreateVisitInput, UpdateVisitInput } from "../types/visit";

export function getVisits(filter?: { itemId?: string }) {
  return listVisits(filter);
}

export function getVisit(id: string) {
  return findVisitById(id);
}

export function addVisit(input: CreateVisitInput) {
  return createVisit(input);
}

export function editVisit(id: string, input: UpdateVisitInput) {
  return updateVisit(id, input);
}

export function removeVisit(id: string) {
  return deleteVisit(id);
}
