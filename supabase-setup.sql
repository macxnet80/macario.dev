-- =============================================
-- Supabase Setup für Projekt CMS
-- =============================================

-- 1. Projekte Tabelle erstellen
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tools TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    color VARCHAR(100) NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
    image_url TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Storage Bucket für Projekt-Bilder erstellen
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. RLS (Row Level Security) aktivieren
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 4. Policies für öffentlichen Lesezugriff auf aktive Projekte
CREATE POLICY "Public can view active projects" ON projects
    FOR SELECT USING (is_active = true);

-- 5. Policies für Admin-Zugriff (alle Operationen)
-- Hinweis: Für Produktionsumgebung sollte hier eine echte Authentifizierung implementiert werden
CREATE POLICY "Admin can manage all projects" ON projects
    FOR ALL USING (true);

-- 6. Storage Policies für Bilder
CREATE POLICY "Public can view project images" ON storage.objects
    FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admin can upload project images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Admin can update project images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'project-images');

CREATE POLICY "Admin can delete project images" ON storage.objects
    FOR DELETE USING (bucket_id = 'project-images');

-- 7. Trigger für automatische updated_at Aktualisierung
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Beispiel-Daten einfügen (optional)
INSERT INTO projects (title, description, tools, features, color, order_index, is_active) VALUES
(
    'Fitness-Tracker App',
    'Eine intuitive Mobile App für Personal Trainer und ihre Kunden. Trainingspläne, Fortschrittsverfolgung und Ernährungstipps - alles in einer App.',
    ARRAY['Glide', 'Airtable', 'Stripe'],
    ARRAY['Personalisierte Trainingspläne', 'Progress Tracking', 'In-App Zahlungen'],
    'from-blue-500 to-cyan-500',
    0,
    true
),
(
    'KI-Kundenservice Bot',
    'Ein intelligenter Chatbot, der Kundenanfragen automatisch beantwortet und bei Bedarf an menschliche Mitarbeiter weiterleitet.',
    ARRAY['OpenAI', 'Make.com', 'Slack'],
    ARRAY['24/7 Verfügbarkeit', 'Mehrsprachig', 'Nahtlose Übergabe'],
    'from-purple-500 to-pink-500',
    1,
    true
),
(
    'Vertriebs-Dashboard',
    'Ein Echtzeit-Dashboard für Vertriebsteams mit automatisierten Reports und KPI-Tracking.',
    ARRAY['Softr', 'Airtable', 'Zapier'],
    ARRAY['Live-Daten', 'Automatische Reports', 'Team-Performance'],
    'from-green-500 to-emerald-500',
    2,
    true
),
(
    'Automatisierte Buchhaltung',
    'Ein Workflow-System, das Rechnungen automatisch verarbeitet, kategorisiert und in die Buchhaltung überträgt.',
    ARRAY['Make.com', 'Google Sheets', 'Stripe'],
    ARRAY['OCR-Erkennung', 'Auto-Kategorisierung', 'Echtzeit-Sync'],
    'from-orange-500 to-red-500',
    3,
    true
)
ON CONFLICT DO NOTHING;

-- =============================================
-- Setup-Hinweise:
-- =============================================

-- 1. Supabase Projekt erstellen auf https://supabase.com
-- 2. Dieses SQL-Script in der Supabase SQL-Konsole ausführen
-- 3. Umgebungsvariablen in .env.local setzen:
--    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
-- 4. Storage Bucket 'project-images' in der Supabase Konsole überprüfen

-- =============================================
-- Erweiterte Features (optional):
-- =============================================

-- Kategorien-Tabelle für Projekt-Kategorisierung
CREATE TABLE IF NOT EXISTS project_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(50) DEFAULT '#3B82F6',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kategorie-Zuordnung zu Projekten
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES project_categories(id);

-- Analytics-Tabelle für Projekt-Views
CREATE TABLE IF NOT EXISTS project_analytics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    view_count INTEGER DEFAULT 0,
    last_viewed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funktion zum Erhöhen der View-Anzahl
CREATE OR REPLACE FUNCTION increment_project_views(project_id_param INTEGER)
RETURNS void AS $$
BEGIN
    INSERT INTO project_analytics (project_id, view_count)
    VALUES (project_id_param, 1)
    ON CONFLICT (project_id) 
    DO UPDATE SET 
        view_count = project_analytics.view_count + 1,
        last_viewed = NOW();
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- Sicherheits-Hinweise für Produktion:
-- =============================================

-- Für Produktionsumgebung sollten folgende Sicherheitsmaßnahmen implementiert werden:
-- 1. Echte Benutzer-Authentifizierung mit Supabase Auth
-- 2. Spezifische RLS-Policies basierend auf Benutzerrollen
-- 3. API-Rate-Limiting
-- 4. Bildgrößen-Limitierung im Storage
-- 5. CSRF-Schutz für Admin-Operationen

-- Beispiel für sichere Admin-Policy (wenn Auth implementiert):
-- CREATE POLICY "Only admins can manage projects" ON projects
--     FOR ALL USING (
--         auth.jwt() ->> 'role' = 'admin' OR 
--         auth.jwt() ->> 'email' = 'admin@yourdomain.com'
--     ); 