-- Migration: Création des tables de base pour la famille DECKER
-- Date: 2025-01-13
-- Description: Tables pour les membres de la famille, événements historiques, et relations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: family_members
-- Description: Membres de la famille avec informations généalogiques
-- ============================================================================
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identité
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  maiden_name TEXT,
  nickname TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'unknown')) DEFAULT 'unknown',

  -- Dates vitales
  birth_date DATE,
  birth_place TEXT,
  death_date DATE,
  death_place TEXT,
  life_status TEXT CHECK (life_status IN ('alive', 'deceased', 'unknown')) DEFAULT 'unknown',

  -- Relations généalogiques (références directes)
  father_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  mother_id UUID REFERENCES family_members(id) ON DELETE SET NULL,

  -- Informations biographiques
  biography TEXT,
  occupation TEXT,
  education TEXT,
  achievements TEXT[], -- Array of achievements

  -- Médias
  profile_photo_url TEXT,
  photos_urls TEXT[], -- Array of photo URLs

  -- Métadonnées
  is_prominent BOOLEAN DEFAULT FALSE,
  generation INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX idx_family_members_last_name ON family_members(last_name);
CREATE INDEX idx_family_members_life_status ON family_members(life_status);
CREATE INDEX idx_family_members_is_prominent ON family_members(is_prominent);
CREATE INDEX idx_family_members_father_id ON family_members(father_id);
CREATE INDEX idx_family_members_mother_id ON family_members(mother_id);

-- ============================================================================
-- TABLE: family_relations
-- Description: Relations familiales complexes (many-to-many)
-- ============================================================================
CREATE TABLE IF NOT EXISTS family_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_member_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  to_member_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL CHECK (relation_type IN (
    'parent', 'child', 'spouse', 'sibling',
    'grandparent', 'grandchild',
    'uncle_aunt', 'nephew_niece', 'cousin'
  )),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Contrainte unique pour éviter les doublons
  UNIQUE(from_member_id, to_member_id, relation_type)
);

-- Index pour les relations
CREATE INDEX idx_family_relations_from ON family_relations(from_member_id);
CREATE INDEX idx_family_relations_to ON family_relations(to_member_id);
CREATE INDEX idx_family_relations_type ON family_relations(relation_type);

-- ============================================================================
-- TABLE: historical_events
-- Description: Événements historiques de la famille
-- ============================================================================
CREATE TABLE IF NOT EXISTS historical_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations de base
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'birth', 'death', 'marriage', 'divorce',
    'migration', 'military', 'professional',
    'achievement', 'family_gathering', 'historical_context', 'other'
  )),
  historical_period TEXT CHECK (historical_period IN (
    'origines', 'xixe', 'xxe', 'apres_guerre', 'actuelle'
  )),

  -- Dates
  event_date DATE,
  start_date DATE,
  end_date DATE,
  is_approximate_date BOOLEAN DEFAULT FALSE,

  -- Lieu
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Contexte
  historical_context TEXT,
  sources TEXT[], -- Array of source references

  -- Médias
  photos_urls TEXT[],
  documents_urls TEXT[],

  -- Métadonnées
  importance_level TEXT CHECK (importance_level IN ('low', 'medium', 'high')) DEFAULT 'medium',
  is_public BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les événements
CREATE INDEX idx_historical_events_period ON historical_events(historical_period);
CREATE INDEX idx_historical_events_type ON historical_events(event_type);
CREATE INDEX idx_historical_events_date ON historical_events(event_date);
CREATE INDEX idx_historical_events_importance ON historical_events(importance_level);

-- ============================================================================
-- TABLE: event_members (Junction table)
-- Description: Lien many-to-many entre événements et membres
-- ============================================================================
CREATE TABLE IF NOT EXISTS event_members (
  event_id UUID REFERENCES historical_events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  role TEXT, -- Role dans l'événement (optionnel)
  created_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (event_id, member_id)
);

-- Index pour la table de jonction
CREATE INDEX idx_event_members_event ON event_members(event_id);
CREATE INDEX idx_event_members_member ON event_members(member_id);

-- ============================================================================
-- FUNCTION: Mise à jour automatique du timestamp updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historical_events_updated_at BEFORE UPDATE ON historical_events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Commentaires sur les tables
-- ============================================================================
COMMENT ON TABLE family_members IS 'Membres de la famille DECKER avec informations généalogiques';
COMMENT ON TABLE family_relations IS 'Relations familiales complexes entre membres';
COMMENT ON TABLE historical_events IS 'Événements historiques marquants de la famille';
COMMENT ON TABLE event_members IS 'Association entre événements et membres impliqués';
