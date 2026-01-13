-- Add missing columns to existing applications table
ALTER TABLE public.applications 
  ADD COLUMN IF NOT EXISTS date_applied text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS platform text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS user_id text NOT NULL DEFAULT '';

-- Disable RLS so Guest Mode works
ALTER TABLE public.applications DISABLE ROW LEVEL SECURITY;
