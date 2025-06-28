-- =============================================
-- Supabase RLS Fix für Development
-- =============================================

-- Option 1: RLS komplett deaktivieren (einfachste Lösung)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Option 2: Offene Policies für Development (falls du RLS behalten willst)
-- Entferne zuerst die alten Policies
DROP POLICY IF EXISTS "Admin can manage all projects" ON projects;
DROP POLICY IF EXISTS "Public can view active projects" ON projects;

-- Erstelle neue offene Policy
CREATE POLICY "Allow all operations for development" ON projects
    FOR ALL USING (true);

-- Storage Policies anpassen
DROP POLICY IF EXISTS "Admin can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;

-- Neue offene Storage Policy
CREATE POLICY "Allow all storage operations" ON storage.objects
    FOR ALL USING (bucket_id = 'project-images');

-- =============================================
-- Hinweis:
-- =============================================
-- Für Development ist es OK, RLS zu deaktivieren.
-- Für Produktion solltest du eine echte Authentifizierung
-- mit Supabase Auth implementieren. 