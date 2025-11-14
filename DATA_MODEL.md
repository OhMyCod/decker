# Modèle de Données - Site Famille DECKER

Ce document décrit le modèle de données complet du site web de la famille DECKER.

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Membres de la Famille](#membres-de-la-famille)
3. [Événements Historiques](#événements-historiques)
4. [Créations Artistiques](#créations-artistiques)
5. [Archives et Documents](#archives-et-documents)
6. [Témoignages](#témoignages)
7. [Portraits](#portraits)
8. [Sources et Méthodologie](#sources-et-méthodologie)
9. [Relations entre Entités](#relations-entre-entités)
10. [Implémentation Supabase](#implémentation-supabase)

---

## Vue d'ensemble

Le modèle de données est organisé autour de **8 entités principales** :

| Entité | Description | Type TypeScript |
|--------|-------------|-----------------|
| **FamilyMember** | Membres de la famille avec liens généalogiques | `FamilyMember` |
| **HistoricalEvent** | Événements marquants de l'histoire familiale | `HistoricalEvent` |
| **ArtisticCreation** | Créations artistiques (musique, photo, peinture, vidéo, texte) | `AnyCreation` |
| **Archive** | Archives et documents familiaux | `Archive` |
| **Testimony** | Témoignages et récits personnels | `Testimony` |
| **MemberPortrait** | Portraits détaillés des membres marquants | `MemberPortrait` |
| **Source** | Sources documentaires | `Source` |
| **ResearchMethodology** | Méthodologie de recherche | `ResearchMethodology` |

### Types de Base

```typescript
type UUID = string;              // Identifiants uniques
type ISODateString = string;     // Dates au format ISO 8601
type MediaUrl = string;          // URLs de médias
type Gender = 'male' | 'female' | 'other' | 'unknown';
type LifeStatus = 'alive' | 'deceased' | 'unknown';
```

---

## Membres de la Famille

### Structure: `FamilyMember`

Représente un membre de la famille avec ses informations biographiques et ses liens généalogiques.

**Champs principaux:**

- **Identité**: `first_name`, `last_name`, `maiden_name`, `nickname`, `gender`
- **Dates vitales**: `birth_date`, `birth_place`, `death_date`, `death_place`, `life_status`
- **Relations**: `father_id`, `mother_id`, `spouse_ids[]`, `children_ids[]`
- **Biographie**: `biography`, `occupation`, `education`, `achievements[]`
- **Médias**: `profile_photo_url`, `photos_urls[]`
- **Métadonnées**: `is_prominent`, `generation`

**Exemple:**

```typescript
const member: FamilyMember = {
  id: "uuid-123",
  first_name: "Gilbert",
  last_name: "DECKER",
  gender: "male",
  birth_date: "1920-05-15",
  birth_place: "Paris, France",
  life_status: "deceased",
  death_date: "2005-03-22",
  father_id: "uuid-father",
  mother_id: "uuid-mother",
  biography: "Membre actif de la Résistance...",
  is_prominent: true,
  generation: 3,
  created_at: "2025-01-13T10:00:00Z",
  updated_at: "2025-01-13T10:00:00Z"
};
```

### Relations Familiales: `FamilyRelation`

Permet de définir des relations complexes au-delà des relations parent-enfant directes.

```typescript
type RelationType =
  | 'parent' | 'child' | 'spouse' | 'sibling'
  | 'grandparent' | 'grandchild'
  | 'uncle_aunt' | 'nephew_niece' | 'cousin';
```

---

## Événements Historiques

### Structure: `HistoricalEvent`

Représente les événements marquants de l'histoire familiale.

**Périodes historiques:**

```typescript
type HistoricalPeriod =
  | 'origines'       // Date la plus ancienne connue
  | 'xixe'          // XIXᵉ siècle (1800-1900)
  | 'xxe'           // XXᵉ siècle (1900-1945) - guerres, résistance
  | 'apres_guerre'  // Après-guerre (1945-2000)
  | 'actuelle';     // Génération actuelle (2000+)
```

**Types d'événements:**

```typescript
type EventType =
  | 'birth' | 'death' | 'marriage' | 'divorce'
  | 'migration' | 'military' | 'professional'
  | 'achievement' | 'family_gathering'
  | 'historical_context' | 'other';
```

**Champs clés:**

- Dates: `event_date`, `start_date`, `end_date`, `is_approximate_date`
- Lieu: `location`, `coordinates` (latitude/longitude)
- Personnes: `involved_member_ids[]`
- Contexte: `historical_context`, `sources[]`
- Importance: `importance_level` (low/medium/high)

**Exemple - Colonel Rémy:**

```typescript
const event: HistoricalEvent = {
  id: "uuid-event-123",
  title: "Création du réseau de renseignement Confrérie Notre-Dame",
  description: "Le Colonel Rémy fonde le réseau CND...",
  event_type: "military",
  historical_period: "xxe",
  event_date: "1940-07-01",
  location: "Paris, France",
  involved_member_ids: ["uuid-colonel-remy"],
  historical_context: "Début de l'Occupation allemande en France...",
  importance_level: "high",
  created_at: "2025-01-13T10:00:00Z",
  updated_at: "2025-01-13T10:00:00Z"
};
```

---

## Créations Artistiques

### Types de Créations

Le système supporte **5 types principaux** de créations artistiques :

1. **Musique** (`MusicCreation`)
2. **Photographies** (`Photography`)
3. **Peintures/Dessins** (`PaintingDrawing`)
4. **Vidéos** (`VideoCreation`)
5. **Textes** (`TextCreation`)

Tous héritent de `ArtisticCreation` avec des champs spécifiques.

### 1. Musique: `MusicCreation`

**Métadonnées spécifiques:**

- `music_type`: 'album' | 'single' | 'demo' | 'archive' | 'collaboration'
- `duration`: durée en secondes
- `beatmaker`, `producer`: crédits
- `lyrics`: paroles complètes
- `anecdotes`: contexte personnel
- `audio_url`: lien vers le fichier audio

**Exemple:**

```typescript
const music: MusicCreation = {
  id: "uuid-music-1",
  title: "Souvenirs d'été",
  description: "Composition piano inspirée des étés en Provence",
  creation_type: "music",
  music_type: "single",
  author_id: "uuid-author",
  year: 2010,
  duration: 245, // 4min 5s
  beatmaker: "Jean DECKER",
  lyrics: "Paroles...",
  anecdotes: "Composée lors d'un été en famille à Aix-en-Provence",
  audio_url: "https://cdn.decker.fr/music/souvenirs-ete.mp3",
  tags: ["piano", "instrumental", "été"],
  created_at: "2025-01-13T10:00:00Z",
  updated_at: "2025-01-13T10:00:00Z"
};
```

### 2. Photographie: `Photography`

**Métadonnées spécifiques:**

- `location`: lieu de prise de vue
- `camera`, `lens`: équipement
- `settings`: `aperture`, `shutter_speed`, `iso`
- `series_name`: nom de la série thématique
- `high_res_url`: version haute résolution

### 3. Peintures/Dessins: `PaintingDrawing`

**Métadonnées spécifiques:**

- `medium`: huile, aquarelle, crayon, etc.
- `dimensions`: largeur, hauteur, unité (cm/in)
- `technique`: technique artistique utilisée

### 4. Vidéos: `VideoCreation`

**Métadonnées spécifiques:**

- `video_type`: 'short_film' | 'documentary' | 'montage' | 'capture'
- `duration`: durée en secondes
- `credits`: crédits complets
- `video_url`, `thumbnail_url`

### 5. Textes: `TextCreation`

**Types de textes:**

```typescript
type TextType = 'poem' | 'autobiography' | 'philosophy'
               | 'essay' | 'novel' | 'short_story' | 'other';
```

**Métadonnées spécifiques:**

- `text_type`: type de texte
- `content`: contenu complet
- `excerpt`: extrait
- `word_count`: nombre de mots
- `pdf_url`: version PDF téléchargeable

---

## Archives et Documents

### Structure: `Archive`

Représente les documents d'archives familiales.

**Types d'archives:**

```typescript
type ArchiveType =
  | 'photo'              // Photos anciennes
  | 'video_ina'          // Vidéos INA (Colonel Rémy)
  | 'letter'             // Correspondances
  | 'official_document'  // Actes officiels
  | 'journal'            // Journaux intimes
  | 'notebook'           // Carnets
  | 'manuscript'         // Manuscrits
  | 'certificate'        // Certificats
  | 'other';
```

**État de restauration:**

```typescript
type RestorationStatus = 'original' | 'restored' | 'in_progress' | 'needed';
```

**Champs clés:**

- Versions: `media_url`, `original_url`, `restored_url`
- Transcription: `transcription` (pour manuscrits)
- Restauration: `restoration_status`, `restoration_notes`
- Source: `source`, `archive_reference`
- **INA spécifique**: `ina_reference`, `ina_date`, `ina_duration`, `ina_context`

**Exemple - Vidéo INA du Colonel Rémy:**

```typescript
const archive: Archive = {
  id: "uuid-archive-ina-1",
  title: "Interview du Colonel Rémy - JT de 20h",
  description: "Interview télévisée sur son rôle dans la Résistance",
  archive_type: "video_ina",
  original_date: "1975-05-08",
  related_member_ids: ["uuid-colonel-remy"],
  media_url: "https://cdn.decker.fr/ina/interview-1975.mp4",
  ina_reference: "INA-REF-123456",
  ina_date: "1975-05-08",
  ina_duration: 1200, // 20 minutes
  ina_context: "Commémoration du 30ᵉ anniversaire de la fin de la Seconde Guerre mondiale",
  restoration_status: "original",
  source: "Institut National de l'Audiovisuel (INA)",
  is_public: true,
  created_at: "2025-01-13T10:00:00Z",
  updated_at: "2025-01-13T10:00:00Z"
};
```

---

## Témoignages

### Structure: `Testimony`

Représente les témoignages et récits personnels.

**Types de témoignages:**

```typescript
type TestimonyType = 'written' | 'audio' | 'video' | 'interview';

type TestimonyCategory =
  | 'family_memory'      // Souvenirs familiaux
  | 'historical_event'   // Événements historiques
  | 'colonel_remy'       // Colonel Rémy
  | 'anecdote'          // Anecdotes
  | 'tradition'         // Traditions familiales
  | 'other';
```

**Champs clés:**

- Auteur: `author_id`
- Sujets: `about_member_ids[]`
- Contenu: `content`, `audio_url`, `video_url`, `transcript`
- Période: `about_period`, `about_year`

---

## Portraits

### Structure: `MemberPortrait`

Portraits détaillés des membres marquants de la famille.

**Rôles significatifs:**

```typescript
type SignificantRole =
  | 'family_founder'     // Fondateur de la lignée
  | 'war_hero'          // Héros de guerre (Colonel Rémy)
  | 'artist'            // Artiste
  | 'scholar'           // Érudit
  | 'entrepreneur'      // Entrepreneur
  | 'community_leader'  // Leader communautaire
  | 'other';
```

**Champs spéciaux pour Colonel Rémy:**

- `is_colonel_remy`: boolean
- `resistance_activities`: description des activités
- `decorations[]`: décorations militaires

**Dates clés:**

```typescript
key_dates: [
  {
    date: "1940-07-01",
    event: "Création du réseau CND",
    importance: "high"
  },
  // ...
]
```

---

## Sources et Méthodologie

### Sources: `Source`

Représente les sources documentaires utilisées.

**Types de sources:**

```typescript
type SourceType =
  | 'archive_nationale'      // Archives nationales
  | 'archive_departementale' // Archives départementales
  | 'ina'                    // Institut National de l'Audiovisuel
  | 'military_archive'       // Archives militaires
  | 'family_document'        // Document familial
  | 'oral_testimony'         // Témoignage oral
  | 'publication'            // Publication
  | 'website'                // Site web
  | 'other';
```

**Fiabilité:**

```typescript
type ReliabilityLevel = 'high' | 'medium' | 'low' | 'unverified';
```

**Permissions:**

- `has_permission`: autorisation obtenue
- `permission_notes`: notes sur les autorisations
- `copyright_info`: informations de copyright

### Méthodologie: `ResearchMethodology`

Documente la méthodologie de recherche.

**Structure:**

- `steps[]`: étapes de la méthodologie
- `tools_used[]`: outils utilisés
- `archives_consulted[]`: archives consultées
- `bibliography[]`: références bibliographiques
- `contributors[]`: contributeurs

---

## Relations entre Entités

### Diagramme de Relations

```
FamilyMember
    ├─→ HistoricalEvent (involved_member_ids)
    ├─→ ArtisticCreation (author_id, collaborators_ids)
    ├─→ Archive (related_member_ids)
    ├─→ Testimony (author_id, about_member_ids)
    ├─→ MemberPortrait (member_id)
    └─→ Source (related_member_ids)

HistoricalEvent
    ├─→ FamilyMember (involved_member_ids)
    └─→ Source (related_event_ids)

Archive
    ├─→ FamilyMember (related_member_ids)
    └─→ Source (related_archive_ids)

MemberPortrait
    └─→ FamilyMember (member_id, important_relationships)
```

### Relations Many-to-Many

- **FamilyMember ↔ HistoricalEvent**: un événement peut impliquer plusieurs membres
- **FamilyMember ↔ ArtisticCreation**: collaborations artistiques
- **Source ↔ [Multiple Entities]**: une source peut documenter plusieurs entités

---

## Implémentation Supabase

### Tables Recommandées

```sql
-- Membres de la famille
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  maiden_name TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'unknown')),
  birth_date DATE,
  death_date DATE,
  life_status TEXT CHECK (life_status IN ('alive', 'deceased', 'unknown')),
  father_id UUID REFERENCES family_members(id),
  mother_id UUID REFERENCES family_members(id),
  biography TEXT,
  is_prominent BOOLEAN DEFAULT false,
  generation INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Relations familiales
CREATE TABLE family_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  to_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL,
  notes TEXT,
  UNIQUE(from_member_id, to_member_id, relation_type)
);

-- Événements historiques
CREATE TABLE historical_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  historical_period TEXT CHECK (historical_period IN
    ('origines', 'xixe', 'xxe', 'apres_guerre', 'actuelle')),
  event_date DATE,
  location TEXT,
  importance_level TEXT CHECK (importance_level IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table pour événements-membres
CREATE TABLE event_members (
  event_id UUID REFERENCES historical_events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, member_id)
);

-- Créations artistiques
CREATE TABLE artistic_creations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  creation_type TEXT CHECK (creation_type IN
    ('music', 'photography', 'painting', 'drawing', 'video', 'text')),
  author_id UUID REFERENCES family_members(id),
  year INTEGER,
  media_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Métadonnées musicales
CREATE TABLE music_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,
  music_type TEXT,
  duration INTEGER,
  beatmaker TEXT,
  producer TEXT,
  lyrics TEXT,
  audio_url TEXT
);

-- Archives
CREATE TABLE archives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  archive_type TEXT NOT NULL,
  original_date DATE,
  media_url TEXT,
  restoration_status TEXT DEFAULT 'original',
  ina_reference TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Témoignages
CREATE TABLE testimonies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  testimony_type TEXT CHECK (testimony_type IN
    ('written', 'audio', 'video', 'interview')),
  category TEXT,
  author_id UUID REFERENCES family_members(id),
  content TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portraits
CREATE TABLE member_portraits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID UNIQUE REFERENCES family_members(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  detailed_biography TEXT,
  is_colonel_remy BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sources
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  reliability_level TEXT CHECK (reliability_level IN
    ('high', 'medium', 'low', 'unverified')),
  has_permission BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Politiques RLS (Row Level Security)

```sql
-- Exemple: Accès public aux membres décédés, privé aux vivants
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public access to deceased members"
ON family_members FOR SELECT
USING (life_status = 'deceased' OR auth.role() = 'authenticated');

-- Créations publiques accessibles à tous
CREATE POLICY "Public creations visible to all"
ON artistic_creations FOR SELECT
USING (is_public = true);
```

---

## Utilisation des Types

### Import

```typescript
import type {
  FamilyMember,
  HistoricalEvent,
  MusicCreation,
  Archive,
  Testimony,
  MemberPortrait,
  Source
} from '@/types';
```

### Exemple d'utilisation

```typescript
// Récupérer un membre
const getMember = async (id: UUID): Promise<FamilyMember> => {
  const { data } = await supabase
    .from('family_members')
    .select('*')
    .eq('id', id)
    .single();

  return data as FamilyMember;
};

// Rechercher des événements par période
const getEventsByPeriod = async (
  period: HistoricalPeriod
): Promise<HistoricalEvent[]> => {
  const { data } = await supabase
    .from('historical_events')
    .select('*')
    .eq('historical_period', period)
    .order('event_date');

  return data as HistoricalEvent[];
};
```

---

## Bonnes Pratiques

### 1. IDs et Références

- Toujours utiliser des UUIDs pour les identifiants
- Maintenir l'intégrité référentielle avec les foreign keys
- Utiliser des index sur les champs fréquemment recherchés

### 2. Dates

- Stocker les dates au format ISO 8601
- Utiliser `is_approximate_date` pour les dates incertaines
- Stocker `approximate_year` quand la date exacte n'est pas connue

### 3. Médias

- Stocker uniquement les URLs, pas les fichiers binaires
- Utiliser un CDN (Cloudinary, Supabase Storage) pour les médias
- Maintenir `original_url` et `restored_url` pour les archives

### 4. Permissions et Visibilité

- Utiliser `is_public` pour contrôler la visibilité
- Implémenter RLS pour la sécurité au niveau base de données
- Documenter `has_permission` pour les sources externes (INA)

### 5. Métadonnées

- Toujours inclure `created_at` et `updated_at`
- Utiliser `tags[]` pour la recherche et le filtrage
- Documenter `sources[]` pour la traçabilité

---

**Version**: 1.0
**Dernière mise à jour**: 2025-01-13
**Auteur**: Équipe DECKER
