import { Link } from "react-router-dom";
import { Item } from "../types/item";

interface Props {
  item: Item;
  onDelete?: (id: string) => void;
}

export default function ItemCard({ item, onDelete }: Props) {
  return (
    <div className="card item-card">
      {item.imageUrl && (
        <div className="item-image" style={{ backgroundImage: `url(${item.imageUrl})` }} />
      )}
      <div className="item-card-head">
        <div>
          <h3 className="card-title">{item.title}</h3>
          <div className="muted">{item.city}</div>
        </div>
        <div className={`chip tone-${item.category}`}>
          {item.category === "sale" ? "Vente" : "Location"}
        </div>
      </div>
      <div className="item-card-meta">
        <div>
          <div className="label muted">Prix</div>
          <div className="price">
            {item.price.toLocaleString("fr-FR", {
              style: item.category === "rent" ? "currency" : undefined,
              currency: item.category === "rent" ? "EUR" : undefined,
              maximumFractionDigits: 0,
            })}
            {item.category === "sale" ? " €" : "/mois"}
          </div>
        </div>
        <div>
          <div className="label muted">Surface</div>
          <div className="stat-value">{item.surface} m²</div>
        </div>
      </div>
      <div className="card-actions spread">
        <Link to={`/items/${item.id}`} className="btn secondary">
          Voir
        </Link>
        <Link to={`/items/${item.id}/edit`} className="btn">
          Modifier
        </Link>
        {onDelete && (
          <button className="btn ghost" onClick={() => onDelete(item.id)}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}
