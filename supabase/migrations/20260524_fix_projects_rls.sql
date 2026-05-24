-- Fix: projects table had RLS enabled but only SELECT policy
-- Admin API routes use anon key, so INSERT/UPDATE/DELETE were blocked

CREATE POLICY "Allow public insert" ON public.projects
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete" ON public.projects
  FOR DELETE
  USING (true);
