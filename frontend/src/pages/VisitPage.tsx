import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createVisit, getItem, getVisits } from "../services/api";
import { Item } from "../types/item";
import { Visit } from "../types/visit";

export default function VisitPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitError, setVisitError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoadingItem(true);
    getItem(id)
      .then((data) => {
        setItem(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingItem(false));

    setLoadingVisits(true);
    getVisits({ itemId: id })
      .then((data) => {
        setVisits(data);
        setVisitError(null);
      })
      .catch((err) => setVisitError(err.message))
      .finally(() => setLoadingVisits(false));
  }, [id]);

  const handleSubmitVisit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitLoading(true);
    setVisitError(null);
    try {
      const preferredDateTime =
        form.preferredDate && form.preferredTime
          ? `${form.preferredDate} ${form.preferredTime}`
          : form.preferredDate || "";
      const created = await createVisit({
        ...form,
        preferredDate: preferredDateTime,
        itemId: id,
      });
      setVisits((prev) => [created, ...prev]);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    } catch (err) {
      setVisitError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loadingItem) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="empty">Bien introuvable.</div>;

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="panel visit-panel">
        <div className="section-header">
          <div>
            <div className="pill">Demandes de visites</div>
            <h2 style={{ margin: "8px 0 6px" }}>{item.title}</h2>
            <p className="muted" style={{ margin: 0 }}>
              Renseignez les coordonnées et une plage souhaitée pour la visite.
            </p>
          </div>
          <Link to={`/items/${item.id}`} className="btn secondary">
            Retour à la fiche
          </Link>
        </div>
        <form className="visit-form" onSubmit={handleSubmitVisit}>
          <div className="field">
            <label className="label">Nom complet</label>
            <input
              className="input"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              required
            />
          </div>
          <div className="form-inline">
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label className="label">Téléphone</label>
              <input
                className="input"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Créneau souhaité</label>
            <div className="form-inline">
              <input
                className="input"
                type="date"
                value={form.preferredDate}
                onChange={(e) => setForm((f) => ({ ...f, preferredDate: e.target.value }))}
              />
              <input
                className="input"
                type="time"
                value={form.preferredTime}
                onChange={(e) => setForm((f) => ({ ...f, preferredTime: e.target.value }))}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Message</label>
            <textarea
              className="textarea"
              rows={3}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
          {visitError && <div className="error">{visitError}</div>}
          <div className="detail-actions" style={{ justifyContent: "flex-start" }}>
            <button className="btn" type="submit" disabled={submitLoading}>
              {submitLoading ? "Envoi..." : "Envoyer la demande"}
            </button>
          </div>
        </form>
      </div>

      <div className="panel visit-panel">
        <div className="section-header">
          <div>
            <h3 style={{ margin: 0 }}>Demandes reçues</h3>
            <p className="muted" style={{ margin: 0 }}>
              Suivi des demandes pour ce bien.
            </p>
          </div>
          <div className="chip">{visits.length} demande{visits.length > 1 ? "s" : ""}</div>
        </div>
        {loadingVisits && <div>Chargement des demandes...</div>}
        {!loadingVisits && visits.length === 0 && (
          <div className="empty">Aucune demande pour ce bien pour le moment.</div>
        )}
        <div className="visit-list">
          {visits.map((visit) => (
            <div key={visit.id} className="visit-card">
              <div className="visit-header">
                <div>
                  <div className="label">{visit.fullName}</div>
                  <div className="muted">{visit.email}</div>
                </div>
                <span className={`status-badge status-${visit.status}`}>
                  {visit.status === "pending"
                    ? "En attente"
                    : visit.status === "confirmed"
                    ? "Confirmée"
                    : "Annulée"}
                </span>
              </div>
              {visit.phone && <div className="muted">Tel: {visit.phone}</div>}
              {visit.preferredDate && (
                <div>
                  <span className="label">Créneau</span>
                  <div>{visit.preferredDate}</div>
                </div>
              )}
              {visit.message && (
                <div>
                  <span className="label">Message</span>
                  <div>{visit.message}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
