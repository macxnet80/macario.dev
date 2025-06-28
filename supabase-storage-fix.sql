-- Storage Bucket und Berechtigungen für Projekt-Bilder
-- Führe dieses Script in deinem Supabase SQL Editor aus

-- 1. Bucket erstellen (falls nicht vorhanden)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 2. RLS Policies für Storage löschen (falls vorhanden)
DROP POLICY IF EXISTS "Public read access for project images" ON storage.objects;
DROP POLICY IF EXISTS "Public upload access for project images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access for project images" ON storage.objects;

-- 3. Neue RLS Policies erstellen
-- Öffentlicher Lesezugriff
CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Öffentlicher Upload-Zugriff
CREATE POLICY "Public upload access for project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

-- Öffentlicher Update-Zugriff
CREATE POLICY "Public update access for project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

-- Öffentlicher Delete-Zugriff
CREATE POLICY "Public delete access for project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');

-- 4. RLS aktivieren
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 5. Bucket-Status prüfen
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets 
WHERE id = 'project-images';

-- 6. Policies prüfen
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%project images%'; 