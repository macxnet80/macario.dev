-- ===================================================
-- Projektmanagement System Schema
-- Hierarchie: Unternehmen > Projekte > Aufgaben > Zeittracking
-- ===================================================

-- 1. Unternehmen (Companies)
CREATE TABLE IF NOT EXISTS public.companies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text,
    
    -- Kontakt-Informationen
    email varchar(255),
    phone varchar(50),
    website varchar(255),
    
    -- Adresse
    street varchar(255),
    postal_code varchar(20),
    city varchar(100),
    country varchar(100) DEFAULT 'Deutschland',
    
    -- Business-Informationen
    industry varchar(100),
    company_size varchar(50), -- startup, small, medium, large, enterprise
    status varchar(50) DEFAULT 'active', -- active, inactive, prospect, archived
    
    -- Finanzielle Informationen
    hourly_rate decimal(10,2) DEFAULT 75.00,
    currency varchar(10) DEFAULT 'EUR',
    
    -- Notizen und Metadaten
    notes text,
    tags varchar(100)[],
    
    -- System-Felder
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projekte (Projects) - erweitert für PM
CREATE TABLE IF NOT EXISTS public.pm_projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
    
    -- Projekt-Basis-Informationen
    name varchar(255) NOT NULL,
    description text,
    project_type varchar(50), -- website, webapp, ecommerce, automation, ai, custom
    
    -- Status und Priorität
    status varchar(50) DEFAULT 'planning', -- planning, active, on_hold, completed, cancelled
    priority varchar(20) DEFAULT 'medium', -- low, medium, high, urgent
    
    -- Zeitmanagement
    start_date date,
    end_date date,
    estimated_hours integer,
    
    -- Finanzielle Informationen
    budget decimal(10,2),
    hourly_rate decimal(10,2),
    fixed_price decimal(10,2),
    billing_type varchar(20) DEFAULT 'hourly', -- hourly, fixed, milestone
    
    -- Fortschritt
    progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    
    -- Metadaten
    tags varchar(100)[],
    color varchar(50) DEFAULT 'from-blue-500 to-cyan-500',
    notes text,
    
    -- System-Felder
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Aufgaben (Tasks)
CREATE TABLE IF NOT EXISTS public.tasks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid REFERENCES public.pm_projects(id) ON DELETE CASCADE,
    
    -- Aufgaben-Informationen
    title varchar(255) NOT NULL,
    description text,
    
    -- Hierarchie (für Sub-Tasks)
    parent_task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE,
    
    -- Status und Priorität
    status varchar(50) DEFAULT 'todo', -- todo, in_progress, review, completed, cancelled
    priority varchar(20) DEFAULT 'medium', -- low, medium, high, urgent
    
    -- Zeitmanagement
    estimated_hours decimal(5,2),
    due_date timestamp with time zone,
    completed_at timestamp with time zone,
    
    -- Zuweisungen
    assigned_to varchar(255), -- Kann später auf User-Tabelle erweitert werden
    
    -- Sortierung und Gruppierung
    order_index integer DEFAULT 0,
    category varchar(100), -- frontend, backend, design, testing, etc.
    
    -- Metadaten
    tags varchar(100)[],
    notes text,
    
    -- System-Felder
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Zeittracking (Time Entries)
CREATE TABLE IF NOT EXISTS public.time_entries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid REFERENCES public.pm_projects(id) ON DELETE CASCADE,
    task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
    
    -- Zeit-Informationen
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone,
    duration_minutes integer, -- Automatisch berechnet oder manuell eingegeben
    
    -- Beschreibung
    description text,
    
    -- Kategorisierung
    activity_type varchar(50), -- development, design, meeting, research, testing, etc.
    
    -- Abrechnung
    is_billable boolean DEFAULT true,
    hourly_rate decimal(10,2),
    
    -- Benutzer (später erweitern)
    user_name varchar(255) DEFAULT 'Admin',
    
    -- System-Felder
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Indizes für Performance
CREATE INDEX IF NOT EXISTS idx_companies_status ON public.companies(status);
CREATE INDEX IF NOT EXISTS idx_companies_name ON public.companies(name);

