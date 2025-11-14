-- Migration: Configuration des politiques RLS (Row Level Security)
-- Date: 2025-01-13
-- Description: Politiques de sécurité pour contrôler l'accès aux données

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
-- POLITIQUES POUR family_members
-- ============================================================================

-- Lecture publique des membres décédés et des membres marquants
CREATE POLICY "Public access to deceased or prominent members"
ON family_members FOR SELECT
USING (
  is_public OR
  life_status = 'deceased' OR
  is_prominent = TRUE OR
  auth.role() = 'authenticated'
);

-- Les administrateurs peuvent tout faire
CREATE POLICY "Admins can do everything on family_members"
ON family_members FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- Insertion uniquement pour les administrateurs
CREATE POLICY "Only admins can insert family_members"
ON family_members FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Mise à jour uniquement pour les administrateurs
CREATE POLICY "Only admins can update family_members"
ON family_members FOR UPDATE
USING (auth.jwt() ->> 'role' = 'admin');

-- Suppression uniquement pour les administrateurs
CREATE POLICY "Only admins can delete family_members"
ON family_members FOR DELETE
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR family_relations
-- ============================================================================

-- Lecture publique des relations
CREATE POLICY "Public can view family_relations"
ON family_relations FOR SELECT
USING (true);

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify family_relations"
ON family_relations FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR historical_events
-- ============================================================================

-- Lecture publique des événements publics
CREATE POLICY "Public can view public events"
ON historical_events FOR SELECT
USING (is_public = TRUE OR auth.role() = 'authenticated');

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify historical_events"
ON historical_events FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR event_members
-- ============================================================================

-- Lecture publique
CREATE POLICY "Public can view event_members"
ON event_members FOR SELECT
USING (true);

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify event_members"
ON event_members FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR artistic_creations
-- ============================================================================

-- Lecture publique des créations publiques
CREATE POLICY "Public can view public creations"
ON artistic_creations FOR SELECT
USING (is_public = TRUE OR auth.role() = 'authenticated');

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify artistic_creations"
ON artistic_creations FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR creation_collaborators
-- ============================================================================

-- Lecture publique
CREATE POLICY "Public can view creation_collaborators"
ON creation_collaborators FOR SELECT
USING (true);

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify creation_collaborators"
ON creation_collaborators FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR metadata tables (music, photography, painting, video, text)
-- ============================================================================

-- Music metadata
CREATE POLICY "Public can view music_metadata"
ON music_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify music_metadata"
ON music_metadata FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- Photography metadata
CREATE POLICY "Public can view photography_metadata"
ON photography_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify photography_metadata"
ON photography_metadata FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- Painting metadata
CREATE POLICY "Public can view painting_metadata"
ON painting_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify painting_metadata"
ON painting_metadata FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- Video metadata
CREATE POLICY "Public can view video_metadata"
ON video_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify video_metadata"
ON video_metadata FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- Text metadata
CREATE POLICY "Public can view text_metadata"
ON text_metadata FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify text_metadata"
ON text_metadata FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR archives
-- ============================================================================

-- Lecture publique des archives publiques
CREATE POLICY "Public can view public archives"
ON archives FOR SELECT
USING (is_public = TRUE OR auth.role() = 'authenticated');

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify archives"
ON archives FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR archive_members
-- ============================================================================

CREATE POLICY "Public can view archive_members"
ON archive_members FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify archive_members"
ON archive_members FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR testimonies
-- ============================================================================

-- Lecture publique des témoignages publics
CREATE POLICY "Public can view public testimonies"
ON testimonies FOR SELECT
USING (is_public = TRUE OR auth.role() = 'authenticated');

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify testimonies"
ON testimonies FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR testimony_about_members
-- ============================================================================

CREATE POLICY "Public can view testimony_about_members"
ON testimony_about_members FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify testimony_about_members"
ON testimony_about_members FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR member_portraits
-- ============================================================================

-- Lecture publique des portraits featured ou de membres décédés
CREATE POLICY "Public can view featured portraits"
ON member_portraits FOR SELECT
USING (
  is_featured = TRUE OR
  auth.role() = 'authenticated' OR
  EXISTS (
    SELECT 1 FROM family_members fm
    WHERE fm.id = member_portraits.member_id
    AND fm.life_status = 'deceased'
  )
);

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify member_portraits"
ON member_portraits FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR portrait_key_dates, portrait_relationships
-- ============================================================================

CREATE POLICY "Public can view portrait_key_dates"
ON portrait_key_dates FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify portrait_key_dates"
ON portrait_key_dates FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view portrait_relationships"
ON portrait_relationships FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify portrait_relationships"
ON portrait_relationships FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR sources
-- ============================================================================

-- Lecture publique
CREATE POLICY "Public can view sources"
ON sources FOR SELECT
USING (true);

-- Modification uniquement pour les administrateurs
CREATE POLICY "Only admins can modify sources"
ON sources FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR source_relations
-- ============================================================================

CREATE POLICY "Public can view source_relations"
ON source_relations FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify source_relations"
ON source_relations FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- POLITIQUES POUR research_methodology et tables associées
-- ============================================================================

CREATE POLICY "Public can view research_methodology"
ON research_methodology FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify research_methodology"
ON research_methodology FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view methodology_steps"
ON methodology_steps FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify methodology_steps"
ON methodology_steps FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view methodology_bibliography"
ON methodology_bibliography FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify methodology_bibliography"
ON methodology_bibliography FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view methodology_contributors"
ON methodology_contributors FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify methodology_contributors"
ON methodology_contributors FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- Commentaires sur la sécurité
-- ============================================================================
COMMENT ON POLICY "Public access to deceased or prominent members" ON family_members IS
'Permet au public de voir les membres décédés ou marquants, auth nécessaire pour les vivants';

COMMENT ON POLICY "Public can view public events" ON historical_events IS
'Seuls les événements marqués comme publics sont visibles sans authentification';

COMMENT ON POLICY "Public can view public creations" ON artistic_creations IS
'Seules les créations marquées comme publiques sont visibles sans authentification';

COMMENT ON POLICY "Public can view public archives" ON archives IS
'Seules les archives marquées comme publiques sont visibles sans authentification';

COMMENT ON POLICY "Public can view public testimonies" ON testimonies IS
'Seuls les témoignages marqués comme publics sont visibles sans authentification';
