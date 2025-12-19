-- Vollständiges Supabase Setup mit Storage Fix
-- Diese Datei behebt alle bekannten Probleme

-- ===== DATENBANK SETUP =====

-- 1. Erstelle die projects Tabelle
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    tools text[] DEFAULT '{}',
    features text[] DEFAULT '{}',
    color text DEFAULT '#3B82F6',
    image_url text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Erstelle updated_at Trigger-Funktion
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Erstelle den Trigger
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Füge Beispieldaten hinzu (nur wenn Tabelle leer ist)
INSERT INTO public.projects (title, description, tools, features, color, order_index, is_active)
SELECT * FROM (VALUES
    ('E-Commerce Platform', 'Eine moderne E-Commerce-Lösung mit React und Node.js', 
     ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 
     ARRAY['Responsive Design', 'Payment Integration', 'Admin Dashboard'], 
     'from-blue-500 to-cyan-500', 1, true),
    ('Portfolio Website', 'Persönliche Portfolio-Website mit Next.js', 
     ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'], 
     ARRAY['SEO Optimized', 'Dark Mode', 'Contact Form'], 
     'from-purple-500 to-pink-500', 2, true),
    ('Task Management App', 'Kollaborative Aufgabenverwaltung für Teams', 
     ARRAY['Vue.js', 'Express.js', 'PostgreSQL'], 
     ARRAY['Real-time Updates', 'Team Collaboration', 'File Sharing'], 
     'from-green-500 to-emerald-500', 3, true)
) AS v(title, description, tools, features, color, order_index, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.projects);

-- ===== STORAGE SETUP =====

-- 5. Erstelle Storage Bucket (falls nicht vorhanden)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'project-images', 
    'project-images', 
    true, 
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- 6. Lösche alte Storage Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public update access" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access" ON storage.objects;

-- 7. Erstelle neue Storage Policies für project-images Bucket
CREATE POLICY "project_images_select_policy"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "project_images_insert_policy"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "project_images_update_policy"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "project_images_delete_policy"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');

-- 8. Aktiviere RLS auf storage.objects (falls nicht aktiviert)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ===== VERIFIKATION =====

-- 9. Prüfe Setup
SELECT 'Projects Table' as component, count(*) as records FROM public.projects
UNION ALL
SELECT 'Storage Bucket' as component, count(*) as records FROM storage.buckets WHERE name = 'project-images'
UNION ALL
SELECT 'Storage Policies' as component, count(*) as records FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- Zeige alle erstellten Policies
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage'; 