CREATE INDEX IF NOT EXISTS idx_pm_projects_company ON public.pm_projects(company_id);
CREATE INDEX IF NOT EXISTS idx_pm_projects_status ON public.pm_projects(status);
CREATE INDEX IF NOT EXISTS idx_pm_projects_dates ON public.pm_projects(start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_tasks_project ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_parent ON public.tasks(parent_task_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);

CREATE INDEX IF NOT EXISTS idx_time_entries_project ON public.time_entries(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_task ON public.time_entries(task_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_dates ON public.time_entries(start_time, end_time);

-- 6. Update-Trigger für alle Tabellen
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für Companies
DROP TRIGGER IF EXISTS update_companies_updated_at ON public.companies;
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger für PM Projects
DROP TRIGGER IF EXISTS update_pm_projects_updated_at ON public.pm_projects;
CREATE TRIGGER update_pm_projects_updated_at
    BEFORE UPDATE ON public.pm_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger für Tasks
DROP TRIGGER IF EXISTS update_tasks_updated_at ON public.tasks;
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger für Time Entries
DROP TRIGGER IF EXISTS update_time_entries_updated_at ON public.time_entries;
CREATE TRIGGER update_time_entries_updated_at
    BEFORE UPDATE ON public.time_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_time_entries_updated_at_column();

-- 7. Beispiel-Daten erstellen
-- Beispiel-Unternehmen
INSERT INTO public.companies (name, description, email, phone, street, postal_code, city, industry, company_size, hourly_rate) VALUES
('Musterfirma GmbH', 'Ein innovatives Technologieunternehmen', 'kontakt@musterfirma.de', '+49 123 456789', 'Musterstraße 123', '12345', 'Berlin', 'Technology', 'medium', 85.00),
('StartUp Solutions', 'Junges StartUp im E-Commerce Bereich', 'hello@startup-solutions.com', '+49 987 654321', 'Innovation Allee 42', '80331', 'München', 'E-Commerce', 'startup', 65.00),
('Enterprise Corp', 'Großes Unternehmen mit komplexen Anforderungen', 'projects@enterprise-corp.de', '+49 555 123456', 'Business Park 1', '60311', 'Frankfurt', 'Finance', 'large', 120.00)
ON CONFLICT (id) DO NOTHING;

-- 8. Views für bessere Datenanalyse
CREATE OR REPLACE VIEW project_overview AS
SELECT 
    p.id,
    p.name as project_name,
    c.name as company_name,
    p.status,
    p.priority,
    p.progress_percentage,
    p.budget,
    p.start_date,
    p.end_date,
    p.estimated_hours,
    COALESCE(SUM(te.duration_minutes), 0) / 60.0 as actual_hours,
    COUNT(DISTINCT t.id) as total_tasks,
    COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completed_tasks
FROM public.pm_projects p
LEFT JOIN public.companies c ON p.company_id = c.id
LEFT JOIN public.tasks t ON p.id = t.project_id
LEFT JOIN public.time_entries te ON p.id = te.project_id
GROUP BY p.id, p.name, c.name, p.status, p.priority, p.progress_percentage, p.budget, p.start_date, p.end_date, p.estimated_hours;

CREATE OR REPLACE VIEW time_tracking_summary AS
SELECT 
    p.name as project_name,
    c.name as company_name,
    t.title as task_title,
    te.activity_type,
    DATE(te.start_time) as work_date,
    SUM(te.duration_minutes) / 60.0 as hours_worked,
    SUM(CASE WHEN te.is_billable THEN te.duration_minutes ELSE 0 END) / 60.0 as billable_hours,
    AVG(te.hourly_rate) as avg_hourly_rate
FROM public.time_entries te
LEFT JOIN public.pm_projects p ON te.project_id = p.id
LEFT JOIN public.companies c ON p.company_id = c.id
LEFT JOIN public.tasks t ON te.task_id = t.id
GROUP BY p.name, c.name, t.title, te.activity_type, DATE(te.start_time);

-- 9. RLS Policies (Row Level Security)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- Policies für Admin-Zugriff (alle Operationen)
CREATE POLICY "Admin can manage companies" ON public.companies FOR ALL USING (true);
CREATE POLICY "Admin can manage pm_projects" ON public.pm_projects FOR ALL USING (true);
CREATE POLICY "Admin can manage tasks" ON public.tasks FOR ALL USING (true);
CREATE POLICY "Admin can manage time_entries" ON public.time_entries FOR ALL USING (true);

-- Policies für öffentlichen Lesezugriff auf aktive Daten (optional)
CREATE POLICY "Public can view active companies" ON public.companies FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active projects" ON public.pm_projects FOR SELECT USING (is_active = true);

-- 10. Funktionen für Geschäftslogik
CREATE OR REPLACE FUNCTION calculate_project_progress(project_uuid uuid)
RETURNS integer AS $$
DECLARE
    total_tasks integer;
    completed_tasks integer;
    progress integer;
BEGIN
    SELECT 
        COUNT(*),
        COUNT(CASE WHEN status = 'completed' THEN 1 END)
    INTO total_tasks, completed_tasks
    FROM public.tasks
    WHERE project_id = project_uuid;
    
    IF total_tasks = 0 THEN
        RETURN 0;
    ELSE
        progress := ROUND((completed_tasks::float / total_tasks::float) * 100);
        RETURN progress;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Setup abgeschlossen
SELECT 'Projektmanagement Setup Complete' as status, 
       (SELECT COUNT(*) FROM public.companies) as companies_count,
       (SELECT COUNT(*) FROM public.pm_projects) as projects_count;
