export type ItemCategory = "sale" | "rent";

export interface Item {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  category: ItemCategory;
  description?: string;
  imageUrl?: string;
}

export type CreateItemInput = Omit<Item, "id">;
export type UpdateItemInput = Partial<CreateItemInput>;
