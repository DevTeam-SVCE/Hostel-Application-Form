# Hostel Application Form - Supabase Schema Documentation

## Overview

This document describes the database schema for the Hostel Application Form system in Supabase. The schema is designed to store all form data, manage hostel assignments, track approvals, and maintain audit logs.

---

## Tables

### 1. **applications** (Primary Table)

Stores all hostel application form submissions.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| `id` | UUID | PRIMARY KEY | Unique application identifier |
| `academic_year` | VARCHAR(20) | NOT NULL | Academic year (e.g., "2024-25") |
| `application_no` | VARCHAR(50) | UNIQUE, NOT NULL | Application reference number |
| `status` | VARCHAR(50) | DEFAULT 'draft' | Status: draft, submitted, approved, rejected, pending_review |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |
| `submitted_at` | TIMESTAMP | NULL | When application was submitted |
| | | | |
| **STUDENT DETAILS** | | | |
| `student_name` | VARCHAR(255) | NOT NULL | Full name of student |
| `student_phone` | VARCHAR(20) | NOT NULL | 10-digit phone number |
| `student_email` | VARCHAR(255) | NOT NULL, UNIQUE | Email address |
| `gender` | VARCHAR(50) | NOT NULL | Male or Female |
| `age` | INTEGER | NOT NULL, CHECK(15-35) | Age in years |
| `date_of_birth` | DATE | NOT NULL | DOB for verification |
| `blood_group` | VARCHAR(10) | NULL | Blood group (A+, B-, O+, etc.) |
| `photograph` | TEXT | NULL | Base64 or URL to passport photo |
| | | | |
| **ACADEMIC DETAILS** | | | |
| `course` | VARCHAR(100) | NOT NULL | BE, M Tech, or PG |
| `year` | VARCHAR(50) | NOT NULL | 1st-4th Year |
| `branch` | VARCHAR(100) | NOT NULL | CSE, ECE, Mechanical, etc. |
| `university_seat_number` | VARCHAR(50) | NOT NULL, UNIQUE | USN/Contineo ID |
| | | | |
| **GUARDIAN / PARENT DETAILS** | | | |
| `parent_name` | VARCHAR(255) | NOT NULL | Guardian/Father/Mother name |
| `parent_occupation` | VARCHAR(100) | NULL | Occupation |
| `parent_phone` | VARCHAR(20) | NOT NULL | 10-digit phone number |
| `parent_address` | TEXT | NULL | Full address |
| | | | |
| **LOCAL GUARDIAN DETAILS** | | | |
| `guardian_name` | VARCHAR(255) | NOT NULL | Local guardian name |
| `guardian_occupation` | VARCHAR(100) | NOT NULL | Occupation (enum) |
| `guardian_phone` | VARCHAR(20) | NOT NULL | 10-digit phone number |
| `guardian_address` | TEXT | NOT NULL | Full address |
| | | | |
| **HOSTEL DETAILS** | | | |
| `hostel_block` | VARCHAR(100) | NOT NULL | Boys Hostel 1/2, Girls Hostel, Guest House |
| `room_number` | VARCHAR(50) | NOT NULL | Room identifier (e.g., A-101) |
| `food_preference` | VARCHAR(50) | NOT NULL | Vegetarian or Non-Vegetarian |

**Indexes:**
- `academic_year` - Filter by academic year
- `status` - Filter by application status
- `student_email` - Quick lookup by email
- `university_seat_number` - Verify uniqueness
- `created_at`, `submitted_at` - Sorting and filtering

---

### 2. **application_approvals**

Tracks approval/rejection workflow for applications.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `application_id` | UUID | Reference to applications table |
| `approved_by` | VARCHAR(255) | Admin/warden who reviewed |
| `approval_status` | VARCHAR(50) | approved, rejected, pending |
| `comments` | TEXT | Reason for approval/rejection |
| `created_at` | TIMESTAMP | When decision was made |
| `updated_at` | TIMESTAMP | Last update |

---

### 3. **hostel_assignments**

Tracks room assignments for accepted applications.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `application_id` | UUID | Reference to applications |
| `hostel_block` | VARCHAR(100) | Assigned hostel block |
| `room_number` | VARCHAR(50) | Assigned room number |
| `assigned_at` | TIMESTAMP | When assignment was made |
| `check_in_date` | DATE | Move-in date |
| `check_out_date` | DATE | Move-out date |

**Constraint:** Ensures each room is assigned to only one student per semester.

---

### 4. **hostel_rooms**

Master list of available rooms in hostels.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `hostel_block` | VARCHAR(100) | Hostel name |
| `room_number` | VARCHAR(50) | Room identifier |
| `capacity` | INTEGER | Number of beds |
| `available_beds` | INTEGER | Currently available beds |
| `room_type` | VARCHAR(50) | Single, Double, Triple, Quad |
| `gender_type` | VARCHAR(50) | Male, Female, Mixed |
| `is_active` | BOOLEAN | Active/Inactive status |
| `created_at` | TIMESTAMP | When room was added |

