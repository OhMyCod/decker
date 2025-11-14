/*
  # Configuration des buckets de stockage
  
  1. Nouveaux buckets
    - `photos_archives` - Photos d'archives (10MB max, images uniquement)
    - `videos_ina` - Vidéos INA et créations vidéo (500MB max)
    - `audio_creations` - Créations audio et enregistrements (50MB max)
    - `documents` - Documents PDF et scannés (20MB max)
  
  2. Sécurité
    - Tous les buckets sont publics en lecture
    - Upload réservé aux administrateurs via JWT
    - Mise à jour et suppression réservées aux administrateurs
  
  3. Limites
    - photos_archives : 10MB, types MIME images
    - videos_ina : 500MB, types MIME vidéos
    - audio_creations : 50MB, types MIME audio
    - documents : 20MB, PDF et documents
  
  4. Notes importantes
    - Les buckets utilisent le stockage Supabase Storage
    - Les transformations d'images sont disponibles à la volée
    - Les politiques RLS s'appliquent via auth.jwt()
*/

-- ============================================================================
-- Création des buckets
-- ============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'photos_archives',
    'photos_archives',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif']::text[]
  ),
  (
    'videos_ina',
    'videos_ina',
    true,
    524288000,
    ARRAY['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/x-msvideo']::text[]
  ),
  (
    'audio_creations',
    'audio_creations',
    true,
    52428800,
    ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac']::text[]
  ),
  (
    'documents',
    'documents',
    true,
    20971520,
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png']::text[]
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Politiques RLS pour photos_archives
-- ============================================================================
CREATE POLICY "Public can view photos_archives"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos_archives');

CREATE POLICY "Only admins can upload to photos_archives"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'photos_archives' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can update photos_archives"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'photos_archives' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can delete from photos_archives"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'photos_archives' AND
  (auth.jwt() ->> 'role' = 'admin')
);

-- ============================================================================
-- Politiques RLS pour videos_ina
-- ============================================================================
CREATE POLICY "Public can view videos_ina"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos_ina');

CREATE POLICY "Only admins can upload to videos_ina"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'videos_ina' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can update videos_ina"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'videos_ina' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can delete from videos_ina"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'videos_ina' AND
  (auth.jwt() ->> 'role' = 'admin')
);

-- ============================================================================
-- Politiques RLS pour audio_creations
-- ============================================================================
CREATE POLICY "Public can view audio_creations"
ON storage.objects FOR SELECT
USING (bucket_id = 'audio_creations');

CREATE POLICY "Only admins can upload to audio_creations"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'audio_creations' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can update audio_creations"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'audio_creations' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can delete from audio_creations"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio_creations' AND
  (auth.jwt() ->> 'role' = 'admin')
);

-- ============================================================================
-- Politiques RLS pour documents
-- ============================================================================
CREATE POLICY "Public can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

CREATE POLICY "Only admins can upload to documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can update documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Only admins can delete from documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (auth.jwt() ->> 'role' = 'admin')
);