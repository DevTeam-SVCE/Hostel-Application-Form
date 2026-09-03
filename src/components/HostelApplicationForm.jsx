import { useState, useRef } from 'react';
import svceLogo from '../assets/SVCE_LOGO.jpeg';
import './HostelApplicationForm.css';

// ── Dropdown data ──────────────────────────────────────────────
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const COURSE_OPTIONS = ['BE', 'M Tech', 'PG'];

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const BRANCH_MAP = {
  BE: ['CSE', 'CSE-CY', 'CSE-DS', 'CSE-AI', 'ISE', 'ECE', 'Mechanical', 'Civil'],
  'M Tech': ['Structural Engineering'],
  PG: ['MBA', 'MCA'],
};

const HOSTEL_BLOCK_MAP = {
  Male: ['Boys Hostel'],
  Female: ['Girls Hostel'],
  Other: ['Boys Hostel', 'Girls Hostel', 'Guest House'],
  '': ['Boys Hostel', 'Girls Hostel', 'Guest House'],
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const FOOD_OPTIONS = ['Vegetarian', 'Non-Vegetarian'];

const OCCUPATION_OPTIONS = [
  'Government Employee',
  'Private Employee',
  'Business / Self-Employed',
  'Farmer',
  'Doctor',
  'Engineer',
  'Teacher / Professor',
  'Lawyer',
  'Others',
];

// ── Photo upload sub-component ─────────────────────────────────
function PhotoUpload({ value, onChange }) {
  const ref = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="haf-photo-box"
      onClick={() => ref.current.click()}
      onKeyDown={(e) => e.key === 'Enter' && ref.current.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload passport size photograph"
    >
      {value ? (
        <img src={value} alt="Passport photograph" className="haf-photo-img" />
      ) : (
        <div className="haf-photo-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          <span>PASSPORT SIZE</span>
          <span>PHOTOGRAPH</span>
          <span className="haf-photo-hint">Click to upload</span>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  );
}

// ── Section header helper ──────────────────────────────────────
function SectionHeader({ icon, title }) {
  return (
    <div className="haf-section-header">
      <span className="haf-section-icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
    </div>
  );
}

// ── Reusable field wrapper ─────────────────────────────────────
function Field({ label, required, children, half, error }) {
  return (
    <div className={`haf-field${half ? ' haf-field--half' : ''}`}>
      <label className="haf-label">
        {label}{required && <span className="haf-required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && <p className="haf-error" role="alert">⚠ {error}</p>}
    </div>
  );
}

// ── Main form ──────────────────────────────────────────────────
export default function HostelApplicationForm({ onSubmit }) {
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;

  const [form, setForm] = useState({
    photo: '',
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    gender: '',
    age: '',
    dob: '',
    bloodGroup: '',
    course: '',
    year: '',
    branch: '',
    usn: '',
    parentName: '',
    parentOccupation: '',
    parentPhone: '',
    parentAddress: '',
    guardianName: '',
    guardianOccupation: '',
    guardianPhone: '',
    guardianAddress: '',
    hostelBlock: '',
    roomNumber: '',
    foodPreference: '',
  });

  const [errors, setErrors] = useState({});

  // ── Validation ────────────────────────────────────────────────
  function validate(f) {
    const e = {};
    // Student Details
    if (!f.photo)
      e.photo = 'Passport photograph is required.';
    if (!f.studentName.trim())
      e.studentName = 'Student name is required.';
    if (!f.studentPhone.trim())
      e.studentPhone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(f.studentPhone.trim()))
      e.studentPhone = 'Enter a valid 10-digit phone number.';
    if (!f.studentEmail.trim())
      e.studentEmail = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.studentEmail.trim()))
      e.studentEmail = 'Enter a valid email address.';
    if (!f.gender)
      e.gender = 'Gender is required.';
    // Academic Details
    if (!f.course)
      e.course = 'Course is required.';
    if (!f.year)
      e.year = 'Year is required.';
    if (!f.branch)
      e.branch = 'Branch is required.';
    // Guardian / Father / Mother Details
    if (!f.parentName.trim())
      e.parentName = 'Guardian / Parent name is required.';
    if (!f.parentPhone.trim())
      e.parentPhone = 'Guardian / Parent phone number is required.';
    else if (!/^\d{10}$/.test(f.parentPhone.trim()))
      e.parentPhone = 'Enter a valid 10-digit phone number.';
    // Local Guardian Details
    if (!f.guardianName.trim())
      e.guardianName = 'Guardian name is required.';
    if (!f.guardianOccupation)
      e.guardianOccupation = 'Guardian occupation is required.';
    if (!f.guardianPhone.trim())
      e.guardianPhone = 'Guardian phone number is required.';
    else if (!/^\d{10}$/.test(f.guardianPhone.trim()))
      e.guardianPhone = 'Enter a valid 10-digit phone number.';
    if (!f.guardianAddress.trim())
      e.guardianAddress = 'Guardian address is required.';
    // Hostel Details
    if (!f.hostelBlock)
      e.hostelBlock = 'Hostel block is required.';
    if (!f.foodPreference)
      e.foodPreference = 'Food preference is required.';
    return e;
  }

  const set = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'course') updated.branch = '';
      if (field === 'gender') updated.hostelBlock = '';
      return updated;
    });
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      if (field === 'course') delete next.branch;
      if (field === 'gender') delete next.hostelBlock;
      return next;
    });
  };

  const setPhoto = (val) => {
    setForm((prev) => ({ ...prev, photo: val }));
    setErrors((prev) => { const next = { ...prev }; delete next.photo; return next; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[data-field="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const formData = {
      academicYear,
      applicationNo: '001',
      photograph: form.photo,
      studentName: form.studentName,
      studentPhone: form.studentPhone,
      studentEmail: form.studentEmail,
      sex: form.gender,
      age: form.age,
      dob: form.dob,
      bloodGroup: form.bloodGroup,
      course: form.course,
      year: form.year,
      branch: form.branch,
      universityNo: form.usn,
      parentName: form.parentName,
      parentOccupation: form.parentOccupation,
      parentPhone: form.parentPhone,
      parentAddress: form.parentAddress,
      guardianName: form.guardianName,
      guardianOccupation: form.guardianOccupation,
      guardianPhone: form.guardianPhone,
      guardianAddress: form.guardianAddress,
      hostelBlock: form.hostelBlock,
      roomNo: form.roomNumber,
      food: form.foodPreference,
    };
    onSubmit(formData);
  };

  const handleReset = () => {
    setForm({
      photo: '', studentName: '', studentPhone: '', studentEmail: '',
      gender: '', age: '', dob: '', bloodGroup: '',
      course: '', year: '', branch: '', usn: '',
      parentName: '', parentOccupation: '', parentPhone: '', parentAddress: '',
      guardianName: '', guardianOccupation: '', guardianPhone: '', guardianAddress: '',
      hostelBlock: '', roomNumber: '', foodPreference: '',
    });
    setErrors({});
  };

  const branchOptions = BRANCH_MAP[form.course] || [];
  const hostelBlockOptions = HOSTEL_BLOCK_MAP[form.gender] || HOSTEL_BLOCK_MAP[''];

  return (
    <div className="haf-page">
      {/* ── Decorative background panels ── */}
      <div className="haf-bg-left" aria-hidden="true" />
      <div className="haf-bg-right" aria-hidden="true" />

      <div className="haf-container">
        {/* ── College Header ── */}
        <div className="haf-college-header">
          <img src={svceLogo} alt="SVCE Logo" className="haf-college-logo" />
          <div className="haf-college-info">

          </div>
        </div>

        {/* ── Form card ── */}
        <div className="haf-card">
          {/* Card header */}
          <div className="haf-card-header">
            <h2 className="haf-form-title">HOSTEL APPLICATION FORM</h2>
            <p className="haf-academic-year">Academic Year: {academicYear}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* ════════════════════════════════════
                STUDENT DETAILS
            ════════════════════════════════════ */}
            <section className="haf-section">
              <SectionHeader icon="🎓" title="Student Details" />

              <div className="haf-section-body">
                {/* Photo + fields layout */}
                <div className="haf-student-grid">
                  {/* Left: passport photo */}
                  <div className="haf-photo-col">
                    <label className="haf-label">
                      Passport Photograph<span className="haf-required" aria-hidden="true"> *</span>
                    </label>
                    <PhotoUpload value={form.photo} onChange={setPhoto} />
                    {errors.photo && <p className="haf-error" role="alert">⚠ {errors.photo}</p>}
                  </div>

                  {/* Right: student fields */}
                  <div className="haf-student-fields">
                    <div className="haf-row">
                      <Field label="Name of Student" required error={errors.studentName}>
                        <input
                          data-field="studentName"
                          className={`haf-input${errors.studentName ? ' haf-input--error' : ''}`}
                          type="text"
                          placeholder="Enter full name"
                          value={form.studentName}
                          onChange={set('studentName')}
                        />
                      </Field>
                      <Field label="Student Phone Number" required error={errors.studentPhone}>
                        <input
                          data-field="studentPhone"
                          className={`haf-input${errors.studentPhone ? ' haf-input--error' : ''}`}
                          type="tel"
                          placeholder="10-digit number"
                          value={form.studentPhone}
                          onChange={set('studentPhone')}
                          maxLength={10}
                        />
                      </Field>
                    </div>

                    <div className="haf-row">
                      <Field label="Student Email ID" required error={errors.studentEmail}>
                        <input
                          data-field="studentEmail"
                          className={`haf-input${errors.studentEmail ? ' haf-input--error' : ''}`}
                          type="email"
                          placeholder="example@email.com"
                          value={form.studentEmail}
                          onChange={set('studentEmail')}
                        />
                      </Field>
                      <Field label="Gender" required error={errors.gender}>
                        <select
                          data-field="gender"
                          className={`haf-select${errors.gender ? ' haf-select--error' : ''}`}
                          value={form.gender}
                          onChange={set('gender')}
                        >
                          <option value="">Select gender</option>
                          {GENDER_OPTIONS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="haf-row haf-row--3">
                      <Field label="Age">
                        <input
                          className="haf-input"
                          type="number"
                          placeholder="e.g. 18"
                          value={form.age}
                          onChange={set('age')}
                          min={15}
                          max={35}
                        />
                      </Field>
                      <Field label="Date of Birth">
                        <input
                          className="haf-input"
                          type="date"
                          value={form.dob}
                          onChange={set('dob')}
                        />
                      </Field>
                      <Field label="Blood Group">
                        <select className="haf-select" value={form.bloodGroup} onChange={set('bloodGroup')}>
                          <option value="">Select blood group</option>
                          {BLOOD_GROUPS.map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════
                ACADEMIC DETAILS
            ════════════════════════════════════ */}
            <section className="haf-section">
              <SectionHeader icon="📚" title="Academic Details" />
              <div className="haf-section-body">
                <div className="haf-row">
                  <Field label="Course" required error={errors.course}>
                    <select
                      data-field="course"
                      className={`haf-select${errors.course ? ' haf-select--error' : ''}`}
                      value={form.course}
                      onChange={set('course')}
                    >
                      <option value="">Select course</option>
                      {COURSE_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Year" required error={errors.year}>
                    <select
                      data-field="year"
                      className={`haf-select${errors.year ? ' haf-select--error' : ''}`}
                      value={form.year}
                      onChange={set('year')}
                    >
                      <option value="">Select year</option>
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="haf-row">
                  <Field label="Branch" required error={errors.branch}>
                    <select
                      data-field="branch"
                      className={`haf-select${errors.branch ? ' haf-select--error' : ''}`}
                      value={form.branch}
                      onChange={set('branch')}
                      disabled={!form.course}
                    >
                      <option value="">
                        {form.course ? 'Select branch' : 'Select course first'}
                      </option>
                      {branchOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="University Seat Number">
                    <input
                      className="haf-input"
                      type="text"
                      placeholder="e.g. 1SI22CS001"
                      value={form.usn}
                      onChange={set('usn')}
                    />
                  </Field>

                </div>
              </div>
            </section>

            {/* ════════════════════════════════════
                PARENT / MOTHER DETAILS
            ════════════════════════════════════ */}
            <section className="haf-section">
              <SectionHeader icon="👨‍👩‍👧" title="Guardian / Father / Mother Details" />
              <div className="haf-section-body">
                <div className="haf-row">
                  <Field label="Guardian / Father / Mother Name" required error={errors.parentName}>
                    <input
                      data-field="parentName"
                      className={`haf-input${errors.parentName ? ' haf-input--error' : ''}`}
                      type="text"
                      placeholder="Enter name"
                      value={form.parentName}
                      onChange={set('parentName')}
                    />
                  </Field>
                  <Field label="Occupation">
                    <select className="haf-select" value={form.parentOccupation} onChange={set('parentOccupation')}>
                      <option value="">Select occupation</option>
                      {OCCUPATION_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="haf-row">
                  <Field label="Phone Number" required error={errors.parentPhone}>
                    <input
                      data-field="parentPhone"
                      className={`haf-input${errors.parentPhone ? ' haf-input--error' : ''}`}
                      type="tel"
                      placeholder="10-digit number"
                      value={form.parentPhone}
                      onChange={set('parentPhone')}
                      maxLength={10}
                    />
                  </Field>
                </div>

                <div className="haf-row haf-row--full">
                  <Field label="Address">
                    <textarea
                      className="haf-textarea"
                      placeholder="Enter full address"
                      value={form.parentAddress}
                      onChange={set('parentAddress')}
                      rows={3}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════
                LOCAL GUARDIAN DETAILS
            ════════════════════════════════════ */}
            <section className="haf-section">
              <SectionHeader icon="🏠" title="Local Guardian Details" />
              <div className="haf-section-body">
                <div className="haf-row">
                  <Field label="Guardian Name" required error={errors.guardianName}>
                    <input
                      data-field="guardianName"
                      className={`haf-input${errors.guardianName ? ' haf-input--error' : ''}`}
                      type="text"
                      placeholder="Enter name"
                      value={form.guardianName}
                      onChange={set('guardianName')}
                    />
                  </Field>
                  <Field label="Guardian Occupation" required error={errors.guardianOccupation}>
                    <select
                      data-field="guardianOccupation"
                      className={`haf-select${errors.guardianOccupation ? ' haf-select--error' : ''}`}
                      value={form.guardianOccupation}
                      onChange={set('guardianOccupation')}
                    >
                      <option value="">Select occupation</option>
                      {OCCUPATION_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="haf-row">
                  <Field label="Guardian Phone" required error={errors.guardianPhone}>
                    <input
                      data-field="guardianPhone"
                      className={`haf-input${errors.guardianPhone ? ' haf-input--error' : ''}`}
                      type="tel"
                      placeholder="10-digit number"
                      value={form.guardianPhone}
                      onChange={set('guardianPhone')}
                      maxLength={10}
                    />
                  </Field>
                </div>

                <div className="haf-row haf-row--full">
                  <Field label="Guardian Address" required error={errors.guardianAddress}>
                    <textarea
                      data-field="guardianAddress"
                      className={`haf-textarea${errors.guardianAddress ? ' haf-input--error' : ''}`}
                      placeholder="Enter full address"
                      value={form.guardianAddress}
                      onChange={set('guardianAddress')}
                      rows={3}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════
                HOSTEL DETAILS
            ════════════════════════════════════ */}
            <section className="haf-section">
              <SectionHeader icon="🏨" title="Hostel Details" />
              <div className="haf-section-body">
                <div className="haf-row">
                  <Field label="Hostel Block" required error={errors.hostelBlock}>
                    <select
                      data-field="hostelBlock"
                      className={`haf-select${errors.hostelBlock ? ' haf-select--error' : ''}`}
                      value={form.hostelBlock}
                      onChange={set('hostelBlock')}
                    >
                      <option value="">Select hostel block</option>
                      {hostelBlockOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {!form.gender && (
                      <p className="haf-hint">Select gender to filter hostel options</p>
                    )}
                  </Field>
                  <Field label="Room Number">
                    <input
                      className="haf-input"
                      type="text"
                      placeholder="e.g. A-101"
                      value={form.roomNumber}
                      onChange={set('roomNumber')}
                    />
                  </Field>
                </div>

                <div className="haf-row">
                  <Field label="Food Preference" required error={errors.foodPreference}>
                    <div
                      data-field="foodPreference"
                      className={`haf-radio-group${errors.foodPreference ? ' haf-radio-group--error' : ''}`}
                      role="radiogroup"
                      aria-label="Food preference"
                    >
                      {FOOD_OPTIONS.map((f) => (
                        <label key={f} className="haf-radio-label">
                          <input
                            type="radio"
                            name="foodPreference"
                            value={f}
                            checked={form.foodPreference === f}
                            onChange={set('foodPreference')}
                            className="haf-radio"
                          />
                          <span className={`haf-radio-pill${form.foodPreference === f ? ' haf-radio-pill--active' : ''}`}>
                            {f === 'Vegetarian' ? '🥦' : '🍗'} {f}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>
            </section>

            {/* ── Action buttons ── */}
            <div className="haf-actions">
              <button type="button" className="haf-btn haf-btn--ghost" onClick={handleReset}>
                Reset Form
              </button>
              <button type="submit" className="haf-btn haf-btn--primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Form
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
