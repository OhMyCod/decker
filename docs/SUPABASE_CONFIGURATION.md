# Configuration Supabase - Projet DECKER

## Aperçu

Le projet DECKER utilise Supabase comme backend pour gérer :
- **24 tables PostgreSQL** pour les données généalogiques, événements, créations artistiques, archives, témoignages
- **4 buckets de stockage** pour les médias (photos, vidéos, audio, documents)
- **Politiques RLS** pour sécuriser l'accès aux données
- **Services métier** pour les opérations CRUD

## État de la Configuration

✅ **Base de données** : 24 tables créées avec succès
✅ **Buckets de stockage** : 4 buckets configurés (photos_archives, videos_ina, audio_creations, documents)
✅ **Politiques RLS** : Activées sur toutes les tables
✅ **Clients Supabase** : Configurés avec @supabase/ssr pour Next.js 15
✅ **Services métier** : 7 services créés (members, events, creations, archives, testimonies, portraits, storage)

## Structure de la Base de Données

### Tables Principales (24)

#### Généalogie et Membres
- `family_members` - Membres de la famille avec informations biographiques
- `family_relations` - Relations familiales complexes (many-to-many)

#### Événements Historiques
- `historical_events` - Événements marquants de l'histoire familiale
- `event_members` - Junction table événements/membres

#### Créations Artistiques
- `artistic_creations` - Table principale pour les créations
- `creation_collaborators` - Junction table créations/collaborateurs
- `music_metadata` - Métadonnées musicales
- `photography_metadata` - Métadonnées photographies
- `painting_metadata` - Métadonnées peintures/dessins
- `video_metadata` - Métadonnées vidéos
- `text_metadata` - Métadonnées textes littéraires

#### Archives et Documents
- `archives` - Archives et documents familiaux
- `archive_members` - Junction table archives/membres

#### Témoignages
- `testimonies` - Témoignages et récits personnels
- `testimony_about_members` - Junction table témoignages/membres

#### Portraits
- `member_portraits` - Portraits détaillés des membres marquants
- `portrait_key_dates` - Dates clés pour les portraits
- `portrait_relationships` - Relations importantes pour les portraits

#### Sources et Méthodologie
- `sources` - Sources documentaires
- `source_relations` - Relations sources/entités
- `research_methodology` - Méthodologie de recherche
- `methodology_steps` - Étapes de la méthodologie
- `methodology_bibliography` - Bibliographie
- `methodology_contributors` - Contributeurs

## Buckets de Stockage

### photos_archives
- **Usage** : Photos d'archives, portraits, documents scannés
- **Limite** : 10MB par fichier
- **Formats** : JPEG, PNG, WebP, AVIF, GIF
- **Accès** : Lecture publique, écriture administrateurs

### videos_ina
- **Usage** : Vidéos INA (Colonel Rémy) et créations vidéo
- **Limite** : 500MB par fichier
- **Formats** : MP4, MPEG, QuickTime, WebM, AVI
- **Accès** : Lecture publique, écriture administrateurs

### audio_creations
- **Usage** : Créations musicales, enregistrements vocaux
- **Limite** : 50MB par fichier
- **Formats** : MP3, WAV, OGG, AAC, FLAC
- **Accès** : Lecture publique, écriture administrateurs

### documents
- **Usage** : Lettres, manuscrits, documents officiels
- **Limite** : 20MB par fichier
- **Formats** : PDF, DOC, DOCX, TXT, JPEG, PNG
- **Accès** : Lecture publique, écriture administrateurs

## Politiques de Sécurité RLS

### Règles Générales

#### Lecture (SELECT)
- **Membres décédés** : Accès public
- **Membres marquants** : Accès public
- **Contenus publics** (is_public = true) : Accès public
- **Utilisateurs authentifiés** : Accès à tous les contenus
- **Tables de référence** : Accès public (relations, métadonnées)

#### Écriture (INSERT/UPDATE/DELETE)
- **Toutes les écritures** : Réservées aux administrateurs
- **Vérification** : Via `auth.jwt() ->> 'role' = 'admin'`

### Exemples de Politiques

