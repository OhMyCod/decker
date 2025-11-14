# Prompt BOLT - Configuration Supabase pour le projet DECKER

## Contexte

Ce document contient les instructions complètes pour configurer la base de données Supabase du projet **DECKER**, une application web généalogique et artistique pour la famille DECKER.

Le projet utilise **Next.js 15**, **TypeScript**, **Tailwind CSS**, et **Supabase** comme backend.

## Objectif

Configurer complètement la base de données Supabase avec :
- 25+ tables PostgreSQL pour gérer les données généalogiques, événements historiques, créations artistiques, archives, témoignages, portraits et sources
- Politiques RLS (Row Level Security) pour sécuriser l'accès aux données
- Buckets de stockage pour les médias (photos, vidéos, audio, documents)
- Fonctions API (RPC) pour les requêtes courantes

## Prérequis

Avant de commencer, assurez-vous d'avoir :
1. Un projet Supabase créé sur https://supabase.com
2. L'URL de votre projet Supabase
3. La clé API `anon` de votre projet
4. La clé API `service_role` de votre projet (pour les migrations)
5. Le CLI Supabase installé : `npm install -g supabase`

## Structure des migrations

Les migrations SQL sont organisées par ordre chronologique et fonctionnel :

```
supabase/migrations/
├── 20250113000001_create_base_tables.sql          # Tables de base (membres, événements)
├── 20250113000002_create_artistic_creations.sql   # Créations artistiques
├── 20250113000003_create_archives_testimonies.sql # Archives, témoignages, portraits
├── 20250113000004_create_rls_policies.sql         # Politiques de sécurité RLS
├── 20250113000005_create_storage_buckets.sql      # Buckets de stockage
└── 20250113000006_create_api_functions.sql        # Fonctions API RPC
```

## Instructions pour BOLT

### Étape 1 : Initialisation du projet Supabase

```bash
# Se placer dans le répertoire du projet
cd C:\Users\Gildas\Documents\Projets\Développement\En cours\Website\decker

# Initialiser Supabase (si pas déjà fait)
supabase init

# Lier le projet local à votre projet Supabase distant
supabase link --project-ref VOTRE_PROJECT_REF
```

### Étape 2 : Exécution des migrations SQL

Les migrations doivent être exécutées **dans l'ordre** pour respecter les dépendances entre tables.

#### Option A : Utiliser le CLI Supabase (recommandé)

```bash
# Exécuter toutes les migrations dans l'ordre
supabase db push

# Ou exécuter migration par migration
supabase db push supabase/migrations/20250113000001_create_base_tables.sql
supabase db push supabase/migrations/20250113000002_create_artistic_creations.sql
supabase db push supabase/migrations/20250113000003_create_archives_testimonies.sql
supabase db push supabase/migrations/20250113000004_create_rls_policies.sql
supabase db push supabase/migrations/20250113000005_create_storage_buckets.sql
supabase db push supabase/migrations/20250113000006_create_api_functions.sql
```

#### Option B : Exécuter depuis le Dashboard Supabase

1. Se connecter au Dashboard Supabase : https://app.supabase.com
2. Sélectionner votre projet
3. Aller dans **SQL Editor**
4. Créer une nouvelle requête
5. Copier-coller le contenu de chaque migration **dans l'ordre** :
   - Commencer par `20250113000001_create_base_tables.sql`
   - Continuer avec `20250113000002_create_artistic_creations.sql`
   - Puis `20250113000003_create_archives_testimonies.sql`
   - Puis `20250113000004_create_rls_policies.sql`
   - Puis `20250113000005_create_storage_buckets.sql`
   - Terminer par `20250113000006_create_api_functions.sql`
6. Exécuter chaque migration avec le bouton **Run**

### Étape 3 : Vérification des tables

Après l'exécution des migrations, vérifiez que toutes les tables ont été créées :

```bash
# Lister toutes les tables
supabase db list
```

Tables attendues (25+) :
- `family_members`
- `family_relations`
- `historical_events`
- `event_members`
- `artistic_creations`
- `creation_collaborators`
- `music_metadata`
- `photography_metadata`
- `painting_metadata`
- `video_metadata`
- `text_metadata`
- `archives`
- `archive_members`
- `testimonies`
- `testimony_about_members`
- `member_portraits`
- `portrait_key_dates`
- `portrait_relationships`
- `sources`
- `source_relations`
- `research_methodology`
- `methodology_steps`
- `methodology_bibliography`
- `methodology_contributors`

