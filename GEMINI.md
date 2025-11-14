# Fichier de contexte pour Gemini

## Vue d'ensemble du projet

Ce projet est un site web familial pour la famille DECKER. Il a pour but de préserver et de partager l'histoire, les archives et les créations de la famille. Le site est construit avec des technologies web modernes et une architecture robuste.

## Technologies et Architecture

*   **Framework** : Next.js 15 avec App Router
*   **Langage** : TypeScript
*   **Style** : Tailwind CSS
*   **Composants UI** : shadcn/ui (basé sur Radix UI)
*   **Base de données** : Supabase (PostgreSQL)
*   **Authentification** : Supabase Auth
*   **Stockage** : Supabase Storage
*   **Hébergement** : Vercel
*   **Icônes** : Lucide React

L'architecture est basée sur le App Router de Next.js 15, ce qui permet un rendu côté serveur (SSR) et des composants serveur. La base de données Supabase est intégrée avec des clients SSR pour une récupération sécurisée des données côté serveur. Le projet utilise également des services métier pour séparer la logique de données de l'interface utilisateur.

## Installation et Exécution

### Prérequis

*   Node.js 18+
*   npm (ou yarn/pnpm)
*   Git

### Installation

1.  **Cloner le dépôt**
    ```bash
    git clone <repository_url>
    cd decker
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement**
    *   Copier `.env.local.example` vers `.env.local`.
    *   Remplir les variables d'environnement avec les clés Supabase et autres configurations.

### Exécution en mode développement

Pour lancer le serveur de développement local :

```bash
npm run dev
```

Le site sera accessible à l'adresse `http://localhost:3000`.

### Build pour la production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Pour lancer le serveur de production localement :

```bash
npm run start
```

## Tests et Qualité du code

### Linting

Pour vérifier la qualité du code et les erreurs de style, utilisez la commande suivante :

```bash
npm run lint
```

Le projet est configuré avec ESLint pour suivre les meilleures pratiques de Next.js et React.

## Conventions de développement

*   **Style de code** : Le projet utilise ESLint et Prettier pour maintenir un style de code cohérent.
*   **Messages de commit** : Les messages de commit doivent être descriptifs et rédigés en français.
*   **Branches Git** :
    *   Nouvelles fonctionnalités : `feature/nom-de-la-fonctionnalite`
    *   Corrections de bugs : `fix/nom-du-bug`
*   **TypeScript** : Le mode strict de TypeScript est activé. Il est recommandé de typer toutes les données et les props des composants.
*   **Composants UI** : Utiliser les composants de `shadcn/ui` autant que possible pour garantir une cohérence visuelle. Les composants personnalisés doivent être placés dans le répertoire `/components`.
*   **Variables d'environnement** : Toutes les clés d'API et les secrets doivent être stockés dans `.env.local` et ne jamais être commités dans le dépôt Git.

## Fichiers clés

*   `app/layout.tsx`: Layout principal de l'application.
*   `app/page.tsx`: Page d'accueil.
*   `components/`: Contient tous les composants React réutilisables.
*   `lib/supabase/`: Contient les clients Supabase pour le navigateur, le serveur et le middleware.
*   `lib/services/`: Contient la logique métier pour interagir avec la base de données.
*   `supabase/migrations/`: Contient les migrations de la base de données Supabase.
*   `README.md`: Fournit une vue d'ensemble détaillée du projet.
*   `PLAN.md`: Décrit le plan d'implémentation du projet.
*   `DEPLOIEMENT.md`: Guide de déploiement détaillé.
*   `DATA_MODEL.md`: Décrit le modèle de données de la base de données.
