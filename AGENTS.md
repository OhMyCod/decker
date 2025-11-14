# Directives du Depot - Site Web Famille DECKER

## Vue d'ensemble du projet

DECKER est une application web généalogique et artistique dédiée à l'exploration des archives familiales. Le projet combine la préservation du patrimoine familial avec une présentation artistique moderne, utilisant une stack technique moderne : Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, et Supabase.

## Structure du projet et organisation des modules

### Architecture principale
- `app/` : Pages et layouts Next.js App Router ; ne modifiez `layout.tsx` ou `globals.css` que pour des changements globaux
- `components/` : Composants React réutilisables avec dossier `ui/` pour les atomes shadcn/Radix
- `lib/` : Utilitaires, clients Supabase (`lib/supabase/*.ts`) et services métier (`lib/services/*.ts`)
- `hooks/`, `contexts/` et `types/` : Comportements réutilisables et contrats TypeScript
- `supabase/` : Migrations SQL, buckets et fonctions ; `public/`, `docs/` pour assets et références

### Fonctionnalités implémentées
- **Navigation** : Sidebar dépliable avec groupes thématiques (Navigation, Exploration, Ressources)
- **Thème** : Système clair/sombre avec persistance et mode système
- **Timeline historique** : Composant animé synchronisé avec le scroll vertical sur les pages histoire
- **Composants UI** : Bibliothèque complète shadcn/ui (Button, Card, Dialog, Tooltip, etc.)

## Commandes de build, test et développement

- `npm install` : Synchronise les dépendances avant de coder
- `npm run dev` : Lance Next.js sur `http://localhost:3000` avec Fast Refresh
- `npm run build` : Valide le bundle de production ; `npm start` sert ce bundle
- `npm run lint` : Execute `next lint` (ESLint + Prettier) sur tout le repo ; corrigez les alerts avant push
- `vercel --prod` : Force un déploiement manuel, en suivant `DEPLOIEMENT.md`

## Style de code et conventions de nommage

### Design System
- `STYLE_GUIDE.md` définit les couleurs familiales, typographies et tokens d'accessibilité
- Palette DECKER : couleurs sémantiques (heritage, warmth, creativity, legacy, nature)
- Typographie : Geist Sans/Mono avec échelle personnalisée
- Espacements et breakpoints responsives personnalisés

### Conventions techniques
- TypeScript en mode strict (`tsconfig.json`)
- Composants PascalCase, atomes custom préfixés `Custom`
- Logique métier dans `lib/`, UI dans `components/`
- ESLint/Prettier automatiques ; classes Tailwind sémantiques préférées aux valeurs hex

## Directives de test

- Suite automatisée non implémentée ; vérifications via `npm run lint` et tests manuels
- Tests placés côte à côte (`lib/services/members.test.ts`) avec suffixe `*.test.ts(x)`
- Vérifications Supabase documentées dans `docs/` pour reproductibilité

## Directives pour commits et pull requests

### Messages de commit
- Descriptifs en français avec préfixes : `feat:`, `fix:`, `docs:`
- Branches : `feature/nom-fonctionnalite` ou `fix/nom-bug`

### Pull Requests
- Inspirées de `PR_PHASE_3_DESCRIPTION.md` : résumé, objectifs cochables, tests
- Liens vers issues ou `PLAN.md`, captures UI, blocage fusion si `npm run lint` échoue

## Conseils de sécurité et configuration

### Variables d'environnement
- Jamais de secrets commités ; copier `.env.local.example` vers `.env.local`
- Clés Supabase et sensibles dans l'espace secrets local uniquement
- Renouvellement via console Supabase (voir `SUPABASE_STATUS.md`)

### Déploiement et migrations
- Suivre `DEPLOIEMENT.md`, `BOLT_SUPABASE_SETUP.md` et `BOLT_APPLY_API_MIGRATION.md`
- Modifications migrations/buckets dans `supabase/` après vérifications

## Composants UI disponibles (shadcn/ui)

### Composants installés
**Navigation** : Sidebar, Breadcrumb, NavigationMenu, Tabs
**Formulaires** : Input, Select, Checkbox, Switch, Form, Label
**Feedback** : Alert, Toast, Dialog, Sheet, Tooltip, Popover, HoverCard
**Médias** : AspectRatio, Carousel, ScrollArea
**Layout** : Card, Separator, Skeleton, Collapsible, Accordion
**Actions** : Button, DropdownMenu, ContextMenu, Command

### Utilisation recommandée
- Tous les composants UI doivent utiliser shadcn/ui exclusivement
- Personnalisation via variants et classes Tailwind
- Accessibilité WCAG intégrée par défaut

## Fonctionnalités avancées implémentées

### Timeline historique animée
- Composant `HistoireTimeline` avec synchronisation scroll vertical
- Hook `useTimelineSync` utilisant Intersection Observer
- Animations : `timeline-progress`, `timeline-pulse` dans Tailwind
- Responsive : adaptation mobile avec tailles réduites

### Structure des pages histoire
- Layout partagé avec breadcrumb dynamique
- 5 périodes chronologiques : Origines, XIXᵉ, XXᵉ, Après-guerre, Actuelle
- Navigation synchronisée entre timeline et contenu

## Flux de développement recommandé

1. **Planification** : Vérifier `PLAN.md` et créer tâches dans todo list
2. **Implémentation** : Suivre conventions de nommage et structure
3. **Tests** : `npm run lint` + vérifications manuelles
4. **Commit** : Messages descriptifs en français avec préfixes appropriés
5. **PR** : Documentation complète avec captures si changements UI
