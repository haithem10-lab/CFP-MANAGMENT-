# CFP-MANAGMENT-
CFP Management — React/Vite + TypeScript frontend and Express + TypeScript backend with Zod validation. Provides property Managemnt

## Comment lancer le projet
1. Backend  
   ```bash
   cd backend
   npm install
   npm run dev
   ```  
   L’API écoute sur `http://localhost:4000` et expose `/items`, `/visits`, `/uploads`.

2. Frontend  
   ```bash
   cd frontend
   npm install
   npm run dev
   ```  
   Si besoin, créer `frontend/.env` avec `VITE_API_URL=http://localhost:4000`.

## Architecture choisie
- **Backend** : Express en couches (`routes` → `services` → `models`) avec schémas Zod (`schemas`) et DTO typés (`types`). Données en mémoire + stockage de fichiers dans `/uploads`.
- **Frontend** : React/Vite + TypeScript, routage (React Router), état global léger avec Zustand, appels API dans `services/api`, types partagés, composants/pagers (`pages`, `components`) styles globaux.

## Pourquoi ce choix
- Séparation claire des responsabilités pour scaler (ajout futur de DB, auth, features sans casser l’existant).
- Typage strict + Zod pour sécuriser les entrées dès les routes.
- Vite/React + Zustand pour un front réactif
## Si plus de temps
- Persistance DB (Postgres)et pagination côté API.
- Authentification/autorisation (JWT) + rôles.
- Tests (unitaires + e2e) et CI lint/test/build.
- Filtres/sort avancés, recherche, tableau de bord visites, notifications.
