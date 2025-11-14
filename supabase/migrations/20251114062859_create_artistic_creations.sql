/*
  # Création des tables pour les créations artistiques
  
  1. Nouvelles tables
    - `artistic_creations` - Table principale pour toutes les créations artistiques
      - `id` (uuid, primary key)
      - `title`, `description`
      - `creation_type` (music/photography/painting/drawing/video/text)
      - `author_id` (référence vers family_members)
      - `creation_date`, `publication_date`, `year`
      - `media_url`, `preview_url`, `thumbnail_url`
      - `tags`, `is_featured`, `is_public`
    
    - `creation_collaborators` - Junction table pour les collaborateurs
      - `creation_id`, `member_id` (clés composites)
      - `role` (rôle du collaborateur)
    
    - `music_metadata` - Métadonnées spécifiques pour la musique
      - `creation_id` (clé primaire, référence vers artistic_creations)
      - `music_type` (album/single/demo/archive/collaboration)
      - `duration`, `beatmaker`, `producer`, `lyrics`, `anecdotes`
      - `audio_url`, `album_name`, `track_number`
    
    - `photography_metadata` - Métadonnées pour les photographies
      - `location`, `camera`, `lens`
      - `aperture`, `shutter_speed`, `iso`
      - `series_name`, `image_url`, `high_res_url`
    
    - `painting_metadata` - Métadonnées pour peintures et dessins
      - `art_type` (painting/drawing)
      - `medium`, `technique`
      - `width`, `height`, `dimension_unit`
      - `image_url`, `high_res_url`
    
    - `video_metadata` - Métadonnées pour les vidéos
      - `video_type` (short_film/documentary/montage/capture/other)
      - `duration`, `credits`
      - `video_url`, `thumbnail_url`
    
    - `text_metadata` - Métadonnées pour les textes littéraires
      - `text_type` (poem/autobiography/philosophy/essay/novel/short_story/other)
      - `content`, `excerpt`, `word_count`
      - `language`, `pdf_url`
  
  2. Sécurité
    - RLS sera activé dans une migration séparée
  
  3. Index
    - Index sur creation_type, author_id, year pour artistic_creations
    - Index sur is_featured, is_public
    - Index sur series_name pour photographies
    - Index sur text_type pour textes
*/

-- ============================================================================
-- TABLE: artistic_creations
-- ============================================================================
CREATE TABLE IF NOT EXISTS artistic_creations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  title TEXT NOT NULL,
  description TEXT,
  creation_type TEXT NOT NULL CHECK (creation_type IN (
    'music', 'photography', 'painting', 'drawing', 'video', 'text'
  )),
  
  author_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  
  creation_date DATE,
  publication_date DATE,
  year INTEGER,
  
  media_url TEXT,
  preview_url TEXT,
  thumbnail_url TEXT,
  
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artistic_creations_type ON artistic_creations(creation_type);
CREATE INDEX IF NOT EXISTS idx_artistic_creations_author ON artistic_creations(author_id);
CREATE INDEX IF NOT EXISTS idx_artistic_creations_year ON artistic_creations(year);
CREATE INDEX IF NOT EXISTS idx_artistic_creations_is_featured ON artistic_creations(is_featured);
CREATE INDEX IF NOT EXISTS idx_artistic_creations_is_public ON artistic_creations(is_public);

-- ============================================================================
-- TABLE: creation_collaborators (Junction table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS creation_collaborators (
  creation_id UUID REFERENCES artistic_creations(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (creation_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_creation_collaborators_creation ON creation_collaborators(creation_id);
CREATE INDEX IF NOT EXISTS idx_creation_collaborators_member ON creation_collaborators(member_id);

-- ============================================================================
-- TABLE: music_metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS music_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,
  
  music_type TEXT CHECK (music_type IN ('album', 'single', 'demo', 'archive', 'collaboration')),
  
  duration INTEGER,
  beatmaker TEXT,
  producer TEXT,
  lyrics TEXT,
  anecdotes TEXT,
  audio_url TEXT,
  
  album_name TEXT,
  track_number INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: photography_metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS photography_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,
  
  location TEXT,
  camera TEXT,
  lens TEXT,
  
  aperture TEXT,
  shutter_speed TEXT,
  iso INTEGER,
  
  series_name TEXT,
  image_url TEXT,
  high_res_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_photography_series ON photography_metadata(series_name);

-- ============================================================================
-- TABLE: painting_metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS painting_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,
  
  art_type TEXT CHECK (art_type IN ('painting', 'drawing')),
  
  medium TEXT,
  technique TEXT,
  
  width DECIMAL(10, 2),
  height DECIMAL(10, 2),
  dimension_unit TEXT CHECK (dimension_unit IN ('cm', 'in')) DEFAULT 'cm',
  
  image_url TEXT,
  high_res_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: video_metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS video_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,
  
  video_type TEXT CHECK (video_type IN ('short_film', 'documentary', 'montage', 'capture', 'other')),
  
  duration INTEGER,
  credits TEXT,
  
  video_url TEXT,
  thumbnail_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: text_metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS text_metadata (
  creation_id UUID PRIMARY KEY REFERENCES artistic_creations(id) ON DELETE CASCADE,
  
  text_type TEXT CHECK (text_type IN (
    'poem', 'autobiography', 'philosophy', 'essay', 'novel', 'short_story', 'other'
  )),
  
  content TEXT,
  excerpt TEXT,
  word_count INTEGER,
  
  language TEXT DEFAULT 'fr',
  pdf_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_text_metadata_type ON text_metadata(text_type);

-- ============================================================================
-- Triggers
-- ============================================================================
CREATE TRIGGER update_artistic_creations_updated_at BEFORE UPDATE ON artistic_creations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();