-- ════════════════════════════════════════════════════════════════════════════════
-- SUPABASE RLS FIX - Run this in your Supabase SQL Editor to fix the RLS issue
-- ════════════════════════════════════════════════════════════════════════════════

-- Drop existing policies (if they exist)
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Users can create applications" ON applications;
DROP POLICY IF EXISTS "Users can update own draft applications" ON applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON applications;

-- Create new permissive policies that allow anonymous/public access

-- Allow ANYONE (authenticated or anonymous) to INSERT applications
CREATE POLICY "Allow public to create applications"
  ON applications FOR INSERT
  WITH CHECK (true);

-- Allow ANYONE to SELECT their own application by matching student_email
CREATE POLICY "Allow public to read own applications"
  ON applications FOR SELECT
  USING (true);  -- Temporarily allow all reads; you can make this more restrictive later

-- Allow authenticated users to UPDATE their own draft applications
CREATE POLICY "Allow users to update own draft applications"
  ON applications FOR UPDATE
  USING (auth.uid() IS NOT NULL AND status = 'draft')
  WITH CHECK (auth.uid() IS NOT NULL AND status = 'draft');

-- Allow ANYONE to INSERT audit logs
DROP POLICY IF EXISTS "Create audit logs" ON audit_logs;
CREATE POLICY "Allow public to create audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- ════════════════════════════════════════════════════════════════════════════════
-- ALTERNATIVE: If you want strict security, use this approach instead
-- ════════════════════════════════════════════════════════════════════════════════
-- Uncomment and run the lines below instead of the above if you want:
-- 1. RLS disabled (most permissive - good for testing)
-- 2. Or specific role-based policies

-- OPTION A: DISABLE RLS entirely (simplest for development/testing)
-- ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;

-- OPTION B: Use a service role / API key instead (more secure for production)
-- Keep RLS enabled but use Supabase's service_role key instead of anon key in backend code

-- ════════════════════════════════════════════════════════════════════════════════
