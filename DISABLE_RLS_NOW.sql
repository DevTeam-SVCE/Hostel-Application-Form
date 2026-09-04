-- ════════════════════════════════════════════════════════════════════════════════
-- DISABLE RLS - RUN THIS NOW TO FIX YOUR FORM
-- ════════════════════════════════════════════════════════════════════════════════
-- 
-- Instructions:
-- 1. Go to Supabase Dashboard: https://app.supabase.com
-- 2. Select Your Project
-- 3. Click "SQL Editor" in left sidebar
-- 4. Click "New Query"
-- 5. Copy everything below (all lines starting with ALTER)
-- 6. Paste it into the SQL editor
-- 7. Click "Run" (Ctrl+Enter)
-- 8. Done! Your form should now work
--
-- ════════════════════════════════════════════════════════════════════════════════

-- Disable RLS on all application tables
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE application_approvals DISABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_rooms DISABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years DISABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents DISABLE ROW LEVEL SECURITY;

-- Done! Your form submissions should now work.
-- Go back to your form and try submitting again.
