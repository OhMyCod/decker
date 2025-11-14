/*
  # Création des tables pour archives, témoignages, portraits et sources
  
  1. Nouvelles tables
    - `archives` - Archives et documents familiaux
      - `id` (uuid, primary key)
      - `title`, `description`
      - `archive_type` (photo/video_ina/letter/official_document/journal/notebook/manuscript/certificate/other)
      - `original_date`, `approximate_year`, `location`
      - `media_url`, `original_url`, `restored_url`, `transcription`
      - `restoration_status` (original/restored/in_progress/needed)
      - `restoration_notes`, `source`, `archive_reference`
      - `ina_reference`, `ina_date`, `ina_duration`, `ina_context`
      - `tags`, `is_public`
    
    - `archive_members` - Junction table entre archives et membres
    
    - `testimonies` - Témoignages et récits personnels
      - `id` (uuid, primary key)
      - `title`, `testimony_type` (written/audio/video/interview)
      - `category` (family_memory/historical_event/colonel_remy/anecdote/tradition/other)
      - `author_id`, `content`, `audio_url`, `video_url`, `transcript`
      - `testimony_date`, `about_period`, `about_year`, `context`, `location`
      - `photos_urls`, `is_public`, `is_featured`
    
    - `testimony_about_members` - Junction table témoignages/membres
    
    - `member_portraits` - Portraits détaillés des membres marquants
      - `id` (uuid, primary key)
      - `member_id` (référence vers family_members, unique)
      - `portrait_title`, `summary`, `detailed_biography`
      - `significant_roles`, `key_achievements`, `historical_impact`
      - `is_colonel_remy`, `resistance_activities`, `decorations`
      - `photos_gallery`, `documents_urls`, `letters_urls`, `voice_recordings_urls`, `video_urls`
      - `display_order`, `is_featured`
    
    - `portrait_key_dates` - Dates clés pour les portraits
    - `portrait_relationships` - Relations importantes pour les portraits
    
    - `sources` - Sources documentaires
      - `id` (uuid, primary key)
      - `title`, `source_type` (archive_nationale/archive_departementale/ina/military_archive/family_document/oral_testimony/publication/website/other)
      - `description`, `location`, `reference`, `url`
      - `author`, `publication_date`, `access_date`
      - `reliability_level` (high/medium/low/unverified)
      - `has_permission`, `permission_notes`, `copyright_info`
      - `research_notes`, `verification_method`
    
    - `source_relations` - Relations entre sources et entités
    
    - `research_methodology` - Documentation de la méthodologie
    - `methodology_steps` - Étapes de la méthodologie
    - `methodology_bibliography` - Bibliographie
    - `methodology_contributors` - Contributeurs
  
  2. Sécurité
    - RLS sera activé dans une migration séparée
  
  3. Index
    - Index sur archive_type, restoration_status pour archives
    - Index sur testimony_type, category, author_id pour témoignages
    - Index sur member_id, is_colonel_remy, display_order pour portraits
    - Index sur source_type, reliability_level pour sources
*/

-- ============================================================================
-- TABLE: archives
-- ============================================================================
CREATE TABLE IF NOT EXISTS archives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  title TEXT NOT NULL,
  description TEXT,
  archive_type TEXT NOT NULL CHECK (archive_type IN (
    'photo', 'video_ina', 'letter', 'official_document',
    'journal', 'notebook', 'manuscript', 'certificate', 'other'
  )),
  
  original_date DATE,
  approximate_year INTEGER,
  location TEXT,
  
  media_url TEXT,
  original_url TEXT,
  restored_url TEXT,
  transcription TEXT,
  
  restoration_status TEXT CHECK (restoration_status IN (
    'original', 'restored', 'in_progress', 'needed'
  )) DEFAULT 'original',
  restoration_notes TEXT,
  
  source TEXT,
  archive_reference TEXT,
  
  ina_reference TEXT,
  ina_date DATE,
  ina_duration INTEGER,
  ina_context TEXT,
  
  tags TEXT[],
  is_public BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_archives_type ON archives(archive_type);
CREATE INDEX IF NOT EXISTS idx_archives_restoration_status ON archives(restoration_status);
CREATE INDEX IF NOT EXISTS idx_archives_original_date ON archives(original_date);
CREATE INDEX IF NOT EXISTS idx_archives_is_public ON archives(is_public);

