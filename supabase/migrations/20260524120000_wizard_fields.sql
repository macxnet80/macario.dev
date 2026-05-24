-- Wizard-spezifische Felder für project_requests
ALTER TABLE project_requests
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS final_price INTEGER,
ADD COLUMN IF NOT EXISTS privacy_accepted BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS marketing_accepted BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS source VARCHAR(100);

COMMENT ON COLUMN project_requests.first_name IS 'Vorname aus dem Project Wizard';
COMMENT ON COLUMN project_requests.last_name IS 'Nachname aus dem Project Wizard';
COMMENT ON COLUMN project_requests.final_price IS 'Berechneter Endpreis in Euro';
COMMENT ON COLUMN project_requests.privacy_accepted IS 'Datenschutz-Einwilligung (DSGVO)';
COMMENT ON COLUMN project_requests.marketing_accepted IS 'Marketing-Einwilligung (optional)';
COMMENT ON COLUMN project_requests.source IS 'Lesbares Label der Lead-Quelle (z.B. Google, Empfehlung)';
