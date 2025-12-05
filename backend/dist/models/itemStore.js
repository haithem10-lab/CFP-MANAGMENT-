"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listItems = listItems;
exports.findItemById = findItemById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
const crypto_1 = require("crypto");
const items = [
    {
        id: (0, crypto_1.randomUUID)(),
        title: "Loft lumineux",
        city: "Paris",
        price: 520000,
        surface: 68,
        category: "sale",
        description: "Loft rénové avec terrasse",
        imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: (0, crypto_1.randomUUID)(),
        title: "Studio central",
        city: "Lyon",
        price: 780,
        surface: 22,
        category: "rent",
        description: "Idéal étudiant, proche des transports",
        imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: (0, crypto_1.randomUUID)(),
        title: "Maison familiale",
        city: "Bordeaux",
        price: 420000,
        surface: 120,
        category: "sale",
        description: "Jardin et garage, quartier calme",
        imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    },
];
function listItems() {
    return items;
}
function findItemById(id) {
    return items.find((item) => item.id === id);
}
function createItem(input) {
    const item = { id: (0, crypto_1.randomUUID)(), ...input };
    items.push(item);
    return item;
}
function updateItem(id, input) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1)
        return undefined;
    const updated = { ...items[index], ...input };
    items[index] = updated;
    return updated;
}
function deleteItem(id) {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1)
        return false;
    items.splice(index, 1);
    return true;
}