### Étape 4 : Vérification des buckets de stockage

Vérifier que les buckets ont été créés depuis le Dashboard :

1. Aller dans **Storage** dans le menu latéral
2. Vérifier la présence des 4 buckets :
   - `photos_archives` (limite 10MB, images uniquement)
   - `videos_ina` (limite 500MB, vidéos uniquement)
   - `audio_creations` (limite 50MB, audio uniquement)
   - `documents` (limite 20MB, PDF et documents)

### Étape 5 : Vérification des politiques RLS

Vérifier que les politiques RLS sont actives :

1. Aller dans **Authentication > Policies** dans le Dashboard
2. Vérifier que **RLS est activé** sur toutes les tables
3. Vérifier la présence des politiques pour chaque table :
   - Lecture publique pour les données publiques/décédées
   - Écriture restreinte aux administrateurs

### Étape 6 : Tester les fonctions API

Tester quelques fonctions RPC depuis le Dashboard :

```sql
-- Obtenir les statistiques de la famille
SELECT * FROM get_family_statistics();

-- Obtenir les membres marquants
SELECT * FROM get_prominent_members();

-- Rechercher un membre
SELECT * FROM search_family_members('Decker');
```

### Étape 7 : Configuration des variables d'environnement

Créer un fichier `.env.local` à la racine du projet avec :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=VOTRE_ANON_KEY

# Supabase Admin (pour les opérations serveur uniquement)
SUPABASE_SERVICE_ROLE_KEY=VOTRE_SERVICE_ROLE_KEY
```

**IMPORTANT** : Ne jamais committer le fichier `.env.local` dans Git !

### Étape 8 : Installation du client Supabase

Installer les dépendances Supabase dans le projet Next.js :

```bash
npm install @supabase/supabase-js
npm install @supabase/ssr
```

### Étape 9 : Créer le client Supabase

Créer le fichier `lib/supabase/client.ts` :

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Créer le fichier `lib/supabase/server.ts` :

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting error
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal error
          }
        },
      },
    }
  )
}
```

### Étape 10 : Créer les types TypeScript depuis Supabase

Générer les types TypeScript basés sur le schéma Supabase :

```bash
supabase gen types typescript --project-id VOTRE_PROJECT_REF > types/supabase.ts
```

## Architecture de données

### Modèle conceptuel

Le schéma de données est organisé autour de 8 entités principales :

1. **FamilyMember** : Membres de la famille avec informations généalogiques
2. **HistoricalEvent** : Événements historiques marquants
3. **ArtisticCreation** : Créations artistiques (musique, photo, peinture, vidéo, texte)
4. **Archive** : Archives et documents (photos anciennes, vidéos INA, lettres)
5. **Testimony** : Témoignages et récits personnels
6. **MemberPortrait** : Portraits détaillés des membres marquants
7. **Source** : Sources documentaires
8. **ResearchMethodology** : Méthodologie de recherche

### Relations clés

- `family_members.father_id` → `family_members.id`
- `family_members.mother_id` → `family_members.id`
- `event_members` : Junction table (many-to-many) entre `historical_events` et `family_members`
- `creation_collaborators` : Junction table entre `artistic_creations` et `family_members`
- `archive_members` : Junction table entre `archives` et `family_members`
- Metadata tables (`music_metadata`, etc.) : One-to-one avec `artistic_creations`

### Périodes historiques

Le système utilise 5 périodes historiques :
- `origines` : Origines de la famille
- `xixe` : XIXe siècle
- `xxe` : XXe siècle
- `apres_guerre` : Après-guerre
- `actuelle` : Période actuelle

### Sécurité (RLS)

#### Règles générales :
- **Lecture publique** : Membres décédés, contenus marqués `is_public = true`
- **Lecture authentifiée** : Tous les membres et contenus pour utilisateurs connectés
- **Écriture** : Réservée aux administrateurs uniquement

#### Politiques par type de contenu :
- **family_members** : Public si décédé OU marquant OU is_public
- **historical_events** : Public si is_public = true
- **artistic_creations** : Public si is_public = true
- **archives** : Public si is_public = true
- **testimonies** : Public si is_public = true

## Fonctions API disponibles

### Généalogie
- `get_family_tree(member_uuid, depth_limit)` : Arbre généalogique d'un membre
- `get_prominent_members()` : Liste des membres marquants

