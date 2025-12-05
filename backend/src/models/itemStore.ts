import { randomUUID } from "crypto";
import { CreateItemInput, Item, UpdateItemInput } from "../types/item";

const items: Item[] = [
  {
    id: randomUUID(),
    title: "Loft lumineux",
    city: "Paris",
    price: 520000,
    surface: 68,
    category: "sale",
    description: "Loft rénové avec terrasse",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: randomUUID(),
    title: "Studio central",
    city: "Lyon",
    price: 780,
    surface: 22,
    category: "rent",
    description: "Idéal étudiant, proche des transports",
    imageUrl:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: randomUUID(),
    title: "Maison familiale",
    city: "Bordeaux",
    price: 420000,
    surface: 120,
    category: "sale",
    description: "Jardin et garage, quartier calme",
    imageUrl:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
  },
];

export function listItems(): Item[] {
  return items;
}

export function findItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

export function createItem(input: CreateItemInput): Item {
  const item: Item = { id: randomUUID(), ...input };
  items.push(item);
  return item;
}

export function updateItem(id: string, input: UpdateItemInput): Item | undefined {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;

  const updated: Item = { ...items[index], ...input };
  items[index] = updated;
  return updated;
}

export function deleteItem(id: string): boolean {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
