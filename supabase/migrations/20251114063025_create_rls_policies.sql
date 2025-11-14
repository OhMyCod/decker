/*
  # Configuration des politiques RLS (Row Level Security)
  
  1. Activation RLS
    - RLS activé sur toutes les tables du schéma
  
  2. Politiques de lecture (SELECT)
    - `family_members` : Public pour membres décédés/marquants, authentifié pour vivants
    - `historical_events` : Public pour événements publics
    - `artistic_creations` : Public pour créations publiques
    - `archives` : Public pour archives publiques
    - `testimonies` : Public pour témoignages publics
    - `member_portraits` : Public pour portraits marqués
    - Tables de jonction et métadonnées : Public
    - `sources`, `research_methodology` : Public
  
  3. Politiques d'écriture (INSERT/UPDATE/DELETE)
    - TOUTES les écritures réservées aux administrateurs
    - Vérification via auth.jwt() ->> 'role' = 'admin'
  
  4. Notes importantes
    - Les politiques utilisent is_public pour contrôler la visibilité
    - Les membres décédés sont considérés comme publics
    - Les administrateurs ont un accès complet à toutes les tables
*/

-- ============================================================================
-- Activer RLS sur toutes les tables
-- ============================================================================
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE artistic_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE creation_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE photography_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE painting_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE text_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE archive_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimony_about_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_portraits ENABLE ROW LEVEL SECURITY;
ALTER TABLE portrait_key_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE portrait_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_methodology ENABLE ROW LEVEL SECURITY;
ALTER TABLE methodology_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE methodology_bibliography ENABLE ROW LEVEL SECURITY;
ALTER TABLE methodology_contributors ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- family_members
-- ============================================================================
CREATE POLICY "Public can view deceased or prominent members"
ON family_members FOR SELECT
USING (life_status = 'deceased' OR is_prominent = TRUE);

CREATE POLICY "Authenticated users can view all members"
ON family_members FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can insert members"
ON family_members FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update members"
ON family_members FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete members"
ON family_members FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- family_relations
-- ============================================================================
CREATE POLICY "Public can view family_relations"
ON family_relations FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify family_relations"
ON family_relations FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- historical_events
-- ============================================================================
CREATE POLICY "Public can view public events"
ON historical_events FOR SELECT
USING (is_public = TRUE);

CREATE POLICY "Authenticated users can view all events"
ON historical_events FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify historical_events"
ON historical_events FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- event_members
-- ============================================================================
CREATE POLICY "Public can view event_members"
ON event_members FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify event_members"
ON event_members FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- artistic_creations
-- ============================================================================
CREATE POLICY "Public can view public creations"
ON artistic_creations FOR SELECT
USING (is_public = TRUE);

CREATE POLICY "Authenticated users can view all creations"
ON artistic_creations FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify artistic_creations"
ON artistic_creations FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- creation_collaborators
-- ============================================================================
CREATE POLICY "Public can view creation_collaborators"
ON creation_collaborators FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify creation_collaborators"
ON creation_collaborators FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- Metadata tables (public reading, admin writing)
-- ============================================================================
CREATE POLICY "Public can view music_metadata"
ON music_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify music_metadata"
ON music_metadata FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view photography_metadata"
ON photography_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify photography_metadata"
ON photography_metadata FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view painting_metadata"
ON painting_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify painting_metadata"
ON painting_metadata FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view video_metadata"
ON video_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify video_metadata"
ON video_metadata FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view text_metadata"
ON text_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify text_metadata"
ON text_metadata FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- archives
-- ============================================================================
CREATE POLICY "Public can view public archives"
ON archives FOR SELECT
USING (is_public = TRUE);

CREATE POLICY "Authenticated users can view all archives"
ON archives FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify archives"
ON archives FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- archive_members
-- ============================================================================
CREATE POLICY "Public can view archive_members"
ON archive_members FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify archive_members"
ON archive_members FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- testimonies
-- ============================================================================
CREATE POLICY "Public can view public testimonies"
ON testimonies FOR SELECT
USING (is_public = TRUE);

CREATE POLICY "Authenticated users can view all testimonies"
ON testimonies FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify testimonies"
ON testimonies FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- testimony_about_members
-- ============================================================================
CREATE POLICY "Public can view testimony_about_members"
ON testimony_about_members FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify testimony_about_members"
ON testimony_about_members FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- member_portraits
-- ============================================================================
CREATE POLICY "Public can view featured portraits"
ON member_portraits FOR SELECT
USING (is_featured = TRUE);

CREATE POLICY "Authenticated users can view all portraits"
ON member_portraits FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify member_portraits"
ON member_portraits FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- portrait_key_dates
-- ============================================================================
CREATE POLICY "Public can view portrait_key_dates"
ON portrait_key_dates FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify portrait_key_dates"
ON portrait_key_dates FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- portrait_relationships
-- ============================================================================
CREATE POLICY "Public can view portrait_relationships"
ON portrait_relationships FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify portrait_relationships"
ON portrait_relationships FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- sources
-- ============================================================================
CREATE POLICY "Public can view sources"
ON sources FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify sources"
ON sources FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- source_relations
-- ============================================================================
CREATE POLICY "Public can view source_relations"
ON source_relations FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify source_relations"
ON source_relations FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- research_methodology
-- ============================================================================
CREATE POLICY "Public can view research_methodology"
ON research_methodology FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify research_methodology"
ON research_methodology FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- methodology_steps
-- ============================================================================
CREATE POLICY "Public can view methodology_steps"
ON methodology_steps FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify methodology_steps"
ON methodology_steps FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- methodology_bibliography
-- ============================================================================
CREATE POLICY "Public can view methodology_bibliography"
ON methodology_bibliography FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify methodology_bibliography"
ON methodology_bibliography FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- methodology_contributors
-- ============================================================================
CREATE POLICY "Public can view methodology_contributors"
ON methodology_contributors FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify methodology_contributors"
ON methodology_contributors FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');