import {
  createItem,
  deleteItem,
  findItemById,
  listItems,
  updateItem,
} from "../models/itemStore";
import { CreateItemInput, UpdateItemInput } from "../types/item";

export function getAllItems() {
  return listItems();
}

export function getItem(id: string) {
  return findItemById(id);
}

export function addItem(input: CreateItemInput) {
  return createItem(input);
}

export function editItem(id: string, input: UpdateItemInput) {
  return updateItem(id, input);
}

export function removeItem(id: string) {
  return deleteItem(id);
}
