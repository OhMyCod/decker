# Site Web Famille DECKER

Site web familial moderne pour préserver et partager l'histoire, les archives et les créations de la famille DECKER.

## 🚀 Technologies utilisées

- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Composants UI** : shadcn/ui (Radix UI + Tailwind)
- **Base de données** : Supabase
- **Hébergement** : Vercel
- **Icônes** : Lucide React

## ✨ Fonctionnalités

### Actuellement implémenté
- ✅ Configuration Next.js 15 avec TypeScript
- ✅ Tailwind CSS avec support du dark mode
- ✅ 32 composants shadcn/ui installés
- ✅ Structure de projet organisée
- ✅ Configuration de déploiement Vercel
- ✅ **Base de données Supabase complète**
  - 24 tables PostgreSQL créées
  - 4 buckets de stockage configurés
  - Politiques RLS activées
  - Clients SSR pour Next.js 15
  - 7 services métier (members, events, creations, archives, testimonies, portraits, storage)
  - 10 fonctions API RPC (arbre généalogique, recherche, statistiques)

### À venir
- 🔲 Sidebar de navigation dépliable
- 🔲 Système de thème clair/sombre/système
- 🔲 Pages principales du site
- 🔲 Histoire familiale avec timeline interactive
- 🔲 Archives et documents
- 🔲 Galerie de créations artistiques
- 🔲 Arbre généalogique interactif
- 🔲 Portraits des membres
- 🔲 Section témoignages
- 🔲 Espace d'administration
- 🔲 Insertion de données de test

## 🛠️ Installation et développement

### Prérequis

- Node.js 18+ (LTS recommandé)
- npm ou yarn
- Git

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE-USERNAME/decker-family-website.git
cd decker-family-website

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Éditer .env.local avec vos vraies valeurs
# Voir DEPLOIEMENT.md pour les instructions détaillées
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000 dans votre navigateur
```

### Build

```bash
# Créer un build de production
npm run build

# Lancer le build en production
npm start
```

### Linting

```bash
# Vérifier le code
npm run lint
```

## 📁 Structure du projet

```
decker/
├── app/                  # Pages Next.js (App Router)
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Page d'accueil
│   ├── globals.css      # Styles globaux
│   └── api/             # Routes API
├── components/           # Composants React
│   └── ui/              # Composants shadcn/ui
├── hooks/               # Hooks personnalisés
│   ├── use-toast.ts    # Hook pour les toasts
│   └── use-mobile.tsx  # Hook pour détecter mobile
├── lib/                 # Utilitaires
│   ├── utils.ts        # Fonctions utilitaires
│   ├── supabase/       # Clients Supabase
│   │   ├── client.ts   # Client navigateur
│   │   ├── server.ts   # Client serveur
│   │   └── middleware.ts # Middleware auth
│   └── services/       # Services métier
│       ├── members.ts    # Gestion membres
│       ├── events.ts     # Gestion événements
│       ├── creations.ts  # Gestion créations
│       ├── archives.ts   # Gestion archives
│       ├── testimonies.ts # Gestion témoignages
│       ├── portraits.ts  # Gestion portraits
│       └── storage.ts    # Gestion stockage
├── contexts/            # Contexts React
├── types/               # Types TypeScript
├── public/              # Assets statiques
│   └── images/         # Images
├── .env.example         # Variables d'environnement (template)
├── .env.local.example   # Variables locales (template)
├── components.json      # Configuration shadcn/ui
├── tailwind.config.ts   # Configuration Tailwind
├── tsconfig.json        # Configuration TypeScript
├── next.config.ts       # Configuration Next.js
├── vercel.json          # Configuration Vercel
├── PLAN.md              # Plan d'implémentation détaillé
└── DEPLOIEMENT.md       # Guide de déploiement
```

## 🎨 Composants shadcn/ui installés

### Base
Button, Card, Badge, Avatar, Separator, Skeleton, ScrollArea, AspectRatio

### Navigation
Sidebar, Breadcrumb, NavigationMenu

### Formulaires
Input, Select, Checkbox, Switch

### Feedback
Alert, Toast, Dialog, Sheet

### Médias
Carousel

### Overlay
Popover, Tooltip, HoverCard, DropdownMenu

## 📚 Documentation

- [PLAN.md](./PLAN.md) - Plan d'implémentation complet du projet
- [DEPLOIEMENT.md](./DEPLOIEMENT.md) - Guide de déploiement détaillé
- [DATA_MODEL.md](./DATA_MODEL.md) - Modèle de données complet
- [docs/SUPABASE_CONFIGURATION.md](./docs/SUPABASE_CONFIGURATION.md) - Configuration Supabase détaillée

## 🚀 Déploiement

Le site est déployé automatiquement sur Vercel à chaque push sur la branche `main`.

Pour déployer manuellement :

```bash
# Via Vercel CLI
vercel --prod
```

Voir [DEPLOIEMENT.md](./DEPLOIEMENT.md) pour les instructions complètes.

## 🔐 Variables d'environnement

Créez un fichier `.env.local` avec les variables suivantes :

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Voir `.env.local.example` pour la liste complète.

## 📝 Conventions de code

- **Style** : ESLint + Prettier
- **Commits** : Messages descriptifs en français
- **Branches** : `feature/nom-fonctionnalite`, `fix/nom-bug`
- **TypeScript** : Types stricts activés
- **Composants** : Utiliser shadcn/ui pour tous les composants UI

## 🤝 Contribution

Ce projet est un site familial privé. Les contributions sont réservées aux membres de la famille.

## 📄 Licence

Privé - Tous droits réservés © Famille DECKER

## 👨‍👩‍👧‍👦 Équipe

Site développé avec ❤️ pour préserver l'histoire de la famille DECKER.

---

**Note** : Ce projet utilise Next.js 15 et les dernières versions de React. Assurez-vous d'avoir Node.js 18+ installé.
