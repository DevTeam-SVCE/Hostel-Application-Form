import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Submit a hostel application
 * @param {Object} formData - Form data from HostelApplicationForm
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const submitApplication = async (formData) => {
  try {
    // Convert form data format to database format
    const applicationData = {
      academic_year: formData.academicYear,
      application_no: formData.applicationNo || generateApplicationNumber(),
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      
      // Student Details
      student_name: formData.studentName,
      student_phone: formData.studentPhone,
      student_email: formData.studentEmail,
      gender: formData.sex,
      age: parseInt(formData.age),
      date_of_birth: formData.dob,
      blood_group: formData.bloodGroup,
      photograph: formData.photograph, // Base64 or URL
      
      // Academic Details
      course: formData.course,
      year: formData.year,
      branch: formData.branch,
      university_seat_number: formData.universityNo,
      
      // Guardian Details
      parent_name: formData.parentName,
      parent_occupation: formData.parentOccupation,
      parent_phone: formData.parentPhone,
      parent_address: formData.parentAddress,
      
      // Local Guardian Details
      guardian_name: formData.guardianName,
      guardian_occupation: formData.guardianOccupation,
      guardian_phone: formData.guardianPhone,
      guardian_address: formData.guardianAddress,
      
      // Hostel Details
      hostel_block: formData.hostelBlock,
      room_number: formData.roomNo,
      food_preference: formData.food,
    };

    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return { data: null, error };
    }

    // Log audit trail
    if (data && data.length > 0) {
      await createAuditLog(data[0].id, 'created', formData.studentEmail, {
        status: 'Application submitted',
      });
    }

    return { data, error: null };
  } catch (err) {
    console.error('Submit error:', err);
    return { data: null, error: err };
  }
};

/**
 * Update an existing application
 * @param {string} applicationId - Application UUID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const updateApplication = async (applicationId, updates) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', applicationId)
      .select();

    if (error) throw error;

    // Log changes
    if (data && data.length > 0) {
      await createAuditLog(applicationId, 'updated', null, updates);
    }

    return { data, error: null };
  } catch (err) {
    console.error('Update error:', err);
    return { data: null, error: err };
  }
};

/**
 * Get application by ID
 * @param {string} applicationId - Application UUID
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const getApplication = async (applicationId) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    return { data, error };
  } catch (err) {
    console.error('Fetch error:', err);
    return { data: null, error: err };
  }
};

/**
 * Get application by email
 * @param {string} email - Student email
 * @param {string} academicYear - Academic year
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getApplicationByEmail = async (email, academicYear) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('student_email', email)
      .eq('academic_year', academicYear)
      .order('created_at', { ascending: false });

    return { data, error };
  } catch (err) {
    console.error('Fetch error:', err);
    return { data: null, error: err };
  }
};

/**
 * Get all applications for admin (with filtering)
 * @param {Object} filters - Filter criteria
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getAllApplications = async (filters = {}) => {
  try {
    let query = supabase.from('applications').select('*');

    if (filters.academicYear) {
      query = query.eq('academic_year', filters.academicYear);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.hostelBlock) {
      query = query.eq('hostel_block', filters.hostelBlock);
    }
    if (filters.course) {
      query = query.eq('course', filters.course);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return { data, error };
  } catch (err) {
    console.error('Fetch error:', err);
    return { data: null, error: err };
  }
};

/**
 * Update application approval status
 * @param {string} applicationId - Application UUID
 * @param {string} status - 'approved' or 'rejected'
 * @param {string} approvedBy - Admin email
 * @param {string} comments - Reason/comments
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const approveApplication = async (applicationId, status, approvedBy, comments = '') => {
  try {
    // Update application status
    const { error: updateError } = await supabase
      .from('applications')
      .update({ status: status === 'approved' ? 'approved' : 'rejected' })
      .eq('id', applicationId);

    if (updateError) throw updateError;

    // Record approval
    const { data, error } = await supabase
      .from('application_approvals')
      .insert([
        {
          application_id: applicationId,
          approval_status: status,
          approved_by: approvedBy,
          comments,
        },
      ])
      .select();

    if (error) throw error;

    // Log audit
    await createAuditLog(applicationId, `${status}`, approvedBy, { comments });

    return { data, error: null };
  } catch (err) {
    console.error('Approval error:', err);
    return { data: null, error: err };
  }
};

/**
 * Create hostel assignment
 * @param {string} applicationId - Application UUID
 * @param {string} hostelBlock - Hostel block name
 * @param {string} roomNumber - Room number
 * @param {Date} checkInDate - Move-in date
 * @returns {Promise<{data: Object, error: Object}>}
 */
