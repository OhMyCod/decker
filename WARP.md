# WARP.md

Ce fichier fournit des directives à WARP (warp.dev) pour travailler avec le code de ce dépôt.

## Vue d'ensemble du projet

Site web familial moderne pour la famille DECKER, construit avec Next.js 15, TypeScript et Tailwind CSS. Le projet vise à préserver et partager l'histoire familiale, les archives et les créations artistiques.

## Commandes essentielles

### Développement
```bash
npm run dev          # Démarre le serveur de développement sur http://localhost:3000
npm run build        # Crée un build de production
npm start            # Lance le build de production
npm run lint         # Vérifie le code avec ESLint
```

### Gestion des composants shadcn/ui
```bash
npx shadcn@latest add [component]  # Ajoute un nouveau composant shadcn/ui
```

## Architecture du projet

### Stack technique
- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript (strict mode activé)
- **Styling** : Tailwind CSS avec système de variables CSS
- **Composants UI** : shadcn/ui (Radix UI + Tailwind) - style "new-york"
- **Base de données** : Supabase
- **Icônes** : Lucide React
- **Thèmes** : next-themes (support clair/sombre/système)

### Structure des dossiers

```
decker/
├── app/                      # Pages Next.js (App Router)
│   ├── layout.tsx           # Layout racine avec sidebar et thème
│   ├── page.tsx             # Page d'accueil
│   ├── histoire/            # Section histoire familiale
│   ├── archives/            # Section archives & documents
│   ├── creations/           # Section créations artistiques
│   ├── portraits/           # Section portraits des membres
│   ├── genealogie/          # Section arbre généalogique
│   ├── temoignages/         # Section témoignages
│   ├── telechargements/     # Section téléchargements
│   ├── sources/             # Section méthode & sources
│   ├── admin/               # Espace d'administration
│   └── api/                 # Routes API
├── components/              # Composants React
│   ├── ui/                  # Composants shadcn/ui
│   ├── app-sidebar.tsx      # Sidebar principale avec navigation
│   └── theme-provider.tsx   # Provider pour next-themes
├── lib/
│   ├── utils.ts             # Fonctions utilitaires (cn, etc.)
│   └── supabase.ts          # Client Supabase
├── hooks/                   # Hooks personnalisés
├── contexts/                # React Contexts
├── types/                   # Types TypeScript
└── public/                  # Assets statiques
```

## Principes architecturaux importants

### 1. Utilisation exclusive de shadcn/ui
**TOUS les composants UI doivent utiliser shadcn/ui**. Ne jamais créer de composants UI personnalisés sans vérifier d'abord si shadcn/ui propose une alternative. Les composants sont installés localement et personnalisables.

Composants déjà installés : Button, Card, Badge, Avatar, Separator, Skeleton, ScrollArea, AspectRatio, Sidebar, Breadcrumb, NavigationMenu, Tabs, Input, Select, Checkbox, Switch, Alert, Toast, Dialog, Sheet, Carousel, Popover, Tooltip, HoverCard, DropdownMenu, Collapsible, Accordion.

### 2. Sidebar et navigation
La navigation principale utilise le composant `AppSidebar` avec :
- Mode collapsible (icône uniquement ou complet)
- Navigation organisée en 3 groupes : Navigation, Exploration, Ressources
- Sous-menus expandables pour "Histoire familiale" et "Créations artistiques"
- Footer avec profil utilisateur et sélecteur de thème
- État persisté automatiquement via cookies

### 3. Système de thème
Le projet utilise `next-themes` avec 3 modes :
- Clair
- Sombre
- Système (détection automatique)

Le thème est accessible via le menu utilisateur dans le footer de la sidebar. Les variables CSS sont définies dans `app/globals.css` et suivent la convention shadcn/ui.

### 4. Gestion des paths
Utiliser les alias TypeScript configurés :
- `@/components` → composants
- `@/lib` → utilitaires et clients
- `@/hooks` → hooks personnalisés
- `@/types` → types TypeScript
- `@/ui` → `components/ui`

### 5. Client Supabase
Le client Supabase est configuré dans `lib/supabase.ts`. Les variables d'environnement requises sont :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (pour les opérations admin)

## Conventions de développement

### TypeScript
- Mode strict activé
- Toujours typer les props, états et retours de fonctions
- Utiliser les types TypeScript natifs plutôt que les génériques quand possible

### Composants React
- Utiliser "use client" uniquement quand nécessaire (interactivité, hooks)
- Préférer les Server Components par défaut (Next.js 15)
- Structure : imports, types, composant principal, exports

### Styling
- Utiliser Tailwind CSS uniquement
- Utiliser `cn()` de `lib/utils.ts` pour combiner les classes conditionnellement
- Respecter les variables CSS de shadcn/ui pour la cohérence du thème
- Polices : Geist Sans (variable `--font-geist-sans`) et Geist Mono

### Accessibilité
Les composants shadcn/ui sont conformes WCAG par défaut. S'assurer de :
- Ajouter des `alt` texts aux images
- Utiliser des labels appropriés pour les formulaires
- Tester la navigation au clavier

## Structure de navigation

### Routes principales
- `/` - Accueil
- `/histoire` - Histoire familiale (avec sous-pages par période)
- `/archives` - Archives & Documents
- `/creations` - Créations artistiques (musique, photos, peintures, vidéos, textes)
- `/portraits` - Portraits des membres marquants
- `/genealogie` - Arbre généalogique interactif
- `/temoignages` - Témoignages et récits personnels
- `/telechargements` - Téléchargements et archives numériques
- `/sources` - Méthode & Sources
- `/admin` - Espace d'administration (protégé)

## Références importantes

- **Documentation complète** : Voir `PLAN.md` pour le plan d'implémentation détaillé
- **Guide de déploiement** : Voir `DEPLOIEMENT.md`
- **shadcn/ui docs** : https://ui.shadcn.com/
- **Next.js 15 docs** : https://nextjs.org/docs

## Notes de développement

- Le projet est en cours de développement (Phase 2 : Sidebar et thème complétés)
- Environnement Windows avec PowerShell
- Langue du projet : Français
- Messages de commit en français
- Node.js 18+ requis
