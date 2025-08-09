# Déploiement - Gastronomia

## Vercel (recommandé)
1. Importer le repo sur Vercel
2. Variables d’environnement (Project Settings → Environment Variables):
   - `NEXTAUTH_URL` → `https://<votre-projet>.vercel.app`
   - `NEXTAUTH_SECRET` → générer une chaîne sécurisée (openssl rand -base64 32)
   - `DATABASE_URL` → URL de la DB managée (Postgres/Supabase/Neon/PlanetScale selon provider)
3. Build Command: `npm run build` (Root dir: `web` si monorepo, ou configuer Vercel pour dossier `web`)
4. Development Command (prévisualisation): `npm run dev`
5. CORS/Domaines: si nécessaire, configurer domaines personnalisés

## Base de données
- Dev: SQLite (`file:./dev.db`)
- Prod: Postgres conseillé; ex Supabase/Neon
- Exécuter les migrations via CI/CD ou hook de déploiement

## Post-déploiement
- Tester `/api/recipes` et l’auth `/login`
- Vérifier logs Vercel
