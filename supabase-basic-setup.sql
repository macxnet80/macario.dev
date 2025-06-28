-- Vereinfachte Supabase Setup für CMS
-- Diese Befehle können von einem normalen Supabase-Benutzer ausgeführt werden

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

-- 2. Füge einige Beispieldaten hinzu
INSERT INTO public.projects (title, description, tools, features, color, order_index, is_active) VALUES
('E-Commerce Platform', 'Eine moderne E-Commerce-Lösung mit React und Node.js', 
 ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 
 ARRAY['Responsive Design', 'Payment Integration', 'Admin Dashboard'], 
 '#10B981', 1, true),
('Portfolio Website', 'Persönliche Portfolio-Website mit Next.js', 
 ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'], 
 ARRAY['SEO Optimized', 'Dark Mode', 'Contact Form'], 
 '#8B5CF6', 2, true),
('Task Management App', 'Kollaborative Aufgabenverwaltung für Teams', 
 ARRAY['Vue.js', 'Express.js', 'PostgreSQL'], 
 ARRAY['Real-time Updates', 'Team Collaboration', 'File Sharing'], 
 '#F59E0B', 3, true);

-- 3. Erstelle eine einfache Funktion für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Erstelle den Trigger
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 