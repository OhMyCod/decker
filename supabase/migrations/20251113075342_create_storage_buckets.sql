/*
  # Configuration des buckets de stockage

  1. Nouveaux buckets
    - `photos` - Bucket public pour les images
    - `videos` - Bucket public pour les vidéos
    - `audio` - Bucket public pour les fichiers audio
    - `archives` - Bucket public pour les archives

  2. Sécurité
    - Politiques RLS pour accès public en lecture sur tous les buckets
    - Politiques pour upload authentifié sur tous les buckets
    - Politiques pour suppression par le propriétaire sur tous les buckets

  3. Notes importantes
    - Les buckets sont configurés comme publics pour permettre l'accès direct aux fichiers
    - Les utilisateurs authentifiés peuvent uploader des fichiers
    - Seuls les propriétaires peuvent supprimer leurs propres fichiers
    - Limite de taille : 50MB pour photos/audio, 100MB pour videos/archives
*/

-- Créer les buckets de stockage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('photos', 'photos', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]),
  ('videos', 'videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime']::text[]),
  ('audio', 'audio', true, 52428800, ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3']::text[]),
  ('archives', 'archives', true, 104857600, ARRAY['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed']::text[])
ON CONFLICT (id) DO NOTHING;

-- Politique : Accès public en lecture pour tous les buckets
CREATE POLICY "Public Access - photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');

CREATE POLICY "Public Access - videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'videos');

CREATE POLICY "Public Access - audio"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audio');

CREATE POLICY "Public Access - archives"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'archives');

-- Politique : Upload pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload - photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Authenticated users can upload - videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Authenticated users can upload - audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audio');

CREATE POLICY "Authenticated users can upload - archives"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'archives');

-- Politique : Mise à jour par le propriétaire
CREATE POLICY "Users can update own files - photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'photos' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update own files - videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update own files - audio"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'audio' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'audio' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update own files - archives"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'archives' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'archives' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Politique : Suppression par le propriétaire
CREATE POLICY "Users can delete own files - photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own files - videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own files - audio"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'audio' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own files - archives"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'archives' AND (storage.foldername(name))[1] = auth.uid()::text);