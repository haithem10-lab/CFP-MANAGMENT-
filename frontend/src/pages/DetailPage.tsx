import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getItem } from "../services/api";
import { Item } from "../types/item";

export default function DetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getItem(id)
      .then((data) => {
        setItem(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="empty">Bien introuvable.</div>;

  return (
    <div className="detail-layout">
      <div className="panel detail-panel">
        {item.imageUrl && (
          <div className="detail-image" style={{ backgroundImage: `url(${item.imageUrl})` }} />
        )}
        <div className="detail-header">
          <div>
            <div className="pill">Fiche bien</div>
            <h1 style={{ margin: "8px 0 4px" }}>{item.title}</h1>
            <div className="muted">{item.city}</div>
          </div>
          <div className="chip size-lg">{item.category === "sale" ? "Vente" : "Location"}</div>
        </div>

        <div className="detail-grid">
          <div className="detail-tile">
            <div className="label">Prix</div>
            <div className="stat-value">
              {item.price.toLocaleString("fr-FR")} {item.category === "rent" ? "€/mois" : "€"}
            </div>
          </div>
          <div className="detail-tile">
            <div className="label">Surface</div>
            <div className="stat-value">{item.surface} m²</div>
          </div>
        </div>

        {item.description && (
          <div className="detail-description">
            <div className="label">Description</div>
            <p>{item.description}</p>
          </div>
        )}

        <div className="detail-actions">
          <Link to="/items" className="btn secondary">
            Retour
          </Link>
          <Link to={`/items/${item.id}/visits`} className="btn secondary">
            Demandes de visite
          </Link>
          <Link to={`/items/${item.id}/edit`} className="btn">
            Modifier
          </Link>
        </div>
      </div>
    </div>
  );
}
