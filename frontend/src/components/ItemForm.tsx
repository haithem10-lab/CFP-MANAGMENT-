import { FormEvent, useMemo, useState } from "react";
import { CreateItemInput, Item, ItemCategory } from "../types/item";

interface Props {
  initial?: Item | CreateItemInput;
  onSubmit: (input: CreateItemInput, imageFile?: File | null) => Promise<void> | void;
  submitLabel: string;
}

const emptyForm: CreateItemInput = {
  title: "",
  city: "",
  price: 0,
  surface: 0,
  category: "sale",
  description: "",
};

export default function ItemForm({ initial, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<CreateItemInput>(initial ?? emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    if (initial && "imageUrl" in initial && initial.imageUrl) return initial.imageUrl;
    return null;
  }, [imageFile, initial]);

  const handleChange = (field: keyof CreateItemInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "price" || field === "surface"
          ? Number(value)
          : (value as string | ItemCategory),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(form, imageFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="panel stack" onSubmit={handleSubmit}>
      <div className="stack">
        <div className="field">
          <label className="label">Titre</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Ville</label>
          <input
            className="input"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Photo</label>
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
          {previewUrl && (
            <div className="preview">
              <img src={previewUrl} alt="Aperçu" />
            </div>
          )}
        </div>
        <div className="field">
          <label className="label">Catégorie</label>
          <select
            className="select"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="sale">Vente</option>
            <option value="rent">Location</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Prix</label>
          <input
            className="input"
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Surface (m²)</label>
          <input
            className="input"
            type="number"
            min={0}
            value={form.surface}
            onChange={(e) => handleChange("surface", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="label">Description</label>
          <textarea
            className="textarea"
            rows={4}
            value={form.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="form-actions">
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "En cours..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
