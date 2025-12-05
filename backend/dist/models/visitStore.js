"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listVisits = listVisits;
exports.findVisitById = findVisitById;
exports.createVisit = createVisit;
exports.updateVisit = updateVisit;
exports.deleteVisit = deleteVisit;
const crypto_1 = require("crypto");
const visits = [
    {
        id: (0, crypto_1.randomUUID)(),
        itemId: "demo-item-1",
        fullName: "Alice Dupont",
        email: "alice@example.com",
        phone: "06 10 20 30 40",
        preferredDate: "2025-01-15 14:00",
        message: "Disponible en après-midi uniquement.",
        status: "pending",
    },
];
function listVisits(filter) {
    if (filter?.itemId) {
        return visits.filter((v) => v.itemId === filter.itemId);
    }
    return visits;
}
function findVisitById(id) {
    return visits.find((visit) => visit.id === id);
}
function createVisit(input) {
    const visit = { id: (0, crypto_1.randomUUID)(), status: input.status ?? "pending", ...input };
    visits.push(visit);
    return visit;
}
function updateVisit(id, input) {
    const index = visits.findIndex((visit) => visit.id === id);
    if (index === -1)
        return undefined;
    const updated = { ...visits[index], ...input };
    visits[index] = updated;
    return updated;
}
function deleteVisit(id) {
    const index = visits.findIndex((visit) => visit.id === id);
    if (index === -1)
        return false;
    visits.splice(index, 1);
    return true;
}
