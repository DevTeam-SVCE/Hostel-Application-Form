-- ════════════════════════════════════════════════════════════════════════════════
-- HOSTEL APPLICATION FORM - SUPABASE SCHEMA
-- ════════════════════════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────────────────────────
-- APPLICATIONS TABLE
-- Main table for storing hostel applications
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Metadata
  academic_year VARCHAR(20) NOT NULL,
  application_no VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected', 'pending_review')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP WITH TIME ZONE,
  
  -- ────── STUDENT DETAILS ──────
  student_name VARCHAR(255) NOT NULL,
  student_phone VARCHAR(20) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL CHECK (gender IN ('Male', 'Female')),
  age INTEGER NOT NULL CHECK (age >= 15 AND age <= 35),
  date_of_birth DATE NOT NULL,
  blood_group VARCHAR(10),
  
  -- Passport photograph stored as URL or base64
  photograph TEXT,
  
  -- ────── ACADEMIC DETAILS ──────
  course VARCHAR(100) NOT NULL CHECK (course IN ('BE', 'M Tech', 'PG')),
  year VARCHAR(50) NOT NULL CHECK (year IN ('1st Year', '2nd Year', '3rd Year', '4th Year')),
  branch VARCHAR(100) NOT NULL,
  university_seat_number VARCHAR(50) NOT NULL,
  
  -- ────── GUARDIAN / FATHER / MOTHER DETAILS ──────
  parent_name VARCHAR(255) NOT NULL,
  parent_occupation VARCHAR(100),
  parent_phone VARCHAR(20) NOT NULL,
  parent_address TEXT,
  
  -- ────── LOCAL GUARDIAN DETAILS ──────
  guardian_name VARCHAR(255) NOT NULL,
  guardian_occupation VARCHAR(100) NOT NULL CHECK (guardian_occupation IN (
    'Government Employee', 'Private Employee', 'Business / Self-Employed',
    'Farmer', 'Doctor', 'Engineer', 'Teacher / Professor', 'Lawyer', 'Others'
  )),
  guardian_phone VARCHAR(20) NOT NULL,
  guardian_address TEXT NOT NULL,
  
  -- ────── HOSTEL DETAILS ──────
  hostel_block VARCHAR(100) NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  food_preference VARCHAR(50) NOT NULL CHECK (food_preference IN ('Vegetarian', 'Non-Vegetarian'))
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_applications_academic_year ON applications(academic_year);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_student_email ON applications(student_email);
CREATE INDEX IF NOT EXISTS idx_applications_university_seat ON applications(university_seat_number);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at DESC);

-- ────────────────────────────────────────────────────────────────────────────────
-- APPLICATION APPROVALS TABLE
-- Tracks approvals and rejections
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS application_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  
  approved_by VARCHAR(255),
  approval_status VARCHAR(50) CHECK (approval_status IN ('approved', 'rejected', 'pending')),
  comments TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_approvals_application_id ON application_approvals(application_id);

-- ────────────────────────────────────────────────────────────────────────────────
-- HOSTEL ASSIGNMENTS TABLE
-- Tracks hostel room assignments
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hostel_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  
  hostel_block VARCHAR(100) NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  check_in_date DATE,
  check_out_date DATE
);

CREATE INDEX IF NOT EXISTS idx_assignments_application_id ON hostel_assignments(application_id);
CREATE INDEX IF NOT EXISTS idx_assignments_room ON hostel_assignments(hostel_block, room_number);

-- ────────────────────────────────────────────────────────────────────────────────
-- HOSTEL ROOMS TABLE
-- Master list of available hostel rooms
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hostel_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  hostel_block VARCHAR(100) NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  capacity INTEGER DEFAULT 1,
  available_beds INTEGER DEFAULT 1,
  room_type VARCHAR(50), -- 'Single', 'Double', 'Triple', 'Quad'
  gender_type VARCHAR(50) CHECK (gender_type IN ('Male', 'Female', 'Mixed')),
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT unique_room UNIQUE (hostel_block, room_number)
);

CREATE INDEX IF NOT EXISTS idx_rooms_hostel_block ON hostel_rooms(hostel_block);
CREATE INDEX IF NOT EXISTS idx_rooms_available ON hostel_rooms(available_beds) WHERE is_active = TRUE;

-- ────────────────────────────────────────────────────────────────────────────────
-- ACADEMIC YEARS TABLE
-- Master list of academic years
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  year_label VARCHAR(20) NOT NULL UNIQUE, -- e.g., "2024-25"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────────────────────────────────────
-- APPLICATION DOCUMENTS TABLE
-- Store supporting documents
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS application_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  
  document_type VARCHAR(100), -- 'photograph', 'proof_of_identity', 'fee_receipt', etc.
  document_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_application_id ON application_documents(application_id);

-- ────────────────────────────────────────────────────────────────────────────────
-- AUDIT LOG TABLE
-- Track all changes and activities
-- ────────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'created', 'updated', 'submitted', 'approved', etc.
  changed_by VARCHAR(255),
  changes JSONB, -- Store what changed
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_application_id ON audit_logs(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);

-- ════════════════════════════════════════════════════════════════════════════════
-- TRIGGERS & FUNCTIONS
-- ════════════════════════════════════════════════════════════════════════════════

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_approvals_updated_at
BEFORE UPDATE ON application_approvals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ════════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ════════════════════════════════════════════════════════════════════════════════

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone (authenticated or anonymous) to create applications
CREATE POLICY "Anyone can create applications"
  ON applications FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read all applications
CREATE POLICY "Anyone can read applications"
  ON applications FOR SELECT
  USING (true);

-- Allow anyone to update applications
CREATE POLICY "Anyone can update applications"
  ON applications FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anyone to insert into audit logs
CREATE POLICY "Anyone can create audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- ════════════════════════════════════════════════════════════════════════════════
-- SEED DATA (Optional)
-- ════════════════════════════════════════════════════════════════════════════════

-- Insert current academic year
INSERT INTO academic_years (year_label, start_date, end_date, is_active)
VALUES ('2024-25', '2024-09-01', '2025-08-31', TRUE)
ON CONFLICT (year_label) DO NOTHING;

-- Insert hostel blocks and rooms
INSERT INTO hostel_rooms (hostel_block, room_number, capacity, available_beds, room_type, gender_type)
VALUES
  ('Boys Hostel 1', 'A-101', 2, 2, 'Double', 'Male'),
  ('Boys Hostel 1', 'A-102', 2, 2, 'Double', 'Male'),
  ('Boys Hostel 1', 'B-101', 1, 1, 'Single', 'Male'),
  ('Boys Hostel 2', 'C-101', 2, 2, 'Double', 'Male'),
  ('Boys Hostel 2', 'C-102', 2, 2, 'Double', 'Male'),
  ('Girls Hostel', 'D-101', 2, 2, 'Double', 'Female'),
  ('Girls Hostel', 'D-102', 2, 2, 'Double', 'Female'),
  ('Girls Hostel', 'E-101', 1, 1, 'Single', 'Female'),
  ('Guest House', 'G-101', 1, 1, 'Single', 'Mixed'),
  ('Guest House', 'G-102', 1, 1, 'Single', 'Mixed')
ON CONFLICT (hostel_block, room_number) DO NOTHING;

-- ════════════════════════════════════════════════════════════════════════════════
