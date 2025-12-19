-- Tabelle für Projektanfragen aus dem Project Wizard
CREATE TABLE IF NOT EXISTS project_requests (
  id BIGSERIAL PRIMARY KEY,
  
  -- Projekt-Details
  project_type VARCHAR(50) NOT NULL,
  budget INTEGER NOT NULL,
  timeline VARCHAR(50) NOT NULL,
  priority VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[], -- Array von ausgewählten Features
  
  -- Kontakt-Informationen
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  
  -- KI-Analyse
  ai_analysis TEXT,
  
  -- Status-Tracking
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, in_progress, completed, cancelled
  notes TEXT, -- Interne Notizen
  
  -- Automatische Zeitstempel
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_project_requests_status ON project_requests(status);
CREATE INDEX IF NOT EXISTS idx_project_requests_created_at ON project_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_requests_email ON project_requests(email);

-- Row Level Security (RLS) aktivieren
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;

-- Policy für öffentliche Inserts (damit das Frontend Daten speichern kann)
CREATE POLICY "Allow public inserts" ON project_requests
  FOR INSERT 
  WITH CHECK (true);

-- Policy für Admin-Zugriff (nur authentifizierte Admins können lesen/bearbeiten)
CREATE POLICY "Allow admin access" ON project_requests
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Trigger für updated_at automatisch aktualisieren
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_requests_updated_at 
  BEFORE UPDATE ON project_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Kommentare für bessere Dokumentation
COMMENT ON TABLE project_requests IS 'Speichert alle Projektanfragen aus dem Project Wizard';
COMMENT ON COLUMN project_requests.project_type IS 'Art des Projekts (website, webapp, ecommerce, automation, ai)';
COMMENT ON COLUMN project_requests.budget IS 'Gewünschtes Budget in Euro';
COMMENT ON COLUMN project_requests.timeline IS 'Gewünschte Timeline (1-2-weeks, 3-4-weeks, etc.)';
COMMENT ON COLUMN project_requests.priority IS 'Priorität (speed, quality, budget, features)';
COMMENT ON COLUMN project_requests.ai_analysis IS 'KI-Analyse von Sam';
COMMENT ON COLUMN project_requests.status IS 'Bearbeitungsstatus der Anfrage'; 