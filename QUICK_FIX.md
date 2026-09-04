# Quick Fix for RLS Error

## The Problem
Row Level Security (RLS) policies are blocking anonymous form submissions. The error `new row violates row-level security policy for table "applications"` occurs because the policies require authenticated users.

## Quick Solution (Choose ONE)

### Option 1: Disable RLS (Easiest - Good for Testing)
1. Go to your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Run this query:

```sql
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE application_approvals DISABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;
```

4. Refresh your form and try submitting again
5. **Note:** This disables security. For production, use Option 2 or 3.

---

### Option 2: Use Permissive Policies (Recommended for Development)
1. Go to **Supabase Dashboard → SQL Editor**
2. Copy the entire content from `SUPABASE_RLS_FIX.sql`
3. Paste and execute

This keeps RLS enabled but allows public submissions.

---

### Option 3: Use Service Role Key (Best for Production)
1. Go to **Supabase Dashboard → Settings → API**
2. Copy the **Service Role Key** (not the anon key)
3. Update `.env`:

```env
VITE_SUPABASE_URL=https://fhdejehzaeuvqtivlkyo.supabase.co
VITE_SUPABASE_SERVICE_KEY=your-service-role-key-here
```

4. Update `src/lib/supabaseClient.js`:

```javascript
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY 
  || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
```

This uses a more privileged key that bypasses RLS policies.

---

## Step-by-Step Instructions for Option 1 (Quickest)

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in left sidebar
   - Click "New Query"

3. **Paste this code:**
```sql
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE application_approvals DISABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;
```

4. **Run Query** (Ctrl+Enter or click ▶️)

5. **Back to your form** - Try submitting again!

---

## After Fixing

- Try submitting the form again
- Check Supabase Table Editor → `applications` to see your data
- If you see your submission in the table, it worked!

---

## For Production

Once you confirm it works, move to Option 2 or 3 for proper security:
- Option 2 keeps good data validation
- Option 3 uses a secured backend key (most secure)
