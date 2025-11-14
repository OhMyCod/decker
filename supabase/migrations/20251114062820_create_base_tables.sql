/*
  # Création des tables de base pour la famille DECKER
  
  1. Nouvelles tables
    - `family_members` - Membres de la famille avec informations généalogiques
      - `id` (uuid, primary key)
      - `first_name`, `last_name`, `maiden_name`, `nickname`
      - `gender` (male/female/other/unknown)
      - `birth_date`, `birth_place`, `death_date`, `death_place`, `life_status`
      - `father_id`, `mother_id` (références vers family_members)
      - `biography`, `occupation`, `education`, `achievements`
      - `profile_photo_url`, `photos_urls`
      - `is_prominent`, `generation`
    
    - `family_relations` - Relations familiales complexes (many-to-many)
      - `id` (uuid, primary key)
      - `from_member_id`, `to_member_id` (références vers family_members)
      - `relation_type` (parent/child/spouse/sibling/grandparent/etc.)
      - `notes`
    
    - `historical_events` - Événements historiques marquants
      - `id` (uuid, primary key)
      - `title`, `description`
      - `event_type` (birth/death/marriage/military/etc.)
      - `historical_period` (origines/xixe/xxe/apres_guerre/actuelle)
      - `event_date`, `start_date`, `end_date`, `is_approximate_date`
      - `location`, `latitude`, `longitude`
      - `historical_context`, `sources`
      - `photos_urls`, `documents_urls`
      - `importance_level` (low/medium/high)
      - `is_public`
    
    - `event_members` - Junction table entre événements et membres
      - `event_id`, `member_id` (clés primaires composites)
      - `role` (rôle dans l'événement)
  
  2. Sécurité
    - RLS sera activé dans une migration séparée
  
  3. Index
    - Index sur last_name, life_status, is_prominent pour family_members
    - Index sur father_id, mother_id pour recherches généalogiques
    - Index sur historical_period, event_type, event_date pour événements
    - Index sur les tables de jonction
  
  4. Fonctions
    - Fonction update_updated_at_column() pour mise à jour automatique des timestamps
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: family_members
-- ============================================================================
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  maiden_name TEXT,
  nickname TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'unknown')) DEFAULT 'unknown',
  
  birth_date DATE,
  birth_place TEXT,
  death_date DATE,
  death_place TEXT,
  life_status TEXT CHECK (life_status IN ('alive', 'deceased', 'unknown')) DEFAULT 'unknown',
  
  father_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  mother_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  
  biography TEXT,
  occupation TEXT,
  education TEXT,
  achievements TEXT[],
  
  profile_photo_url TEXT,
  photos_urls TEXT[],
  
  is_prominent BOOLEAN DEFAULT FALSE,
  generation INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_family_members_last_name ON family_members(last_name);
CREATE INDEX IF NOT EXISTS idx_family_members_life_status ON family_members(life_status);
CREATE INDEX IF NOT EXISTS idx_family_members_is_prominent ON family_members(is_prominent);
CREATE INDEX IF NOT EXISTS idx_family_members_father_id ON family_members(father_id);
CREATE INDEX IF NOT EXISTS idx_family_members_mother_id ON family_members(mother_id);

-- ============================================================================
-- TABLE: family_relations
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
  
  UNIQUE(from_member_id, to_member_id, relation_type)
);

CREATE INDEX IF NOT EXISTS idx_family_relations_from ON family_relations(from_member_id);
CREATE INDEX IF NOT EXISTS idx_family_relations_to ON family_relations(to_member_id);
CREATE INDEX IF NOT EXISTS idx_family_relations_type ON family_relations(relation_type);

-- ============================================================================
-- TABLE: historical_events
-- ============================================================================
CREATE TABLE IF NOT EXISTS historical_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
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
  
  event_date DATE,
  start_date DATE,
  end_date DATE,
  is_approximate_date BOOLEAN DEFAULT FALSE,
  
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  historical_context TEXT,
  sources TEXT[],
  
  photos_urls TEXT[],
  documents_urls TEXT[],
  
  importance_level TEXT CHECK (importance_level IN ('low', 'medium', 'high')) DEFAULT 'medium',
  is_public BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_historical_events_period ON historical_events(historical_period);
CREATE INDEX IF NOT EXISTS idx_historical_events_type ON historical_events(event_type);
CREATE INDEX IF NOT EXISTS idx_historical_events_date ON historical_events(event_date);
CREATE INDEX IF NOT EXISTS idx_historical_events_importance ON historical_events(importance_level);

-- ============================================================================
-- TABLE: event_members (Junction table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS event_members (
  event_id UUID REFERENCES historical_events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (event_id, member_id)
);

CREATE INDEX IF NOT EXISTS idx_event_members_event ON event_members(event_id);
CREATE INDEX IF NOT EXISTS idx_event_members_member ON event_members(member_id);

-- ============================================================================
-- FUNCTION: update_updated_at_column
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historical_events_updated_at BEFORE UPDATE ON historical_events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();