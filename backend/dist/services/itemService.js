"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = getAllItems;
exports.getItem = getItem;
exports.addItem = addItem;
exports.editItem = editItem;
exports.removeItem = removeItem;
const itemStore_1 = require("../models/itemStore");
function getAllItems() {
    return (0, itemStore_1.listItems)();
}
function getItem(id) {
    return (0, itemStore_1.findItemById)(id);
}
function addItem(input) {
    return (0, itemStore_1.createItem)(input);
}
function editItem(id, input) {
    return (0, itemStore_1.updateItem)(id, input);
}
function removeItem(id) {
    return (0, itemStore_1.deleteItem)(id);
}
