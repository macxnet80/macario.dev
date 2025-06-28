-- Storage Policies Fix für project-images Bucket
-- Diese SQL-Befehle setzen die korrekten Berechtigungen für den Upload

-- 1. Lösche alle existierenden Policies für project-images
DROP POLICY IF EXISTS "project_images_select_policy" ON storage.objects;
DROP POLICY IF EXISTS "project_images_insert_policy" ON storage.objects;
DROP POLICY IF EXISTS "project_images_update_policy" ON storage.objects;
DROP POLICY IF EXISTS "project_images_delete_policy" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public update access" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access" ON storage.objects;

-- 2. Erstelle neue, einfache Policies für öffentlichen Zugriff
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');

CREATE POLICY "Allow public insert"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Allow public update"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Allow public delete"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'project-images');

-- 3. Stelle sicher, dass RLS aktiviert ist
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Prüfe die erstellten Policies
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND qual LIKE '%project-images%';

-- 5. Prüfe den Bucket-Status
SELECT 
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE name = 'project-images'; 