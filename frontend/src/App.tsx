import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">
            CFP<span>Management</span>
          </Link>
          <nav className="nav">
            <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Accueil
            </Link>
            <Link
              to="/items"
              className={location.pathname.startsWith("/items") ? "nav-link active" : "nav-link"}
            >
              Portefeuille
            </Link>
            <Link to="/new" className="btn">
              + Nouveau bien
            </Link>
          </nav>
        </div>
      </header>
      <main className="container" style={{ flex: 1, paddingTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
