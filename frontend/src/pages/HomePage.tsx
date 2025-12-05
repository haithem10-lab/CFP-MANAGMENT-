import { Link } from "react-router-dom";

export default function HomePage() {
  const stats = [
    { label: "Biens suivis", value: "120+" },
    { label: "Villes couvertes", value: "15" },
    { label: "Taux d’occupation", value: "96%" },
  ];

  const benefits = [
    "Suivi clair des biens en vente et en location",
    "Dossiers prêts pour la visite en quelques clics",
    "Vue synthétique des performances",
  ];

  return (
    <div className="stack" style={{ gap: 28 }}>
      <section className="hero">
        <div className="hero-content">
          <p className="pill">Gestion locative & patrimoniale simplifiée</p>
          <h1>CFP Management</h1>
          <p className="lead">
            Centralisez vos biens, partagez les informations clés, accélérez les décisions.
            Un cockpit moderne pour piloter vos actifs immobiliers.
          </p>
          <div className="cta-row">
            <Link className="btn" to="/items">
              Voir le portefeuille
            </Link>
            <Link className="btn secondary" to="/new">
              Ajouter un bien
            </Link>
          </div>
          <ul className="benefits">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="hero-card">
          <div className="panel stack" style={{ gap: 12 }}>
            <div className="card-title" style={{ margin: 0 }}>
              Aperçu express
            </div>
            <div className="muted">Performance du portefeuille</div>
            <div className="stat-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-tile">
                  <div className="stat-value">{stat.value}</div>
                  <div className="muted">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mini-card">
              <div>
                <div className="label">Prochaines visites</div>
                <div className="muted">Aujourd’hui · 14h00 · Bordeaux</div>
              </div>
              <span className="chip">+3 à venir</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature">
          <h3>Portefeuille visuel</h3>
          <p>Des cartes claires pour repérer rapidement ville, prix, surface et statut.</p>
        </div>
        <div className="feature">
          <h3>Edition rapide</h3>
          <p>Ajoutez ou modifiez un bien en quelques champs, validations incluses.</p>
        </div>
        <div className="feature">
          <h3>Détail structuré</h3>
          <p>Fiche synthétique pour partager une info fiable avec vos partenaires.</p>
        </div>
      </section>

      <footer className="footer">
        <div>
          <div className="brand">CFP Management</div>
          <p className="muted" style={{ maxWidth: 360 }}>
            La base solide pour piloter vos actifs immobiliers : clair, rapide, prêt à
            grandir avec vous.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <div className="label">Produit</div>
            <a href="/items" className="muted">Portefeuille</a>
            <a href="/new" className="muted">Ajouter un bien</a>
          </div>
          <div className="footer-col">
            <div className="label">Ressources</div>
            <a className="muted" href="mailto:contact@cfp.local">Support</a>
            <a className="muted" href="#">Sécurité & conformité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
