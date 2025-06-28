-- Fix für Row Level Security Policies der project_requests Tabelle

-- Alle bestehenden Policies löschen
DROP POLICY IF EXISTS "Allow public inserts" ON project_requests;
DROP POLICY IF EXISTS "Allow admin access" ON project_requests;

-- Neue, korrekte Policies erstellen

-- 1. Policy für öffentliche Inserts (Frontend kann Daten speichern)
CREATE POLICY "Enable insert for all users" ON project_requests
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- 2. Policy für Admin-Zugriff (Lesen und Bearbeiten nur für authentifizierte Benutzer)
CREATE POLICY "Enable read for authenticated users" ON project_requests
  FOR SELECT 
  TO authenticated
  USING (true);

-- 3. Policy für Updates (nur für authentifizierte Benutzer)
CREATE POLICY "Enable update for authenticated users" ON project_requests
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Policy für Deletes (nur für authentifizierte Benutzer)
CREATE POLICY "Enable delete for authenticated users" ON project_requests
  FOR DELETE 
  TO authenticated
  USING (true);

-- Überprüfung der Policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'project_requests'; 