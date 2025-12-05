"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisits = getVisits;
exports.getVisit = getVisit;
exports.addVisit = addVisit;
exports.editVisit = editVisit;
exports.removeVisit = removeVisit;
const visitStore_1 = require("../models/visitStore");
function getVisits(filter) {
    return (0, visitStore_1.listVisits)(filter);
}
function getVisit(id) {
    return (0, visitStore_1.findVisitById)(id);
}
function addVisit(input) {
    return (0, visitStore_1.createVisit)(input);
}
function editVisit(id, input) {
    return (0, visitStore_1.updateVisit)(id, input);
}
function removeVisit(id) {
    return (0, visitStore_1.deleteVisit)(id);
}
