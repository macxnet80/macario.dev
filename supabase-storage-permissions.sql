-- Storage Berechtigungen für project-images Bucket
-- Diese Befehle müssen im Supabase SQL Editor ausgeführt werden

-- 1. Prüfe ob der Bucket existiert
SELECT * FROM storage.buckets WHERE name = 'project-images';

-- 2. Falls der Bucket nicht existiert, erstelle ihn
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Lösche alte Policies falls vorhanden
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access" ON storage.objects;

-- 4. Erstelle neue Policies für öffentlichen Zugriff
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Public upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Public update access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images');

CREATE POLICY "Public delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');

-- 5. Prüfe die Policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage'; 