---

### 5. **academic_years**

Master list of academic years.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `year_label` | VARCHAR(20) | Label (e.g., "2024-25") |
| `start_date` | DATE | Start date |
| `end_date` | DATE | End date |
| `is_active` | BOOLEAN | Currently active year |
| `created_at` | TIMESTAMP | When added |

---

### 6. **application_documents**

Store supporting documents or additional files.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `application_id` | UUID | Reference to applications |
| `document_type` | VARCHAR(100) | Type of document |
| `document_url` | TEXT | URL/path to document |
| `uploaded_at` | TIMESTAMP | Upload time |

---

### 7. **audit_logs**

Complete audit trail of all changes.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `application_id` | UUID | Related application |
| `action` | VARCHAR(100) | created, updated, submitted, etc. |
| `changed_by` | VARCHAR(255) | Who made the change |
| `changes` | JSONB | What changed (key-value pairs) |
| `created_at` | TIMESTAMP | When change occurred |

---

## Enums & Constants

### Gender
- `Male`
- `Female`

### Course
- `BE` (Bachelor of Engineering)
- `M Tech` (Master of Technology)
- `PG` (Postgraduate)

### Year
- `1st Year`
- `2nd Year`
- `3rd Year`
- `4th Year`

### Branches (varies by course)
**BE:** CSE, CSE-CY, CSE-DS, CSE-AI, ISE, ECE, Mechanical, Civil
**M Tech:** Structural Engineering
**PG:** MBA, MCA

### Guardian Occupation
- Government Employee
- Private Employee
- Business / Self-Employed
- Farmer
- Doctor
- Engineer
- Teacher / Professor
- Lawyer
- Others

### Hostel Blocks
- Boys Hostel 1
- Boys Hostel 2
- Girls Hostel
- Guest House

### Food Preference
- Vegetarian
- Non-Vegetarian

### Application Status
- `draft` - Not yet submitted
- `submitted` - Submitted, awaiting review
- `pending_review` - Under review
- `approved` - Approved, awaiting hostel assignment
- `rejected` - Application rejected

---

## Row Level Security (RLS)

The schema includes RLS policies for data privacy:

1. **Users can read own applications** - Students can only view their own applications
2. **Users can create applications** - Only authenticated users can submit applications
3. **Users can update own draft applications** - Students can only edit drafts
4. **Admins can read all applications** - Admins with role='admin' can view all data

---

## Relationships

```
applications (1) ──────── (M) application_approvals
applications (1) ──────── (M) hostel_assignments ────── (M) hostel_rooms
applications (1) ──────── (M) application_documents
applications (1) ──────── (M) audit_logs
academic_years (1) ────── (M) applications
```

---

## Migrations & Setup

### To set up in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Create new query
3. Copy entire contents of `schema.sql`
4. Execute

### To connect from React:

```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
)
```

---

## Example Queries

### Submit an application
```javascript
const { data, error } = await supabase
  .from('applications')
  .insert([
    {
      academic_year: '2024-25',
      application_no: '001',
      student_name: 'John Doe',
      student_phone: '9876543210',
      student_email: 'john@example.com',
      // ... other fields
    }
  ])
```

### Update application status
```javascript
const { data, error } = await supabase
  .from('applications')
  .update({ status: 'submitted', submitted_at: new Date() })
  .eq('id', applicationId)
```

### Get all applications for a semester
```javascript
const { data, error } = await supabase
  .from('applications')
  .select('*')
  .eq('academic_year', '2024-25')
  .eq('status', 'submitted')
```

### Get hostel assignments
```javascript
const { data, error } = await supabase
  .from('hostel_assignments')
  .select('*, applications(student_name, student_email)')
  .eq('hostel_block', 'Boys Hostel 1')
```

---

## Performance Considerations

1. **Indexes** - Created on frequently queried columns
2. **Partitioning** - Consider partitioning by academic_year for large datasets
3. **Archive** - Archive old applications to separate table after academic year ends
4. **Batch operations** - Use batch inserts for bulk uploads

---

## Backup & Recovery

- Enable automatic backups in Supabase settings
- Test restoration procedures regularly
- Keep schema version in git

---

## Notes

- All phone numbers are stored as VARCHAR(20) to support international formats if needed
- Photographs can be stored as Base64 strings or URLs to cloud storage (Firebase, AWS S3, etc.)
- Academic year format is "YYYY-YY" (e.g., "2024-25")
- All timestamps are in UTC timezone with timezone info
- Email addresses are unique per academic year to prevent duplicate applications

