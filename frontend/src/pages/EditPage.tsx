import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { createItem, getItem, updateItem } from "../services/api";
import { CreateItemInput, Item } from "../types/item";
import { useItemsStore } from "../store/useItemsStore";

interface Props {
  mode: "create" | "edit";
}

export default function EditPage({ mode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { upsertLocal } = useItemsStore();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      getItem(id)
        .then((data) => {
          setItem(data);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, mode]);

  const handleSubmit = async (input: CreateItemInput, imageFile?: File | null) => {
    if (mode === "create") {
      const created = await createItem(input, imageFile);
      upsertLocal(created);
      navigate(`/items/${created.id}`);
    } else if (mode === "edit" && id) {
      const updated = await updateItem(id, input, imageFile);
      upsertLocal(updated);
      navigate(`/items/${updated.id}`);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (mode === "edit" && error) return <div className="error">{error}</div>;

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div>
        <h1 style={{ margin: 0 }}>{mode === "create" ? "Nouveau bien" : "Modifier le bien"}</h1>
      </div>
      <ItemForm
        initial={mode === "edit" ? item ?? undefined : undefined}
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Créer" : "Mettre à jour"}
      />
    </div>
  );
}
