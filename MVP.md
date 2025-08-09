# 🍽️ MVP – Gastronomia

Objectif: livrer en 1–2 itérations un produit fonctionnel concentré sur la découverte et la gestion de recettes, avec un minimum de friction et une qualité éprouvée par les tests.

## 🗓️ Journal d’avancement
- [x] Next.js (TS + Tailwind) opérationnel en dev sur `http://localhost:3000`
- [x] Domaine: implémentation `validateRecipe` (validation pure) + tests unitaires
- [x] Base données: Prisma + `schema.prisma` (SQLite dev) avec modèles relationnels (ingrédients/étapes)
- [x] API: routes CRUD recettes (GET/POST `/api/recipes`, GET/PATCH/DELETE `/api/recipes/[id]`) avec validation
- [x] UI: liste, détail, recherche/filtre
- [x] UI: formulaire création/édition + suppression
- [x] Auth Credentials (NextAuth) + page `/login` + NavBar session
- [x] Protections API: POST/PATCH/DELETE nécessitent session + ownership
- [x] Tests d’intégration API + a11y de base

## ✅ Définition du MVP (scope fonctionnel)
- [x] Navigation minimale: Accueil → Liste des recettes → Détail d’une recette
- [x] Données persistées: recettes complètes
- [x] CRUD réservés aux utilisateurs connectés (implémenté)
- [x] Recherche basique et filtre
- [x] UI responsive minimale (mobile ≥ 360px)
- [ ] Déploiement (Vercel) + DB managée

## 🎯 Critères d’acceptation (mesurables)
- [ ] Un visiteur peut voir la page d’accueil avec des recettes « récentes » (seed) en < 2s sur réseau local
- [ ] Un visiteur peut lister les recettes, rechercher par titre, filtrer par durée/difficulté
- [ ] Un visiteur peut ouvrir la page détail et voir: titre, image (si fournie), ingrédients, étapes, durée
- [ ] Un utilisateur connecté peut créer, éditer et supprimer sa recette; validations côté client et serveur
- [ ] Les entrées invalides sont rejetées avec messages clairs; aucun crash serveur (codes 4xx/5xx contrôlés)
- [ ] Couverture de tests ≥ 70% (unit + int) sur le domaine, ≥ 1 test d’accessibilité axe pour la page principale
- [ ] Build vert en CI, déploiement automatique sur `main`

## 🧪 TDD – Plan de tests minimal
- [x] Domain: validateRecipe (unit)
- [ ] API: POST /api/recipes (integration)
- [ ] API: GET /api/recipes (integration)
- [x] UI: `RecipeList` – test
- [x] UI: `RecipeForm` – test
- [x] UI: `RecipeDetail` – test
- [ ] UI: `Recipes page` – test
- [ ] Accessibility: `page.tsx` – jest-axe

## 🏗️ Périmètre technique (SOLID/DRY)
- [x] Types partagés + schéma Prisma + relations
- [x] API Routes CRUD recettes
- [x] UI complétée pour MVP: liste, détail, recherche, création, édition, suppression
- [x] Auth Credentials + protections
- [ ] Services (application): `RecipeService`, `AuthService`
- [ ] Validations: Zod côté client

## 📦 Tâches ordonnées (checklist d’exécution)
### 0) Setup qualité (CI/CD & tests)
- [ ] GitHub Actions: lint, test, build
- [ ] Rapport coverage Jest + jest-axe
- [ ] ESLint/Prettier stricts

### 1) Base de données & ORM
- [x] Prisma + SQLite + migrations
- [x] Seed OK
- [ ] Test d’intégration connexion DB

### 2) Validations & domaine
- [x] `validateRecipe` + tests

### 3) Repositories & services
- [ ] `RecipeService`: règles + ownership
- [ ] Tests d’intégration `RecipeService`

### 4) API Routes (app router)
- [x] `GET/POST /api/recipes`
- [x] `GET/PATCH/DELETE /api/recipes/[id]`
- [ ] Tests d’intégration fetch/supertest

### 5) Authentification (NextAuth Credentials)
- [x] Config Credentials + page `/login`
- [x] NavBar login/logout
- [x] Protections API (session) et ownership

### 6) UI – Parcours MVP
- [x] `Home`: liste
- [x] `Recipes page`: recherche + filtre
- [x] `Recipe detail`: rendu complet
- [x] `Recipe form` (create/edit)
- [x] Suppression
- [ ] Navigation, chargements, erreurs visibles (tests)
- [ ] Tests RTL restants

### 7) Finition & déploiement
- [ ] Accessibilité (roles, labels, contrastes) + jest-axe OK
- [ ] SEO basique
- [ ] `npm run build` OK
- [ ] Déploiement Vercel
- [ ] Smoke tests post-déploiement

## 🔐 Sécurité minimale
- [ ] Hash bcrypt + rate limit sur login
- [ ] Validation stricte côté API (Zod/server)
- [ ] Pas de secrets en repo; variables via `.env`

## 📊 Métriques & observabilité (MVP)
- [ ] Logs serveur formatés (niveau info/error)
- [ ] Simple analytics (pageviews) si souhaité

## 🚫 Hors scope (après MVP)
- [ ] Upload d’images vers CDN
- [ ] Favoris, commentaires, notation
- [ ] Import/Export recettes, planificateur de menus

---

## 📌 Suivi d’avancement (à cocher au fur et à mesure)
- [ ] CI prête (lint/test/build)
- [x] Prisma + schéma (migrations/seed à exécuter)
- [x] Validations domaine + tests
- [x] API Routes CRUD des recettes (tests en attente)
- [x] UI (Home + liste) — détail/form à venir
- [ ] Accessibilité de base validée
- [ ] Build prod OK
- [ ] Déploiement OK

## 📌 Mises à jour récentes
- Auth Credentials opérationnelle (login page) et protections API effectives (401 si non connecté)
- NavBar: le lien `Créer` est masqué si non connecté
- Prochain ajustement: masquer `Éditer/Supprimer` si non connecté ou non propriétaire
- Ajout des dépendances de tests: `jest-axe` (a11y) et `supertest` (intégration API)

## ✅ Intégration Continue (ajoutée)
- Workflow GitHub Actions ajouté: lint/test/build pour `web`
- Tests: 6/6 OK en CI (jest a11y + intégration mockées)
- Build: OK local (Next.js prod)

## ✅ Tests UI supplémentaires
- Page `recipes` (recherche/filtre): tests RTL ajoutés et au vert (vérification des query params)

## 🎨 Responsive
- Grilles ajustées: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Texte clampé pour éviter les débordements (plugin `@tailwindcss/line-clamp` activé)

## 🧩 Services applicatifs
- `RecipeService` (list/create/update/delete): ajouté et branché sur les routes API
- À prévoir: tests d’intégration service + DB

## ▶️ Suite immédiate
- Responsive mobile (ajustements Tailwind sur grilles/formulaires)
- Préparation déploiement Vercel (env NEXTAUTH_SECRET en prod, URL DB managée)

## 🖥️ État d’exécution
- Serveur de dev: http://localhost:3000
- Compte de démo: demo@gastronomia.dev / password123
- DB: SQLite `dev.db` (Prisma OK, seed OK)

## 🚀 Déploiement (préparation)
- Variables requises: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `DATABASE_URL`
- Voir `docs/DEPLOYMENT.md` pour les étapes Vercel

## ✅ Mise à jour checklist
- [x] Tests d’intégration API + a11y de base