```sql
-- Lecture publique des membres décédés
CREATE POLICY "Public can view deceased members"
ON family_members FOR SELECT
USING (life_status = 'deceased' OR is_prominent = TRUE);

-- Écriture admin uniquement
CREATE POLICY "Only admins can insert members"
ON family_members FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

## Utilisation des Clients Supabase

### Client Navigateur (Client Components)

```typescript
import { createClient } from '@/lib/supabase/client'

export function MyClientComponent() {
  const supabase = createClient()

  // Utiliser supabase...
}
```

### Client Serveur (Server Components)

```typescript
import { createClient } from '@/lib/supabase/server'

export async function MyServerComponent() {
  const supabase = await createClient()

  // Utiliser supabase...
}
```

## Services Métier Disponibles

### Members Service
```typescript
import { getFamilyMembers, getProminentMembers } from '@/lib/services/members'

const members = await getFamilyMembers()
const prominent = await getProminentMembers()
```

### Events Service
```typescript
import { getHistoricalEvents, getEventsByPeriod } from '@/lib/services/events'

const events = await getHistoricalEvents()
const xxeEvents = await getEventsByPeriod('xxe')
```

### Creations Service
```typescript
import { getArtisticCreations, getMusicCreations } from '@/lib/services/creations'

const creations = await getArtisticCreations()
const music = await getMusicCreations()
```

### Archives Service
```typescript
import { getArchives, getINAVideos } from '@/lib/services/archives'

const archives = await getArchives()
const inaVideos = await getINAVideos()
```

### Testimonies Service
```typescript
import { getTestimonies, getColonelRemyTestimonies } from '@/lib/services/testimonies'

const testimonies = await getTestimonies()
const colonelRemyTestimonies = await getColonelRemyTestimonies()
```

### Portraits Service
```typescript
import { getMemberPortraits, getColonelRemyPortrait } from '@/lib/services/portraits'

const portraits = await getMemberPortraits()
const colonelRemy = await getColonelRemyPortrait()
```

### Storage Service
```typescript
import { uploadFile, getPublicUrl, getImageUrl } from '@/lib/services/storage'

// Upload
await uploadFile('photos_archives', 'portrait.jpg', file)

// Get URL
const url = getPublicUrl('photos_archives', 'portrait.jpg')

// Get transformed image
const thumbnail = getImageUrl('photos_archives', 'portrait.jpg', {
  width: 400,
  height: 300,
  quality: 80
})
```

## Migrations

Les migrations sont organisées dans `supabase/migrations/` :

1. `20250113000001_create_base_tables.sql` - Tables de base
2. `20250113000002_create_artistic_creations.sql` - Créations artistiques
3. `20250113000003_create_archives_testimonies.sql` - Archives et témoignages
4. `20250113000004_create_rls_policies.sql` - Politiques RLS
5. `20250113000005_create_storage_buckets.sql` - Buckets de stockage

Toutes les migrations ont été appliquées avec succès à la base de données.

## Variables d'Environnement

Le projet utilise les variables suivantes (configurées dans `.env`) :

```env
NEXT_PUBLIC_SUPABASE_URL=https://eomytqkcxkwdiakyawaw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<votre_anon_key>
```

## Prochaines Étapes

### Données de Test
Pour tester le système, vous pouvez insérer des données via le Dashboard Supabase :

1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet
3. Aller dans "Table Editor"
4. Insérer des données de test dans les tables

### Exemple d'Insertion

```sql
-- Insérer un membre test
INSERT INTO family_members (
  first_name, last_name, gender, birth_date, life_status, is_prominent
) VALUES (
  'Gilbert', 'DECKER', 'male', '1920-01-15', 'deceased', true
);

-- Insérer un événement test
INSERT INTO historical_events (
  title, event_type, historical_period, event_date, is_public
) VALUES (
  'Résistance pendant la Seconde Guerre mondiale',
  'military', 'xxe', '1940-06-18', true
);
```

## Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [RLS Policies Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Support

Pour toute question ou problème :
1. Consulter les logs dans le Dashboard Supabase
2. Vérifier les politiques RLS actives
3. Tester les requêtes dans le SQL Editor

---

**Dernière mise à jour** : 2025-01-14
**Version** : 1.0