-- ============================================================================
-- TABLE: archive_members (Junction table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS archive_members (
  archive_id UUID REFERENCES archives(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (archive_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_archive_members_archive ON archive_members(archive_id);
CREATE INDEX IF NOT EXISTS idx_archive_members_member ON archive_members(member_id);

-- ============================================================================
-- TABLE: testimonies
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  title TEXT NOT NULL,
  testimony_type TEXT NOT NULL CHECK (testimony_type IN (
    'written', 'audio', 'video', 'interview'
  )),
  category TEXT CHECK (category IN (
    'family_memory', 'historical_event', 'colonel_remy',
    'anecdote', 'tradition', 'other'
  )),
  
  author_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  
  content TEXT,
  audio_url TEXT,
  video_url TEXT,
  transcript TEXT,
  
  testimony_date DATE,
  about_period TEXT CHECK (about_period IN (
    'origines', 'xixe', 'xxe', 'apres_guerre', 'actuelle'
  )),
  about_year INTEGER,
  context TEXT,
  location TEXT,
  
  photos_urls TEXT[],
  
  is_public BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonies_type ON testimonies(testimony_type);
CREATE INDEX IF NOT EXISTS idx_testimonies_category ON testimonies(category);
CREATE INDEX IF NOT EXISTS idx_testimonies_author ON testimonies(author_id);
CREATE INDEX IF NOT EXISTS idx_testimonies_period ON testimonies(about_period);
CREATE INDEX IF NOT EXISTS idx_testimonies_is_featured ON testimonies(is_featured);

-- ============================================================================
-- TABLE: testimony_about_members (Junction table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimony_about_members (
  testimony_id UUID REFERENCES testimonies(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (testimony_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_testimony_about_members_testimony ON testimony_about_members(testimony_id);
CREATE INDEX IF NOT EXISTS idx_testimony_about_members_member ON testimony_about_members(member_id);

-- ============================================================================
-- TABLE: member_portraits
-- ============================================================================
CREATE TABLE IF NOT EXISTS member_portraits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  member_id UUID UNIQUE NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  
  portrait_title TEXT,
  summary TEXT NOT NULL,
  detailed_biography TEXT,
  
  significant_roles TEXT[],
  key_achievements TEXT[],
  historical_impact TEXT,
  
  is_colonel_remy BOOLEAN DEFAULT FALSE,
  resistance_activities TEXT,
  decorations TEXT[],
  
  photos_gallery TEXT[],
  documents_urls TEXT[],
  letters_urls TEXT[],
  voice_recordings_urls TEXT[],
  video_urls TEXT[],
  
  display_order INTEGER,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_member_portraits_member ON member_portraits(member_id);
CREATE INDEX IF NOT EXISTS idx_member_portraits_is_featured ON member_portraits(is_featured);
CREATE INDEX IF NOT EXISTS idx_member_portraits_is_colonel_remy ON member_portraits(is_colonel_remy);
CREATE INDEX IF NOT EXISTS idx_member_portraits_display_order ON member_portraits(display_order);

-- ============================================================================
-- TABLE: portrait_key_dates
-- ============================================================================
CREATE TABLE IF NOT EXISTS portrait_key_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portrait_id UUID NOT NULL REFERENCES member_portraits(id) ON DELETE CASCADE,
  
  date DATE NOT NULL,
  event TEXT NOT NULL,
  importance TEXT CHECK (importance IN ('low', 'medium', 'high')) DEFAULT 'medium',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portrait_key_dates_portrait ON portrait_key_dates(portrait_id);
CREATE INDEX IF NOT EXISTS idx_portrait_key_dates_date ON portrait_key_dates(date);

-- ============================================================================
-- TABLE: portrait_relationships
-- ============================================================================
CREATE TABLE IF NOT EXISTS portrait_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portrait_id UUID NOT NULL REFERENCES member_portraits(id) ON DELETE CASCADE,
  related_member_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  relationship_description TEXT NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portrait_relationships_portrait ON portrait_relationships(portrait_id);
CREATE INDEX IF NOT EXISTS idx_portrait_relationships_member ON portrait_relationships(related_member_id);

-- ============================================================================
-- TABLE: sources
-- ============================================================================
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  title TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN (
    'archive_nationale', 'archive_departementale', 'ina', 'military_archive',
    'family_document', 'oral_testimony', 'publication', 'website', 'other'
  )),
  
  description TEXT,
  location TEXT,
  reference TEXT,
  url TEXT,
  
  author TEXT,
  publication_date DATE,
  access_date DATE,
  reliability_level TEXT CHECK (reliability_level IN (
    'high', 'medium', 'low', 'unverified'
  )) DEFAULT 'medium',
  
  has_permission BOOLEAN,
  permission_notes TEXT,
  copyright_info TEXT,
  
  research_notes TEXT,
  verification_method TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sources_type ON sources(source_type);
CREATE INDEX IF NOT EXISTS idx_sources_reliability ON sources(reliability_level);

-- ============================================================================
-- TABLE: source_relations
-- ============================================================================
CREATE TABLE IF NOT EXISTS source_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  
  entity_type TEXT CHECK (entity_type IN (
    'event', 'member', 'archive', 'testimony', 'creation'
  )),
  entity_id UUID NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_source_relations_source ON source_relations(source_id);
CREATE INDEX IF NOT EXISTS idx_source_relations_entity ON source_relations(entity_type, entity_id);

-- ============================================================================
-- TABLE: research_methodology
-- ============================================================================
CREATE TABLE IF NOT EXISTS research_methodology (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  title TEXT NOT NULL,
  description TEXT,
  
  tools_used TEXT[],
  archives_consulted TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: methodology_steps
-- ============================================================================
CREATE TABLE IF NOT EXISTS methodology_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  methodology_id UUID NOT NULL REFERENCES research_methodology(id) ON DELETE CASCADE,
  
  step_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_methodology_steps_methodology ON methodology_steps(methodology_id);
CREATE INDEX IF NOT EXISTS idx_methodology_steps_order ON methodology_steps(step_order);

-- ============================================================================
-- TABLE: methodology_bibliography
-- ============================================================================
CREATE TABLE IF NOT EXISTS methodology_bibliography (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  methodology_id UUID NOT NULL REFERENCES research_methodology(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  author TEXT,
  publication TEXT,
  year INTEGER,
  isbn TEXT,
  url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_methodology_bibliography_methodology ON methodology_bibliography(methodology_id);

-- ============================================================================
-- TABLE: methodology_contributors
-- ============================================================================
CREATE TABLE IF NOT EXISTS methodology_contributors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  methodology_id UUID NOT NULL REFERENCES research_methodology(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  role TEXT,
  contribution TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_methodology_contributors_methodology ON methodology_contributors(methodology_id);

-- ============================================================================
-- Triggers
-- ============================================================================
CREATE TRIGGER update_archives_updated_at BEFORE UPDATE ON archives
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonies_updated_at BEFORE UPDATE ON testimonies
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_member_portraits_updated_at BEFORE UPDATE ON member_portraits
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_methodology_updated_at BEFORE UPDATE ON research_methodology
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();