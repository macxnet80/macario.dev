-- CRM-Erweiterung: Zusätzliche Felder für professionelles Kundenmanagement

-- Adress-Felder hinzufügen
ALTER TABLE project_requests 
ADD COLUMN IF NOT EXISTS street VARCHAR(255),
ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10),
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'Deutschland';

-- Angebots-Felder hinzufügen
ALTER TABLE project_requests 
ADD COLUMN IF NOT EXISTS offer_amount INTEGER, -- Angebotspreis in Euro
ADD COLUMN IF NOT EXISTS offer_date DATE, -- Angebotsdatum
ADD COLUMN IF NOT EXISTS offer_status VARCHAR(50) DEFAULT 'pending', -- pending, sent, accepted, rejected
ADD COLUMN IF NOT EXISTS contract_status VARCHAR(50) DEFAULT 'none', -- none, draft, sent, signed, completed
ADD COLUMN IF NOT EXISTS offer_description TEXT, -- Leistungsbeschreibung für das Angebot
ADD COLUMN IF NOT EXISTS offer_description_optimized TEXT; -- KI-optimierte Version

-- Business-Felder hinzufügen
ALTER TABLE project_requests 
ADD COLUMN IF NOT EXISTS lead_source VARCHAR(100) DEFAULT 'website', -- website, referral, social_media, direct, other
ADD COLUMN IF NOT EXISTS priority_level VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
ADD COLUMN IF NOT EXISTS next_followup DATE, -- Nächster Follow-up Termin
ADD COLUMN IF NOT EXISTS estimated_hours INTEGER, -- Geschätzte Arbeitsstunden
ADD COLUMN IF NOT EXISTS hourly_rate INTEGER DEFAULT 75; -- Stundensatz in Euro

-- Zusätzliche Tracking-Felder
ALTER TABLE project_requests 
ADD COLUMN IF NOT EXISTS first_contact_date DATE, -- Datum des ersten Kontakts
ADD COLUMN IF NOT EXISTS last_contact_date DATE, -- Datum des letzten Kontakts
ADD COLUMN IF NOT EXISTS project_start_date DATE, -- Geplanter Projektstart
ADD COLUMN IF NOT EXISTS project_end_date DATE; -- Geplantes Projektende

-- Kommentare für bessere Dokumentation
COMMENT ON COLUMN project_requests.street IS 'Straße und Hausnummer';
COMMENT ON COLUMN project_requests.postal_code IS 'Postleitzahl';
COMMENT ON COLUMN project_requests.city IS 'Stadt';
COMMENT ON COLUMN project_requests.country IS 'Land';
COMMENT ON COLUMN project_requests.offer_amount IS 'Angebotspreis in Euro';
COMMENT ON COLUMN project_requests.offer_date IS 'Datum des Angebots';
COMMENT ON COLUMN project_requests.offer_status IS 'Status des Angebots (pending, sent, accepted, rejected)';
COMMENT ON COLUMN project_requests.contract_status IS 'Vertragsstatus (none, draft, sent, signed, completed)';
COMMENT ON COLUMN project_requests.offer_description IS 'Interne Leistungsbeschreibung für das Angebot';
COMMENT ON COLUMN project_requests.offer_description_optimized IS 'KI-optimierte Leistungsbeschreibung';
COMMENT ON COLUMN project_requests.lead_source IS 'Quelle des Leads (website, referral, social_media, etc.)';
COMMENT ON COLUMN project_requests.priority_level IS 'Prioritätsstufe (low, medium, high, urgent)';
COMMENT ON COLUMN project_requests.next_followup IS 'Datum für nächsten Follow-up';
COMMENT ON COLUMN project_requests.estimated_hours IS 'Geschätzte Arbeitsstunden';
COMMENT ON COLUMN project_requests.hourly_rate IS 'Stundensatz in Euro';

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_project_requests_offer_status ON project_requests(offer_status);
CREATE INDEX IF NOT EXISTS idx_project_requests_contract_status ON project_requests(contract_status);
CREATE INDEX IF NOT EXISTS idx_project_requests_priority_level ON project_requests(priority_level);
CREATE INDEX IF NOT EXISTS idx_project_requests_next_followup ON project_requests(next_followup);
CREATE INDEX IF NOT EXISTS idx_project_requests_city ON project_requests(city);

-- Bestätigung der neuen Spalten
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'project_requests'
ORDER BY ordinal_position; 