### Événements et créations
- `get_member_events(member_uuid)` : Événements d'un membre
- `get_member_creations(member_uuid)` : Créations artistiques d'un membre
- `get_events_by_period(period_name)` : Événements par période historique

### Archives et témoignages
- `get_member_archives(member_uuid)` : Archives liées à un membre
- `get_member_testimonies(member_uuid)` : Témoignages d'un membre ou sur un membre

### Recherche
- `search_family_members(search_query, filters...)` : Recherche avancée de membres
- `search_all_content(search_query)` : Recherche full-text dans tous les contenus

### Statistiques
- `get_family_statistics()` : Statistiques globales de la famille

## Utilisation des fonctions dans Next.js

Exemple d'appel d'une fonction RPC :

```typescript
import { createClient } from '@/lib/supabase/client'

export async function getFamilyStats() {
  const supabase = createClient()

  const { data, error } = await supabase
    .rpc('get_family_statistics')

  if (error) throw error
  return data
}
```

## Stockage des médias

### Upload d'un fichier

```typescript
const supabase = createClient()

const { data, error } = await supabase.storage
  .from('photos_archives')
  .upload('public/portrait-jean-decker.jpg', file, {
    cacheControl: '3600',
    upsert: false
  })
```

### Récupération d'une URL publique

```typescript
const { data } = supabase.storage
  .from('photos_archives')
  .getPublicUrl('public/portrait-jean-decker.jpg')

console.log(data.publicUrl)
```

### Transformation d'images

Supabase permet de transformer les images à la volée :

```typescript
const { data } = supabase.storage
  .from('photos_archives')
  .getPublicUrl('public/portrait-jean-decker.jpg', {
    transform: {
      width: 800,
      height: 600,
      resize: 'cover'
    }
  })
```

## Données de test

Pour insérer des données de test, vous pouvez exécuter les requêtes suivantes :

```sql
-- Insérer un membre de test
INSERT INTO family_members (
  first_name, last_name, gender, life_status,
  birth_date, is_prominent, generation
) VALUES (
  'Gilbert', 'DECKER', 'male', 'deceased',
  '1920-01-15', true, 1
);

-- Insérer un événement de test
INSERT INTO historical_events (
  title, event_type, historical_period,
  event_date, importance_level, is_public
) VALUES (
  'Résistance pendant la Seconde Guerre mondiale',
  'military', 'xxe',
  '1940-06-18', 'high', true
);
```

## Troubleshooting

### Erreur : "relation does not exist"
- Vérifier que toutes les migrations ont été exécutées dans l'ordre
- Vérifier qu'il n'y a pas d'erreurs SQL dans les logs

### Erreur : "permission denied for table"
- Vérifier que les politiques RLS sont correctement configurées
- Vérifier que l'utilisateur a les bonnes permissions

### Erreur : "storage bucket not found"
- Vérifier que la migration des buckets a été exécutée
- Vérifier le nom du bucket dans le code

### Erreur : "function does not exist"
- Vérifier que la migration des fonctions API a été exécutée
- Vérifier le nom de la fonction appelée

## Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [RLS Policies Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Résumé des commandes

```bash
# 1. Initialisation
supabase init
supabase link --project-ref VOTRE_PROJECT_REF

# 2. Exécution des migrations
supabase db push

# 3. Génération des types
supabase gen types typescript --project-id VOTRE_PROJECT_REF > types/supabase.ts

# 4. Installation des dépendances
npm install @supabase/supabase-js @supabase/ssr

# 5. Créer les fichiers de configuration
# - lib/supabase/client.ts
# - lib/supabase/server.ts
# - .env.local

# 6. Tester les fonctions depuis le SQL Editor
SELECT * FROM get_family_statistics();
```

## Checklist de validation

- [ ] Toutes les migrations SQL ont été exécutées sans erreur
- [ ] Les 25+ tables sont créées dans la base de données
- [ ] RLS est activé sur toutes les tables
- [ ] Les 4 buckets de stockage sont créés
- [ ] Les fonctions API (RPC) sont disponibles
- [ ] Les variables d'environnement sont configurées
- [ ] Le client Supabase est créé et fonctionne
- [ ] Les types TypeScript sont générés

---

**Note** : Ce prompt a été généré automatiquement pour BOLT. Suivez ces instructions étape par étape pour configurer complètement la base de données Supabase du projet DECKER.
