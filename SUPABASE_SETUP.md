# Supabase Integration Setup

## Overview
The Hostel Application Form is now fully integrated with Supabase for data persistence. All form submissions are stored securely in the Supabase database.

## Configuration

### Environment Variables
The following credentials have been added to `.env`:

```env
VITE_SUPABASE_URL=https://fhdejehzaeuvqtivlkyo.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_4Q_9w9cuOtk7ImXFNtnRLg_UpZYffdb
```

### Database Setup
The schema has been defined in `supabase/schema.sql` and includes the following tables:

1. **applications** - Main table for hostel applications
   - Stores all student information
   - Tracks application status (draft, submitted, approved, rejected, pending_review)
   - Automatically timestamps creation and updates
   - Maintains audit trail

2. **application_approvals** - Tracks approval/rejection decisions
   - Links to applications
   - Records approval status and comments
   - Tracks who approved/rejected

3. **hostel_assignments** - Manages room assignments
   - Links approved applications to hostel rooms
   - Tracks check-in and check-out dates

4. **hostel_rooms** - Master list of available rooms
   - Defines hostel blocks and room capacities
   - Tracks available beds
   - Gender type restrictions

5. **academic_years** - Academic year reference data
   - Defines active academic years

6. **application_documents** - Stores supporting documents
   - Links to applications
   - Document type and URL tracking

7. **audit_logs** - Comprehensive audit trail
   - Tracks all changes to applications
   - Records user actions

## Features

### Automatic Data Submission
When a user fills out and submits the form in `src/components/HostelApplicationForm.jsx`, the data is automatically sent to Supabase with:

- Form validation (client-side)
- Loading state management
- Error handling and display
- Automatic audit logging

### Form Fields Stored
All fields from the form are saved to the database:

**Student Details:**
- Name, Phone, Email
- Gender, Age, Date of Birth
- Blood Group
- Passport Photograph (Base64)

**Academic Details:**
- Course, Year, Branch
- University Seat Number

**Guardian Details:**
- Parent/Guardian name, occupation, phone, address
- Local Guardian name, occupation, phone, address

**Hostel Details:**
- Hostel Block
- Room Number
- Food Preference

### API Functions
Located in `src/lib/supabaseClient.js`:

- `submitApplication(formData)` - Submit new application
- `getApplication(applicationId)` - Retrieve specific application
- `getApplicationByEmail(email, academicYear)` - Get user's applications
- `getAllApplications(filters)` - Get all applications (admin)
- `updateApplication(applicationId, updates)` - Update existing application
- `approveApplication(applicationId, status, approvedBy, comments)` - Approve/reject
- `createAssignment(applicationId, hostelBlock, roomNumber, checkInDate)` - Assign room
- `getAssignments(filters)` - Get room assignments
- `getAvailableRooms(hostelBlock, genderType)` - Check room availability
- `getAuditHistory(applicationId)` - View change history
- `createAuditLog(applicationId, action, changedBy, changes)` - Log changes

### Row Level Security (RLS)
The database has Row Level Security (RLS) policies that:

- Allow users to read only their own applications
- Allow users to create new applications under their email
- Allow users to update only their draft applications
- Allow admin users to view all applications

## Database Schema to Execute

To complete the setup, run the SQL from `supabase/schema.sql` in your Supabase SQL editor:

1. Go to Supabase Dashboard
2. Select your project
3. Go to SQL Editor
4. Create a new query
5. Copy the entire content of `supabase/schema.sql`
6. Execute the query

This will:
- Create all required tables
- Set up indexes for performance
- Configure RLS policies
- Seed initial data (academic year, hostel rooms)

## Testing

To test the integration:

1. Fill out the form with test data
2. Click "Submit Form"
3. You should see:
   - A "Submitting..." state
   - Success: The form will process and show the preview
   - Error: An error message will appear if submission fails

Check Supabase Dashboard → Table Editor → `applications` to verify data is being stored.

## Error Handling

The form provides user-friendly error messages for:

- Network errors
- Database constraint violations
- Invalid data
- Authentication issues

Errors are displayed in a red alert box above the action buttons.

## Next Steps

1. **Deploy to Supabase SQL:** Run the schema migration
2. **Test Submissions:** Submit test applications
3. **Admin Dashboard:** Build admin panel to view/approve applications
4. **Email Notifications:** Set up email triggers for approvals
5. **PDF Export:** Generate PDF from submitted data
6. **Room Assignment:** Implement automatic room assignment logic

## Troubleshooting

### "Failed to submit" error
- Check if `.env` file has correct Supabase URL and keys
- Verify Supabase project is accessible
- Check browser console for detailed error

### Data not appearing in database
- Verify SQL schema has been executed
- Check RLS policies aren't blocking writes
- Verify student_email is unique (constraint)

### Connection timeout
- Check internet connection
- Verify Supabase service status
- Try using a different network

## Security Notes

- Photographs are stored as Base64 data URLs in the database
- For large-scale use, consider storing images in Supabase Storage
- RLS policies protect student data from unauthorized access
- Audit logs track all modifications for compliance
