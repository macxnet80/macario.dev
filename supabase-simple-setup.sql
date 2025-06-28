-- Einfaches Supabase Setup - nur Datenbank
-- Diese Datei vermeidet alle Berechtigungsprobleme

-- 1. Erstelle die projects Tabelle
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    tools text[] DEFAULT '{}',
    features text[] DEFAULT '{}',
    color text DEFAULT 'from-blue-500 to-cyan-500',
    image_url text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Füge Beispieldaten hinzu
INSERT INTO public.projects (title, description, tools, features, color, order_index, is_active) 
VALUES 
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
ON CONFLICT (id) DO NOTHING;

-- 3. Prüfe das Ergebnis
SELECT 'Setup Complete' as status, count(*) as project_count FROM public.projects; 