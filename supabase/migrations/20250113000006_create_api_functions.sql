-- Migration: Création des fonctions API Supabase
-- Date: 2025-01-13
-- Description: Fonctions RPC pour requêtes courantes et recherche avancée

-- ============================================================================
-- FONCTION: Récupérer l'arbre généalogique d'un membre
-- ============================================================================
CREATE OR REPLACE FUNCTION get_family_tree(member_uuid UUID, depth_limit INTEGER DEFAULT 3)
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE,
  death_date DATE,
  life_status TEXT,
  generation INTEGER,
  relation_to_root TEXT,
  depth_level INTEGER
) AS $$
WITH RECURSIVE family_tree AS (
  -- Base: le membre de départ
  SELECT
    fm.id,
    fm.first_name,
    fm.last_name,
    fm.birth_date,
    fm.death_date,
    fm.life_status,
    fm.generation,
    'self'::TEXT AS relation_to_root,
    0 AS depth_level
  FROM family_members fm
  WHERE fm.id = member_uuid

  UNION ALL

  -- Parents
  SELECT
    fm.id,
    fm.first_name,
    fm.last_name,
    fm.birth_date,
    fm.death_date,
    fm.life_status,
    fm.generation,
    CASE
      WHEN fm.id = parent.father_id THEN 'father'
      WHEN fm.id = parent.mother_id THEN 'mother'
      ELSE 'ancestor'
    END AS relation_to_root,
    ft.depth_level + 1
  FROM family_members fm
  INNER JOIN family_tree ft ON (fm.id = (SELECT father_id FROM family_members WHERE id = ft.id) OR fm.id = (SELECT mother_id FROM family_members WHERE id = ft.id))
  CROSS JOIN family_members parent
  WHERE parent.id = ft.id
    AND ft.depth_level < depth_limit

  UNION ALL

  -- Enfants
  SELECT
    fm.id,
    fm.first_name,
    fm.last_name,
    fm.birth_date,
    fm.death_date,
    fm.life_status,
    fm.generation,
    'child' AS relation_to_root,
    ft.depth_level + 1
  FROM family_members fm
  INNER JOIN family_tree ft ON (fm.father_id = ft.id OR fm.mother_id = ft.id)
  WHERE ft.depth_level < depth_limit
)
SELECT * FROM family_tree;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Récupérer tous les événements d'un membre
-- ============================================================================
CREATE OR REPLACE FUNCTION get_member_events(member_uuid UUID)
RETURNS TABLE (
  event_id UUID,
  title TEXT,
  event_type TEXT,
  event_date DATE,
  location TEXT,
  description TEXT,
  importance_level TEXT,
  member_role TEXT
) AS $$
SELECT
  he.id AS event_id,
  he.title,
  he.event_type,
  he.event_date,
  he.location,
  he.description,
  he.importance_level,
  em.role AS member_role
FROM historical_events he
INNER JOIN event_members em ON he.id = em.event_id
WHERE em.member_id = member_uuid
ORDER BY he.event_date DESC NULLS LAST;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Récupérer toutes les créations artistiques d'un membre
-- ============================================================================
CREATE OR REPLACE FUNCTION get_member_creations(member_uuid UUID)
RETURNS TABLE (
  creation_id UUID,
  title TEXT,
  creation_type TEXT,
  creation_date DATE,
  year INTEGER,
  description TEXT,
  is_featured BOOLEAN,
  media_url TEXT,
  preview_url TEXT
) AS $$
SELECT
  ac.id AS creation_id,
  ac.title,
  ac.creation_type,
  ac.creation_date,
  ac.year,
  ac.description,
  ac.is_featured,
  ac.media_url,
  ac.preview_url
FROM artistic_creations ac
WHERE ac.author_id = member_uuid
  OR EXISTS (
    SELECT 1 FROM creation_collaborators cc
    WHERE cc.creation_id = ac.id AND cc.member_id = member_uuid
  )
ORDER BY ac.year DESC NULLS LAST, ac.creation_date DESC NULLS LAST;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Recherche avancée de membres
-- ============================================================================
CREATE OR REPLACE FUNCTION search_family_members(
  search_query TEXT,
  filter_life_status TEXT DEFAULT NULL,
  filter_is_prominent BOOLEAN DEFAULT NULL,
  filter_generation INTEGER DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  maiden_name TEXT,
  birth_date DATE,
  death_date DATE,
  life_status TEXT,
  occupation TEXT,
  is_prominent BOOLEAN,
  generation INTEGER,
  profile_photo_url TEXT,
  relevance_score FLOAT
) AS $$
SELECT
  fm.id,
  fm.first_name,
  fm.last_name,
  fm.maiden_name,
  fm.birth_date,
  fm.death_date,
  fm.life_status,
  fm.occupation,
  fm.is_prominent,
  fm.generation,
  fm.profile_photo_url,
  -- Score de pertinence basé sur la similarité du texte
  GREATEST(
    similarity(fm.first_name, search_query),
    similarity(fm.last_name, search_query),
    COALESCE(similarity(fm.maiden_name, search_query), 0),
    COALESCE(similarity(fm.occupation, search_query), 0)
  ) AS relevance_score
