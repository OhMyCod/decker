-- Migration: Configuration des buckets de stockage Supabase
-- Date: 2025-01-13
-- Description: Buckets pour photos, vidéos, et audio avec politiques de sécurité

-- ============================================================================
-- CRÉATION DES BUCKETS DE STOCKAGE
-- ============================================================================

-- Bucket pour les photos d'archives (photos anciennes, portraits, documents)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'photos_archives',
  'photos_archives',
  true, -- Public access
  10485760, -- 10MB limit
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket pour les vidéos INA et créations vidéo
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos_ina',
  'videos_ina',
  true, -- Public access
  524288000, -- 500MB limit
  ARRAY[
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/webm',
    'video/x-msvideo'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket pour les créations audio (musiques, enregistrements vocaux)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio_creations',
  'audio_creations',
  true, -- Public access
  52428800, -- 50MB limit
  ARRAY[
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/aac',
    'audio/flac'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket pour les documents (lettres, manuscrits, documents officiels)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true, -- Public access
  20971520, -- 20MB limit
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- POLITIQUES DE STOCKAGE POUR photos_archives
-- ============================================================================

-- Lecture publique pour toutes les photos
CREATE POLICY "Public can view photos_archives"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos_archives');

-- Upload restreint aux administrateurs
CREATE POLICY "Only admins can upload to photos_archives"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'photos_archives' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Mise à jour restreinte aux administrateurs
CREATE POLICY "Only admins can update photos_archives"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'photos_archives' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Suppression restreinte aux administrateurs
CREATE POLICY "Only admins can delete from photos_archives"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'photos_archives' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- ============================================================================
-- POLITIQUES DE STOCKAGE POUR videos_ina
-- ============================================================================

-- Lecture publique pour toutes les vidéos
CREATE POLICY "Public can view videos_ina"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos_ina');

-- Upload restreint aux administrateurs
CREATE POLICY "Only admins can upload to videos_ina"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'videos_ina' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Mise à jour restreinte aux administrateurs
CREATE POLICY "Only admins can update videos_ina"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'videos_ina' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Suppression restreinte aux administrateurs
CREATE POLICY "Only admins can delete from videos_ina"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'videos_ina' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- ============================================================================
-- POLITIQUES DE STOCKAGE POUR audio_creations
-- ============================================================================

-- Lecture publique pour tous les audios
CREATE POLICY "Public can view audio_creations"
ON storage.objects FOR SELECT
USING (bucket_id = 'audio_creations');

-- Upload restreint aux administrateurs
CREATE POLICY "Only admins can upload to audio_creations"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'audio_creations' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Mise à jour restreinte aux administrateurs
CREATE POLICY "Only admins can update audio_creations"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'audio_creations' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Suppression restreinte aux administrateurs
CREATE POLICY "Only admins can delete from audio_creations"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'audio_creations' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- ============================================================================
-- POLITIQUES DE STOCKAGE POUR documents
-- ============================================================================

-- Lecture publique pour tous les documents
CREATE POLICY "Public can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Upload restreint aux administrateurs
CREATE POLICY "Only admins can upload to documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Mise à jour restreinte aux administrateurs
CREATE POLICY "Only admins can update documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- Suppression restreinte aux administrateurs
CREATE POLICY "Only admins can delete from documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND
  auth.jwt() ->> 'role' = 'admin'
);

-- ============================================================================
-- Commentaires sur la configuration du stockage
-- ============================================================================
COMMENT ON SCHEMA storage IS 'Configuration des buckets de stockage pour les médias de la famille DECKER';

-- Notes sur les limites de taille :
-- - photos_archives : 10MB (adapté pour photos haute résolution)
-- - videos_ina : 500MB (vidéos de qualité INA)
-- - audio_creations : 50MB (fichiers audio de haute qualité)
-- - documents : 20MB (PDF et documents scannés)

-- Optimisation automatique :
-- Les images seront automatiquement optimisées par Supabase lors de l'upload
-- via les transformations d'image disponibles dans l'API Storage
