import { create } from "zustand";
import { getItems } from "../services/api";
import { Item } from "../types/item";

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  removeLocal: (id: string) => void;
  upsertLocal: (item: Item) => void;
}

export const useItemsStore = create<ItemsState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getItems();
      set({ items: data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erreur lors du chargement",
        loading: false,
      });
    }
  },
  removeLocal: (id: string) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  upsertLocal: (item: Item) => {
    const items = get().items;
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx === -1) {
      set({ items: [item, ...items] });
    } else {
      const next = [...items];
      next[idx] = item;
      set({ items: next });
    }
  },
}));