FROM family_members fm
WHERE
  (
    fm.first_name ILIKE '%' || search_query || '%' OR
    fm.last_name ILIKE '%' || search_query || '%' OR
    fm.maiden_name ILIKE '%' || search_query || '%' OR
    fm.occupation ILIKE '%' || search_query || '%' OR
    fm.biography ILIKE '%' || search_query || '%'
  )
  AND (filter_life_status IS NULL OR fm.life_status = filter_life_status)
  AND (filter_is_prominent IS NULL OR fm.is_prominent = filter_is_prominent)
  AND (filter_generation IS NULL OR fm.generation = filter_generation)
ORDER BY relevance_score DESC, fm.last_name ASC, fm.first_name ASC
LIMIT 50;
$$ LANGUAGE sql STABLE;

-- Activer l'extension pg_trgm pour la recherche floue (si pas déjà activée)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================================
-- FONCTION: Obtenir les membres marquants (featured)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_prominent_members()
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE,
  death_date DATE,
  occupation TEXT,
  biography TEXT,
  profile_photo_url TEXT,
  generation INTEGER,
  has_portrait BOOLEAN
) AS $$
SELECT
  fm.id,
  fm.first_name,
  fm.last_name,
  fm.birth_date,
  fm.death_date,
  fm.occupation,
  fm.biography,
  fm.profile_photo_url,
  fm.generation,
  EXISTS(SELECT 1 FROM member_portraits mp WHERE mp.member_id = fm.id) AS has_portrait
FROM family_members fm
WHERE fm.is_prominent = TRUE
ORDER BY fm.generation ASC, fm.birth_date ASC NULLS LAST;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Obtenir les archives liées à un membre
-- ============================================================================
CREATE OR REPLACE FUNCTION get_member_archives(member_uuid UUID)
RETURNS TABLE (
  archive_id UUID,
  title TEXT,
  description TEXT,
  archive_type TEXT,
  original_date DATE,
  media_url TEXT,
  restored_url TEXT,
  restoration_status TEXT
) AS $$
SELECT
  a.id AS archive_id,
  a.title,
  a.description,
  a.archive_type,
  a.original_date,
  a.media_url,
  a.restored_url,
  a.restoration_status
FROM archives a
INNER JOIN archive_members am ON a.id = am.archive_id
WHERE am.member_id = member_uuid
ORDER BY a.original_date DESC NULLS LAST;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Obtenir les témoignages d'un membre ou sur un membre
-- ============================================================================
CREATE OR REPLACE FUNCTION get_member_testimonies(member_uuid UUID)
RETURNS TABLE (
  testimony_id UUID,
  title TEXT,
  testimony_type TEXT,
  category TEXT,
  content TEXT,
  testimony_date DATE,
  is_author BOOLEAN,
  is_subject BOOLEAN
) AS $$
SELECT DISTINCT
  t.id AS testimony_id,
  t.title,
  t.testimony_type,
  t.category,
  t.content,
  t.testimony_date,
  (t.author_id = member_uuid) AS is_author,
  EXISTS(
    SELECT 1 FROM testimony_about_members tam
    WHERE tam.testimony_id = t.id AND tam.member_id = member_uuid
  ) AS is_subject
FROM testimonies t
LEFT JOIN testimony_about_members tam ON t.id = tam.testimony_id
WHERE t.author_id = member_uuid
  OR tam.member_id = member_uuid
ORDER BY t.testimony_date DESC NULLS LAST;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Statistiques globales de la famille
-- ============================================================================
CREATE OR REPLACE FUNCTION get_family_statistics()
RETURNS TABLE (
  total_members BIGINT,
  living_members BIGINT,
  deceased_members BIGINT,
  total_events BIGINT,
  total_creations BIGINT,
  total_archives BIGINT,
  total_testimonies BIGINT,
  oldest_generation INTEGER,
  newest_generation INTEGER
) AS $$
SELECT
  COUNT(DISTINCT fm.id) AS total_members,
  COUNT(DISTINCT fm.id) FILTER (WHERE fm.life_status = 'alive') AS living_members,
  COUNT(DISTINCT fm.id) FILTER (WHERE fm.life_status = 'deceased') AS deceased_members,
  (SELECT COUNT(*) FROM historical_events) AS total_events,
  (SELECT COUNT(*) FROM artistic_creations) AS total_creations,
  (SELECT COUNT(*) FROM archives) AS total_archives,
  (SELECT COUNT(*) FROM testimonies) AS total_testimonies,
  MIN(fm.generation) AS oldest_generation,
  MAX(fm.generation) AS newest_generation
