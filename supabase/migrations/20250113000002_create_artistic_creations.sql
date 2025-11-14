-- Migration: Création des tables pour les créations artistiques
-- Date: 2025-01-13
-- Description: Tables pour musique, photos, peintures, vidéos, textes

-- ============================================================================
-- TABLE: artistic_creations
-- Description: Table principale pour toutes les créations artistiques
-- ============================================================================
CREATE TABLE IF NOT EXISTS artistic_creations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations de base
  title TEXT NOT NULL,
  description TEXT,
  creation_type TEXT NOT NULL CHECK (creation_type IN (
    'music', 'photography', 'painting', 'drawing', 'video', 'text'
  )),

  -- Auteur et collaborateurs
  author_id UUID REFERENCES family_members(id) ON DELETE SET NULL,

  -- Dates
  creation_date DATE,
  publication_date DATE,
  year INTEGER,

  -- Médias
  media_url TEXT,
  preview_url TEXT,
  thumbnail_url TEXT,

  -- Métadonnées
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_artistic_creations_type ON artistic_creations(creation_type);
CREATE INDEX idx_artistic_creations_author ON artistic_creations(author_id);
CREATE INDEX idx_artistic_creations_year ON artistic_creations(year);
CREATE INDEX idx_artistic_creations_is_featured ON artistic_creations(is_featured);
CREATE INDEX idx_artistic_creations_is_public ON artistic_creations(is_public);

-- ============================================================================
-- TABLE: creation_collaborators (Junction table)
-- Description: Collaborateurs sur les créations artistiques
-- ============================================================================
CREATE TABLE IF NOT EXISTS creation_collaborators (
  creation_id UUID REFERENCES artistic_creations(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  role TEXT, -- Role du collaborateur
  created_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (creation_id, member_id)
);

CREATE INDEX idx_creation_collaborators_creation ON creation_collaborators(creation_id);
CREATE INDEX idx_creation_collaborators_member ON creation_collaborators(member_id);

-- ============================================================================
-- TABLE: music_metadata
-- Description: Métadonnées spécifiques pour les créations musicales
-- ============================================================================
CREATE TABLE IF NOT EXISTS music_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,

  -- Type de musique
  music_type TEXT CHECK (music_type IN ('album', 'single', 'demo', 'archive', 'collaboration')),

  -- Métadonnées musicales
  duration INTEGER, -- Durée en secondes
  beatmaker TEXT,
  producer TEXT,
  lyrics TEXT,
  anecdotes TEXT,
  audio_url TEXT,

  -- Album/Collection
  album_name TEXT,
  track_number INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: photography_metadata
-- Description: Métadonnées spécifiques pour les photographies
-- ============================================================================
CREATE TABLE IF NOT EXISTS photography_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,

  -- Lieu et contexte
  location TEXT,
  camera TEXT,
  lens TEXT,

  -- Paramètres de prise de vue
  aperture TEXT,
  shutter_speed TEXT,
  iso INTEGER,

  -- Organisation
  series_name TEXT,
  image_url TEXT,
  high_res_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_photography_series ON photography_metadata(series_name);

-- ============================================================================
-- TABLE: painting_metadata
-- Description: Métadonnées spécifiques pour peintures et dessins
-- ============================================================================
CREATE TABLE IF NOT EXISTS painting_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,

  -- Type (painting ou drawing)
  art_type TEXT CHECK (art_type IN ('painting', 'drawing')),

  -- Métadonnées artistiques
  medium TEXT, -- huile, aquarelle, crayon, etc.
  technique TEXT,

  -- Dimensions
  width DECIMAL(10, 2),
  height DECIMAL(10, 2),
  dimension_unit TEXT CHECK (dimension_unit IN ('cm', 'in')) DEFAULT 'cm',

  -- Images
  image_url TEXT,
  high_res_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: video_metadata
-- Description: Métadonnées spécifiques pour les vidéos
-- ============================================================================
CREATE TABLE IF NOT EXISTS video_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,

  -- Type de vidéo
  video_type TEXT CHECK (video_type IN ('short_film', 'documentary', 'montage', 'capture', 'other')),

  -- Métadonnées
  duration INTEGER, -- Durée en secondes
  credits TEXT,

  -- URLs
  video_url TEXT,
  thumbnail_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: text_metadata
-- Description: Métadonnées spécifiques pour les textes littéraires
-- ============================================================================
CREATE TABLE IF NOT EXISTS text_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,

  -- Type de texte
  text_type TEXT CHECK (text_type IN (
    'poem', 'autobiography', 'philosophy', 'essay', 'novel', 'short_story', 'other'
  )),

  -- Contenu
  content TEXT,
  excerpt TEXT,
  word_count INTEGER,

  -- Langue et format
  language TEXT DEFAULT 'fr',
  pdf_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_text_metadata_type ON text_metadata(text_type);

-- ============================================================================
-- Triggers pour updated_at
-- ============================================================================
CREATE TRIGGER update_artistic_creations_updated_at BEFORE UPDATE ON artistic_creations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Commentaires
-- ============================================================================
COMMENT ON TABLE artistic_creations IS 'Créations artistiques de la famille (musique, photo, peinture, vidéo, texte)';
COMMENT ON TABLE music_metadata IS 'Métadonnées spécifiques pour les créations musicales';
COMMENT ON TABLE photography_metadata IS 'Métadonnées pour les photographies modernes et contemporaines';
COMMENT ON TABLE painting_metadata IS 'Métadonnées pour les peintures et dessins';
COMMENT ON TABLE video_metadata IS 'Métadonnées pour les vidéos créatives';
COMMENT ON TABLE text_metadata IS 'Métadonnées pour les textes littéraires';
