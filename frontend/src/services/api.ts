import { CreateItemInput, Item, UpdateItemInput } from "../types/item";
import { CreateVisitInput, UpdateVisitInput, Visit } from "../types/visit";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      (errorBody && (errorBody.message as string)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  if (response.status === 204) {
    // No content
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${API_URL}/items`);
  return handleResponse<Item[]>(res);
}

export async function getItem(id: string): Promise<Item> {
  const res = await fetch(`${API_URL}/items/${id}`);
  return handleResponse<Item>(res);
}

function buildItemFormData(input: UpdateItemInput | CreateItemInput, imageFile?: File | null) {
  const formData = new FormData();
  formData.append("title", input.title ?? "");
  formData.append("city", input.city ?? "");
  if (input.price !== undefined) formData.append("price", String(input.price));
  if (input.surface !== undefined) formData.append("surface", String(input.surface));
  if (input.category) formData.append("category", input.category);
  if (input.description) formData.append("description", input.description);
  if (input.imageUrl) formData.append("imageUrl", input.imageUrl);
  if (imageFile) formData.append("image", imageFile);
  return formData;
}

export async function createItem(input: CreateItemInput, imageFile?: File | null): Promise<Item> {
  const formData = buildItemFormData(input, imageFile);
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<Item>(res);
}

export async function updateItem(
  id: string,
  input: UpdateItemInput,
  imageFile?: File | null
): Promise<Item> {
  const formData = buildItemFormData(input, imageFile);
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    body: formData,
  });
  return handleResponse<Item>(res);
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/items/${id}`, { method: "DELETE" });
  await handleResponse<void>(res);
}

export async function getVisits(params?: { itemId?: string }): Promise<Visit[]> {
  const query = params?.itemId ? `?itemId=${encodeURIComponent(params.itemId)}` : "";
  const res = await fetch(`${API_URL}/visits${query}`);
  return handleResponse<Visit[]>(res);
}

export async function createVisit(input: CreateVisitInput): Promise<Visit> {
  const res = await fetch(`${API_URL}/visits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Visit>(res);
}

export async function updateVisit(id: string, input: UpdateVisitInput): Promise<Visit> {
  const res = await fetch(`${API_URL}/visits/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Visit>(res);
}

export async function deleteVisit(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/visits/${id}`, { method: "DELETE" });
  await handleResponse<void>(res);
}