FROM family_members fm;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Obtenir les événements historiques par période
-- ============================================================================
CREATE OR REPLACE FUNCTION get_events_by_period(period_name TEXT DEFAULT NULL)
RETURNS TABLE (
  event_id UUID,
  title TEXT,
  event_type TEXT,
  event_date DATE,
  location TEXT,
  description TEXT,
  historical_period TEXT,
  importance_level TEXT,
  member_count BIGINT
) AS $$
SELECT
  he.id AS event_id,
  he.title,
  he.event_type,
  he.event_date,
  he.location,
  he.description,
  he.historical_period,
  he.importance_level,
  COUNT(em.member_id) AS member_count
FROM historical_events he
LEFT JOIN event_members em ON he.id = em.event_id
WHERE period_name IS NULL OR he.historical_period = period_name
GROUP BY he.id, he.title, he.event_type, he.event_date, he.location, he.description, he.historical_period, he.importance_level
ORDER BY he.event_date DESC NULLS LAST;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- FONCTION: Recherche full-text dans tous les contenus
-- ============================================================================
CREATE OR REPLACE FUNCTION search_all_content(search_query TEXT)
RETURNS TABLE (
  entity_type TEXT,
  entity_id UUID,
  title TEXT,
  description TEXT,
  relevance_score FLOAT
) AS $$
-- Recherche dans les membres
SELECT
  'member'::TEXT AS entity_type,
  fm.id AS entity_id,
  (fm.first_name || ' ' || fm.last_name) AS title,
  fm.biography AS description,
  GREATEST(
    similarity(fm.first_name || ' ' || fm.last_name, search_query),
    COALESCE(similarity(fm.biography, search_query), 0)
  ) AS relevance_score
FROM family_members fm
WHERE
  fm.first_name ILIKE '%' || search_query || '%' OR
  fm.last_name ILIKE '%' || search_query || '%' OR
  fm.biography ILIKE '%' || search_query || '%'

UNION ALL

-- Recherche dans les événements
SELECT
  'event'::TEXT AS entity_type,
  he.id AS entity_id,
  he.title,
  he.description,
  GREATEST(
    similarity(he.title, search_query),
    COALESCE(similarity(he.description, search_query), 0)
  ) AS relevance_score
FROM historical_events he
WHERE
  he.title ILIKE '%' || search_query || '%' OR
  he.description ILIKE '%' || search_query || '%'

UNION ALL

-- Recherche dans les créations
SELECT
  'creation'::TEXT AS entity_type,
  ac.id AS entity_id,
  ac.title,
  ac.description,
  GREATEST(
    similarity(ac.title, search_query),
    COALESCE(similarity(ac.description, search_query), 0)
  ) AS relevance_score
FROM artistic_creations ac
WHERE
  ac.title ILIKE '%' || search_query || '%' OR
  ac.description ILIKE '%' || search_query || '%'

UNION ALL

-- Recherche dans les témoignages
SELECT
  'testimony'::TEXT AS entity_type,
  t.id AS entity_id,
  t.title,
  t.content AS description,
  GREATEST(
    similarity(t.title, search_query),
    COALESCE(similarity(t.content, search_query), 0)
  ) AS relevance_score
FROM testimonies t
WHERE
  t.title ILIKE '%' || search_query || '%' OR
  t.content ILIKE '%' || search_query || '%'

ORDER BY relevance_score DESC
LIMIT 50;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- Commentaires
-- ============================================================================
COMMENT ON FUNCTION get_family_tree IS 'Récupère l''arbre généalogique d''un membre avec profondeur configurable';
COMMENT ON FUNCTION get_member_events IS 'Récupère tous les événements historiques auxquels un membre a participé';
COMMENT ON FUNCTION get_member_creations IS 'Récupère toutes les créations artistiques d''un membre (auteur ou collaborateur)';
COMMENT ON FUNCTION search_family_members IS 'Recherche avancée de membres avec filtres et score de pertinence';
COMMENT ON FUNCTION get_prominent_members IS 'Récupère tous les membres marquants de la famille';
COMMENT ON FUNCTION get_family_statistics IS 'Récupère les statistiques globales de la famille';
COMMENT ON FUNCTION search_all_content IS 'Recherche full-text dans tous les contenus (membres, événements, créations, témoignages)';