export const createAssignment = async (applicationId, hostelBlock, roomNumber, checkInDate) => {
  try {
    const { data, error } = await supabase
      .from('hostel_assignments')
      .insert([
        {
          application_id: applicationId,
          hostel_block: hostelBlock,
          room_number: roomNumber,
          check_in_date: checkInDate,
        },
      ])
      .select();

    if (error) throw error;

    // Update room availability
    await supabase.rpc('decrement_available_beds', {
      p_hostel_block: hostelBlock,
      p_room_number: roomNumber,
    });

    return { data, error: null };
  } catch (err) {
    console.error('Assignment error:', err);
    return { data: null, error: err };
  }
};

/**
 * Get hostel assignments
 * @param {Object} filters - Filter criteria
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getAssignments = async (filters = {}) => {
  try {
    let query = supabase
      .from('hostel_assignments')
      .select('*, applications(student_name, student_email, gender)');

    if (filters.hostelBlock) {
      query = query.eq('hostel_block', filters.hostelBlock);
    }
    if (filters.roomNumber) {
      query = query.eq('room_number', filters.roomNumber);
    }

    const { data, error } = await query;

    return { data, error };
  } catch (err) {
    console.error('Fetch assignments error:', err);
    return { data: null, error: err };
  }
};

/**
 * Get available rooms
 * @param {string} hostelBlock - Hostel block filter (optional)
 * @param {string} genderType - Gender type filter (optional)
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getAvailableRooms = async (hostelBlock, genderType) => {
  try {
    let query = supabase
      .from('hostel_rooms')
      .select('*')
      .eq('is_active', true)
      .gt('available_beds', 0);

    if (hostelBlock) {
      query = query.eq('hostel_block', hostelBlock);
    }
    if (genderType) {
      query = query.in('gender_type', [genderType, 'Mixed']);
    }

    const { data, error } = await query;

    return { data, error };
  } catch (err) {
    console.error('Fetch rooms error:', err);
    return { data: null, error: err };
  }
};

/**
 * Create audit log entry
 * @param {string} applicationId - Application UUID
 * @param {string} action - Action performed
 * @param {string} changedBy - User who made change
 * @param {Object} changes - Changes object
 * @returns {Promise}
 */
export const createAuditLog = async (applicationId, action, changedBy, changes) => {
  try {
    await supabase.from('audit_logs').insert([
      {
        application_id: applicationId,
        action,
        changed_by: changedBy,
        changes,
      },
    ]);
  } catch (err) {
    console.error('Audit log error:', err);
  }
};

/**
 * Get audit history for application
 * @param {string} applicationId - Application UUID
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const getAuditHistory = async (applicationId) => {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });

    return { data, error };
  } catch (err) {
    console.error('Audit history error:', err);
    return { data: null, error: err };
  }
};

/**
 * Generate unique application number
 * @returns {string}
 */
const generateApplicationNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `APP-${timestamp}-${random}`;
};

/**
 * Batch upload applications
 * @param {Array} applications - Array of application objects
 * @returns {Promise<{data: Array, error: Object}>}
 */
export const batchUploadApplications = async (applications) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert(applications)
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (err) {
    console.error('Batch upload error:', err);
    return { data: null, error: err };
  }
};

/**
 * Delete application (admin only)
 * @param {string} applicationId - Application UUID
 * @returns {Promise<{error: Object}>}
 */
export const deleteApplication = async (applicationId) => {
  try {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', applicationId);

    if (error) throw error;

    await createAuditLog(applicationId, 'deleted', null, {});

    return { error: null };
  } catch (err) {
    console.error('Delete error:', err);
    return { error: err };
  }
};

export default supabase;
