import { randomUUID } from "crypto";
import { CreateVisitInput, UpdateVisitInput, Visit } from "../types/visit";

const visits: Visit[] = [
  {
    id: randomUUID(),
    itemId: "demo-item-1",
    fullName: "Alice Dupont",
    email: "alice@example.com",
    phone: "06 10 20 30 40",
    preferredDate: "2025-01-15 14:00",
    message: "Disponible en après-midi uniquement.",
    status: "pending",
  },
];

export function listVisits(filter?: { itemId?: string }): Visit[] {
  if (filter?.itemId) {
    return visits.filter((v) => v.itemId === filter.itemId);
  }
  return visits;
}

export function findVisitById(id: string): Visit | undefined {
  return visits.find((visit) => visit.id === id);
}

export function createVisit(input: CreateVisitInput): Visit {
  const visit: Visit = { id: randomUUID(), status: input.status ?? "pending", ...input };
  visits.push(visit);
  return visit;
}

export function updateVisit(id: string, input: UpdateVisitInput): Visit | undefined {
  const index = visits.findIndex((visit) => visit.id === id);
  if (index === -1) return undefined;
  const updated: Visit = { ...visits[index], ...input };
  visits[index] = updated;
  return updated;
}

export function deleteVisit(id: string): boolean {
  const index = visits.findIndex((visit) => visit.id === id);
  if (index === -1) return false;
  visits.splice(index, 1);
  return true;
}
