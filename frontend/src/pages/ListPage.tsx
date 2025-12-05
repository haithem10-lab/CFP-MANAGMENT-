import { useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { deleteItem } from "../services/api";
import { Item, ItemCategory } from "../types/item";
import { useItemsStore } from "../store/useItemsStore";

interface Filters {
  city: string;
  category: ItemCategory | "all";
}

export default function ListPage() {
  const { items, loading, error, fetchItems, removeLocal } = useItemsStore();
  const [filters, setFilters] = useState<Filters>({ city: "", category: "all" });

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCity =
        !filters.city || item.city.toLowerCase().includes(filters.city.toLowerCase());
      const matchCategory =
        filters.category === "all" ? true : item.category === filters.category;
      return matchCity && matchCategory;
    });
  }, [items, filters]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const sales = filtered.filter((i) => i.category === "sale").length;
    const rents = filtered.filter((i) => i.category === "rent").length;
    return { total, sales, rents };
  }, [filtered]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce bien ?")) return;
    try {
      await deleteItem(id);
      removeLocal(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur lors de la suppression");
    }
  };

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div>
        <h1 style={{ margin: 0 }}>Portefeuille</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Pilotez vos biens en un coup d’oeil : cartes, filtres rapides, actions directes.
        </p>
      </div>

      <div className="toolbar toolbar-split">
        <div className="filters">
          <input
            className="input"
            placeholder="Filtrer par ville..."
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            style={{ maxWidth: 260 }}
          />
          <select
            className="select"
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                category: e.target.value as Filters["category"],
              }))
            }
            style={{ maxWidth: 200 }}
          >
            <option value="all">Toutes catégories</option>
            <option value="sale">Vente</option>
            <option value="rent">Location</option>
          </select>
        </div>
        <div className="stat-chips">
          <span className="chip size-lg muted">
            {stats.total} bien{stats.total > 1 ? "s" : ""} affiché{stats.total > 1 ? "s" : ""}
          </span>
          <span className="chip size-lg">Vente: {stats.sales}</span>
          <span className="chip size-lg">Location: {stats.rents}</span>
        </div>
      </div>

      {loading && <div>Chargement...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="empty">Aucun bien ne correspond à vos filtres.</div>
      )}
      <div className="grid">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
