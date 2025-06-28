-- Einfache Lösung: RLS für project_requests deaktivieren
-- Das ermöglicht öffentliche Inserts und Admin-Zugriff ohne komplexe Policies

-- RLS deaktivieren
ALTER TABLE project_requests DISABLE ROW LEVEL SECURITY;

-- Alle Policies entfernen (falls noch vorhanden)
DROP POLICY IF EXISTS "Enable insert for all users" ON project_requests;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON project_requests;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON project_requests;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON project_requests;
DROP POLICY IF EXISTS "Allow public inserts" ON project_requests;
DROP POLICY IF EXISTS "Allow admin access" ON project_requests;

-- Bestätigung
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'project_requests';

-- Zeige aktuelle Policies (sollte leer sein)
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'project_requests'; 