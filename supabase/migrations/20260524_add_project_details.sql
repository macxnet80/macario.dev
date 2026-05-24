-- Migration: Add project details (category and urls)
-- Erweitert die Tabelle public.projects um Kategorisierung und Links für das AI Showcase Feature

ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS project_category text NOT NULL DEFAULT 'personal' CHECK (project_category IN ('personal', 'client')),
ADD COLUMN IF NOT EXISTS project_url text,
ADD COLUMN IF NOT EXISTS git_url text;

-- Kommentar zur Spalte hinzufügen
COMMENT ON COLUMN public.projects.project_category IS 'Kategorie des Projekts: client (Kundenprojekt) oder personal (eigenes Projekt)';
COMMENT ON COLUMN public.projects.project_url IS 'Live-URL / Demo-URL des Projekts';
COMMENT ON COLUMN public.projects.git_url IS 'GitHub-Repository-URL des Projekts';
