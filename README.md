# 🍽️ Gastronomia - Site de Recettes Gastronomiques

![Coverage](https://img.shields.io/badge/coverage-Codecov-blue)

Une plateforme moderne et intuitive pour partager, découvrir et organiser des recettes de cuisine, développée avec une approche **TDD**, **SOLID** et **DRY**.

## 🎯 Vision

Créer une expérience culinaire exceptionnelle où les passionnés de cuisine peuvent :
- 📖 **Découvrir** de nouvelles recettes
- 👨‍🍳 **Partager** leurs créations culinaires
- 🔍 **Rechercher** par ingrédients, difficulté, temps
- ⭐ **Noter** et commenter les recettes
- 💾 **Sauvegarder** leurs favoris

## 🏗️ Architecture

### Stack Technologique
- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **État**: Zustand
- **Base de données**: PostgreSQL + Prisma
- **Tests**: Jest + React Testing Library
- **Authentification**: NextAuth.js
- **Déploiement**: Vercel

### Principes de Développement
- ✅ **TDD** (Test-Driven Development)
- ✅ **SOLID** Principles
- ✅ **DRY** (Don't Repeat Yourself)
- ✅ **Clean Architecture**
- ✅ **Type Safety** avec TypeScript

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- PostgreSQL (optionnel pour le développement)

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/gastronomia.git
cd gastronomia

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Configurer la base de données (optionnel)
npm run db:setup

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🧪 Tests

### Lancer les tests
```bash
# Tests unitaires
npm test

# Tests en mode watch
npm run test:watch

# Tests avec coverage
npm run test:coverage

# Tests E2E
npm run test:e2e
```

### Stratégie TDD
Nous suivons strictement l'approche **Red, Green, Refactor** :
1. **Red** : Écrire un test qui échoue
2. **Green** : Écrire le code minimal pour faire passer le test
3. **Refactor** : Améliorer le code sans casser les tests

## 📁 Structure du Projet

```
gastronomia/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── ui/             # Composants UI de base
│   │   ├── forms/          # Composants de formulaires
│   │   └── layout/         # Composants de mise en page
│   ├── pages/              # Pages Next.js
│   ├── api/                # API Routes
│   ├── lib/                # Utilitaires et configurations
│   ├── hooks/              # Custom hooks
│   ├── types/              # Types TypeScript
│   ├── tests/              # Tests unitaires et d'intégration
│   └── styles/             # Styles globaux
├── prisma/                 # Schéma de base de données
├── docs/                   # Documentation
└── public/                 # Assets statiques
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production

# Tests
npm test             # Tests unitaires
npm run test:watch   # Tests en mode watch
npm run test:e2e     # Tests E2E

# Base de données
npm run db:generate  # Générer le client Prisma
npm run db:push      # Pousser le schéma vers la DB
npm run db:migrate   # Exécuter les migrations

# Linting et formatage
npm run lint         # Vérifier le code
npm run lint:fix     # Corriger automatiquement
npm run format       # Formater le code
```

## 📋 Fonctionnalités

### ✅ Implémentées
- [ ] Setup du projet Next.js + TypeScript
- [ ] Configuration TDD (Jest + RTL)
- [ ] Architecture de base (Clean Architecture)
- [ ] Système de design (Design System)

### 🚧 En cours
- [ ] Modèle de données (Recipe, User, Category)
- [ ] API Routes avec validation
- [ ] Base de données et migrations

### 📅 Planifiées
- [ ] Interface utilisateur complète
- [ ] Système d'authentification
- [ ] Recherche avancée
- [ ] Système de notation
- [ ] Partage social

## 🎨 Design System

Notre design system suit les principes de cohérence et d'accessibilité :

### Couleurs
- **Primary**: `#FF6B35` (Orange gastronomique)
- **Secondary**: `#2C3E50` (Bleu foncé)
- **Accent**: `#E74C3C` (Rouge accent)
- **Neutral**: `#ECF0F1` (Gris clair)

### Typographie
- **Heading**: Inter, font-weight: 700
- **Body**: Inter, font-weight: 400
- **Code**: JetBrains Mono

## 🤝 Contribution

Nous accueillons les contributions ! Voici comment contribuer :

### 1. Fork le projet
```bash
git clone https://github.com/votre-username/gastronomia.git
cd gastronomia
```

### 2. Créer une branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 3. Suivre les guidelines
- Respecter les principes **TDD**, **SOLID** et **DRY**
- Écrire des tests pour toute nouvelle fonctionnalité
- Maintenir une couverture de tests > 80%
- Suivre les conventions de code TypeScript

### 4. Commiter les changements
```bash
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
```

### 5. Pousser vers la branche
```bash
git push origin feature/nouvelle-fonctionnalite
```

### 6. Créer une Pull Request

## 📊 Métriques de Qualité

- **Tests Coverage**: > 80%
- **Performance**: Lighthouse Score > 90
- **Accessibilité**: WCAG 2.1 AA
- **SEO**: Core Web Vitals optimisés

## 📚 Documentation

- [📋 Guidelines de Développement](./Guidelines.md)
- [🗺️ Roadmap du Projet](./ROADMAP.md)
- [🏗️ Architecture Technique](./docs/architecture.md)
- [🧪 Guide des Tests](./docs/testing.md)

## 🐛 Signaler un Bug

Si vous trouvez un bug, merci de :
1. Vérifier les [issues existantes](https://github.com/votre-username/gastronomia/issues)
2. Créer une nouvelle issue avec le template approprié
3. Inclure les étapes pour reproduire le bug

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Prisma](https://www.prisma.io/) pour l'ORM
- [Jest](https://jestjs.io/) pour les tests

---

**Développé avec ❤️ et ☕ par l'équipe Gastronomia**
