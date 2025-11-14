# CLAUDE.md

## Vue d'ensemble du projet DECKER

Ce document fournit un contexte complet pour comprendre et travailler sur le projet DECKER.

## Description du projet

DECKER est une application web généalogique et artistique dédiée à l'exploration des archives familiales. Le projet combine la préservation du patrimoine familial avec une présentation artistique moderne.

## Stack technique

- **Framework**: Next.js (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Composants UI**: shadcn/ui
- **Déploiement**: Vercel

## Structure du projet

```
decker/
├── app/                    # Pages et layouts (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
│   └── ui/               # Composants shadcn/ui
├── hooks/                # Hooks React personnalisés
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                  # Utilitaires
│   └── utils.ts
├── types/                # Définitions TypeScript
├── public/               # Assets statiques (images, vidéos, audio)
├── package.json          # Dépendances et scripts
└── PLAN.md              # Planification du projet
```

## Configuration de l'environnement

### Prérequis

- Node.js (version LTS recommandée)
- npm

### Installation

```bash
npm install
```

### Scripts disponibles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Construire pour la production
npm run start    # Démarrer en production
npm run lint     # Vérifier le code
```

### Développement local

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Composants UI disponibles

Le projet utilise shadcn/ui avec les composants suivants déjà configurés :

- Alert, Avatar, Badge
- Breadcrumb, Button, Card, Carousel
- Checkbox, Dialog, Dropdown Menu
- Hover Card, Input
- Navigation Menu, Popover
- Scroll Area, Select, Separator
- Sheet, Sidebar, Skeleton
- Switch, Toast, Tooltip

## Bonnes pratiques

### Structure des composants

- Placer les composants réutilisables dans `components/`
- Les composants UI shadcn/ui sont dans `components/ui/`
- Utiliser TypeScript pour tous les nouveaux fichiers

### Styling

- Utiliser Tailwind CSS pour le styling
- Suivre les conventions de shadcn/ui pour la cohérence
- Définir les utilitaires dans `lib/utils.ts`

### Types

- Définir les types dans le dossier `types/`
- Utiliser des interfaces pour les props de composants

## Notes importantes

- Le projet utilise l'App Router de Next.js (pas le Pages Router)
- Les assets statiques vont dans `public/`
- Configuration gérée via `package.json` et fichiers de config Next.js

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
