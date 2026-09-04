import svceLogo from './assets/SVCE_LOGO.jpeg';

// ── Styles are module-level constants so Row can reference them ──
const styles = {
    body: {
      margin: 0,
      padding: "10px",
      background: "#eeeeee",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#111",
    },
    a4Page: {
      width: "210mm",
      margin: "0 auto 10px auto",
      background: "white",
      padding: "8mm",
      position: "relative",
    },
    collegeHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "2px solid #000",
      paddingBottom: "6px",
    },
    logo: {
     
      
      objectFit: "contain",
      marginRight: "12px",
    },
    collegeName: { textAlign: "center" },
    collegeH1: { fontSize: "19px", margin: 0, fontWeight: "bold" },
    collegeH2: { fontSize: "17px", margin: "6px 0 0" },
    collegeP:  { fontSize: "11px", margin: "3px 0" },
    formCode: {
      textAlign: "right",
      fontWeight: "bold",
      fontSize: "11px",
      marginTop: "3px",
    },
    applicationInfo: {
      display: "flex",
      justifyContent: "space-between",
      border: "1px solid #000",
      padding: "4px 8px",
      fontSize: "12px",
      marginBottom: "4px",
    },
    sectionTitle: {
      background: "#eeeeee",
      border: "1px solid #000",
      padding: "3px 6px",
      fontWeight: "bold",
      fontSize: "12px",
    },
    formTable: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "12px",
    },
    label: {
      fontWeight: "bold",
      width: "20%",
      border: "1px solid #000",
      padding: "3px 7px",
      height: "auto",
      minHeight: "23px",
      whiteSpace: "normal",
    },
    valueCell: {
      border: "1px solid #000",
      padding: "3px 7px",
      height: "auto",
      minHeight: "23px",
      fontSize: "12px",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      wordWrap: "break-word",
      whiteSpace: "normal",
      overflow: "visible",
    },
    photoCell: {
      width: "38mm",
      textAlign: "center",
      verticalAlign: "middle",
      border: "1px solid #000",
      padding: "5px 7px",
    },
    photoBox: {
      width: "35mm",
      height: "45mm",
      border: "1px solid #000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontSize: "10px",
      fontWeight: "bold",
      margin: "auto",
      overflow: "hidden",
    },
    photoImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    signatureSection: { marginTop: "3px" },
    signatureTable: { width: "100%", borderCollapse: "collapse" },
    signatureTd: {
      border: "1px solid #000",
      height: "80px",
      verticalAlign: "bottom",
      textAlign: "center",
      fontSize: "11px",
      paddingBottom: "5px",
    },
    rulesPage: { padding: "12mm" },
    formCodeTop: {
      textAlign: "right",
      fontWeight: "bold",
      fontSize: "12px",
      marginBottom: "4px",
    },
    rulesTitle: {
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
      textDecoration: "underline",
      marginBottom: "8px",
    },
    subHeading: {
      fontSize: "14px",
      fontWeight: "bold",
      marginTop: "6px",
      marginBottom: "4px",
    },
    rulesList: {
      fontSize: "11.5px",
      lineHeight: 1.2,
      paddingLeft: 0,
      margin: 0,
    },
    rulesLi: {
      marginBottom: "3px",
      textAlign: "justify",
      paddingLeft: "4px",
    },
    additionalHeading: {
      fontWeight: "bold",
      textDecoration: "underline",
      marginTop: "8px",
      marginBottom: "4px",
      fontSize: "13px",
    },
    noteText: { marginTop: "8px", fontSize: "12px", fontWeight: "bold" },
    undertakingTitle: {
      textAlign: "center",
      fontWeight: "bold",
      textDecoration: "underline",
      fontSize: "14px",
      marginTop: "8px",
      marginBottom: "4px",
    },
    declarationTitle: {
      textAlign: "center",
      fontWeight: "bold",
      textDecoration: "underline",
      fontSize: "14px",
      marginTop: "8px",
      marginBottom: "4px",
    },
    undertakingText: { fontSize: "12px", lineHeight: 1.25, textAlign: "justify" },
    declarationText: { fontSize: "12px", lineHeight: 1.25, textAlign: "justify" },
    signLine: {
      textAlign: "right",
      fontSize: "12px",
      marginTop: "25px",
      fontWeight: "bold",
    },
    dotted: {
      borderBottom: "1px dotted #000",
      display: "inline-block",
      minWidth: "160px",
    },
};

// ── Row helper — declared outside the component to satisfy the React
//    Compiler's static-components rule ─────────────────────────────
function Row({ label, value }) {
  return (
    <tr>
      <td style={styles.label}>{label}</td>
      <td style={styles.valueCell}>{value}</td>
    </tr>
  );
}

export default function HostelApplicationForm({ data = {}, onBack }) {
  const {
    academicYear    = "",
    applicationNo   = "",
    photograph      = null,
    studentName     = "",
    studentPhone    = "",
    studentEmail    = "",
    sex             = "",
    age             = "",
    dob             = "",
    bloodGroup      = "",
    course          = "",
    year            = "",
    branch          = "",
    universityNo    = "",
    parentName      = "",
    parentOccupation= "",
    parentPhone     = "",
    parentAddress   = "",
    guardianName    = "",
    guardianOccupation = "",
    guardianPhone   = "",
    guardianAddress = "",
    hostelBlock     = "",
    roomNo          = "",
    food            = "",
  } = data;

  return (
    <div style={styles.body}>
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          * {
            margin: 0 !important;
            padding: 0 !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            font-size: 12px;
            height: auto;
          }
          @page {
            size: A4;
            margin: 6mm;
          }
          .print-page-break {
            page-break-before: always;
          }
          /* Ensure proper page layout with margins */
          .haf-print-page {
            padding: 5mm !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            box-sizing: border-box !important;
            page-break-after: auto;
            page-break-inside: avoid;
            overflow: hidden;
          }
          /* Ensure content stays within page bounds */
          table {
            width: 100% !important;
            table-layout: fixed;
            page-break-inside: avoid;
          }
          td {
            box-sizing: border-box !important;
            page-break-inside: avoid;
          }
          ol {
            margin: 0 !important;
            padding-left: 18px !important;
            page-break-inside: avoid;
          }
          li {
            margin-bottom: 2px !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* ── PAGE 1 – Application Form ── */}
      <div style={styles.a4Page} className="haf-print-page">
        <div style={styles.collegeHeader}>
          <div style={{ textAlign: "center" }}>
            <img src={svceLogo} style={styles.logo} alt="SVCE Logo" />
            <h2 style={styles.collegeH2}>HOSTEL APPLICATION FORM</h2>
          </div>
        </div>
      
        <div style={styles.formCode}>HOS01</div>

        <div style={styles.applicationInfo}>
          <div><strong>ACADEMIC YEAR:</strong> {academicYear}</div>
          <div><strong>APPLICATION NO:</strong> {applicationNo}</div>
        </div>

        <div style={styles.sectionTitle}>STUDENT DETAILS</div>

        <table style={styles.formTable}>
          <tbody>
            <tr>
              <td style={styles.photoCell} rowSpan={7}>
                <div style={styles.photoBox}>
                  {photograph
                    ? <img src={photograph} style={styles.photoImg} alt="Passport Photograph" />
                    : <>PASSPORT SIZE<br />PHOTOGRAPH</>
                  }
                </div>
              </td>
              <td style={styles.label}>Name of Student</td>
              <td style={styles.valueCell}>{studentName}</td>
            </tr>
            <tr>
              <td style={styles.label}>Student Phone Number</td>
              <td style={styles.valueCell}>{studentPhone}</td>
            </tr>
            <tr>
              <td style={styles.label}>Student Email ID</td>
              <td style={styles.valueCell}>{studentEmail}</td>
            </tr>
            <tr>
              <td style={styles.label}>Gender</td>
              <td style={styles.valueCell}>{sex}</td>
            </tr>
            <tr>
              <td style={styles.label}>Age</td>
              <td style={styles.valueCell}>{age}</td>
            </tr>
            <tr>
              <td style={styles.label}>Date of Birth</td>
              <td style={styles.valueCell}>{dob}</td>
            </tr>
            <tr>
              <td style={styles.label}>Blood Group</td>
              <td style={styles.valueCell}>{bloodGroup}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>ACADEMIC DETAILS</div>

        <table style={styles.formTable}>
          <tbody>
            <Row label="Course"                 value={course}      />
            <Row label="Year"                   value={year}        />
            <Row label="Branch"                 value={branch}      />
            <Row label="University Seat Number" value={universityNo}/>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>GAURDIAN/ FATHER/ MOTHER DETAILS</div>

        <table style={styles.formTable}>
          <tbody>
            <tr>
              <td style={styles.label}>Gaurdian/ Father/ Mother Name</td>
              <td style={styles.valueCell}>{parentName}</td>
              <td style={styles.label}>Occupation</td>
              <td style={{...styles.valueCell, wordBreak: 'break-word', whiteSpace: 'normal'}}>{parentOccupation}</td>
            </tr>
            <tr>
              <td style={styles.label}>Phone Number</td>
              <td style={styles.valueCell}>{parentPhone}</td>
              <td style={{...styles.label, verticalAlign: 'top'}}>Address</td>
              <td style={{...styles.valueCell, verticalAlign: 'top', height: 'auto', minHeight: '54px', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal'}}>{parentAddress}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>LOCAL GUARDIAN DETAILS</div>

        <table style={styles.formTable}>
          <tbody>
            <tr>
              <td style={styles.label}>Guardian Name</td>
              <td style={styles.valueCell}>{guardianName}</td>
              <td style={styles.label}>Guardian Occupation</td>
              <td style={{...styles.valueCell, wordBreak: 'break-word', whiteSpace: 'normal'}}>{guardianOccupation}</td>
            </tr>
            <tr>
              <td style={styles.label}>Guardian Phone</td>
              <td style={styles.valueCell}>{guardianPhone}</td>
              <td style={{...styles.label, verticalAlign: 'top'}}>Guardian Address</td>
              <td style={{...styles.valueCell, verticalAlign: 'top', height: 'auto', minHeight: '54px', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal'}}>{guardianAddress}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.sectionTitle}>HOSTEL DETAILS</div>

        <table style={styles.formTable}>
          <tbody>
            <Row label="Hostel Block"  value={hostelBlock} />
            <Row label="Room Number"   value={roomNo}      />
            <Row label="Food"          value={food}        />
          </tbody>
        </table>

        <div style={styles.signatureSection}>
          <table style={styles.signatureTable}>
            <tbody>
              <tr>
                <td style={styles.signatureTd}>Student Signature</td>
                <td style={styles.signatureTd}>Warden Signature</td>
                <td style={styles.signatureTd}>Principal Signature</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PAGE 2 – Rules & Regulations (part 1) ── */}
      <div style={{ ...styles.a4Page, ...styles.rulesPage }} className="print-page-break haf-print-page">
        <div style={styles.formCodeTop}>HOS01</div>

        <div style={styles.rulesTitle}>Rules and Regulations of Hostel</div>

        <div style={styles.subHeading}>Regulations:</div>

        <ol style={styles.rulesList}>
          {[
            "Hostel accommodation is provided with the Condition that the resident student will strictly abide by the Hostel Rules currently in force or as may be enforced from time to time.",
            "Accommodation in the Hostel cannot be claimed as a matter of right.",
            "The Institute Administration may refuse accommodation to any student who is known to have grossly violated the Hostel Rules or whose presence is likely to disturb the peace and tranquility of hostel.",
            "Violation of hostel rules will make the student liable to disciplinary action including permanent expulsion from the hostel/Institute.",
            "Students must remember that hostel is the home of the student on the campus and therefore, he/she should behave on the campus as well as outside in such a manner as to bring credit to him/her and to the Institution.",
            "A student once admitted in the hostel, will continue to be a hostel inmate throughout the year unless otherwise debarred from the hostel on disciplinary grounds and he/she will have to pay the room rent for both the terms. Every student must be acquainted with all the rules and regulations of the Hostel. He / She must observe them strictly. Ignorance of rules will not be considered as an excuse.",
          ].map((text, i) => (
            <li key={i} style={styles.rulesLi}>{text}</li>
          ))}
        </ol>

        <div style={styles.subHeading}>Rules:</div>

        <ol style={styles.rulesList}>
          {[
            "Every student should stay in the room allotted to him/her. Mutual exchange of rooms after final allotment is not allowed. However, only the Chief Warden may allow as a special case on valid and reasonable ground. Violation of this rule will be considered an act of gross misconduct and attract appropriate disciplinary action against them including expulsion from Hostel/Institute and imposition of heavy fine.",
            "Resident Students must look up the Hostel Notice Board regularly. The Warden Team member or any authorized member of the Institute staff can inspect the room of any student in the hostel at any time. Hostel inmates are supposed to keep ID-cards with them and must produce the same to any Hostel or Institute's authority whenever asked for.",
            "No Resident Students should meet the Chairman/CED for ordinary matters. Warden In-charge of the concerned hostel is the right person for such matters. In next step they can approach to the Chief Warden.",
            "All cases of illness should be reported to the concerned Warden In-charge/Warden Immediately.",
            "No student should keep any fire-arms, lethal weapons, poisonous things or intoxicants of any kind in the Hostel. Students must not take law into their own hands, but must report all disputes to the hostel Warden In-charge/Warden. All kinds of shouting, fighting, gambling, stealing, violent knocking, maltreating or abusing are strictly prohibited. In such cases offender will be handed over to Police immediately.",
            "The boarder shall have to vacate/Shift their accommodation as and when asked for to the identified place of accommodation by the Management. They should vacate the hostel rooms before they leave for the vacation so that annual maintenance is carried out. All the hostel articles issued to the students are returned to the caretaker before the students leave their rooms. They will be responsible for any loss/Damage caused to Hostel/College properties.",
            "No boarder is allowed to engage a private servant or pet animals.",
            "Students shall not remain absent from their hostels during night without the prior permission of the Warden In-charge/Warden.",
            "Hostel students shall not leave the campus without prior permission of the Warden In-charge/Warden.",
            "They shall have to apply in prescribed form in advance stating the reason for leaving and the address of destination. Hostel student who leave hostel without the permission from the concerned Warden shall be deemed to be missing and Parent/Guardian/Police authorities may be intimated in consultation with the Management.",
            "The inmates of the hostel will not leave the hostel premises on holidays for the purpose of excursion or picnic or Project work. Prior permission of the Warden In-charge/Warden has to be obtained for going for any picnic or excursion. However for any eventuality that may occur during picnic/excursion, the responsibility does not lie with the Institute authorities.",
            "Hostel inmates are supposed to take care of their health themselves. Student suffering from infectious disease has to leave for medical treatment to proper clinic/hospital or isolated place under intimation to the warden.",
            "Formation of association of students on the basis of regions, caste or creed is not permitted, during their stay in the hostels.",
            "Room furniture and electric fittings are required to be maintained by the inmates in good condition. At the time of allotment of room and leaving the hostel for the summer vacation, every student must take-over and hand-over, respectively, the hostel property carefully. Students should invariably vacate the hostel during vacation.",
          ].map((text, i) => (
            <li key={i} style={styles.rulesLi}>{text}</li>
          ))}
        </ol>
      </div>

      {/* ── PAGE 3 – Rules & Regulations (part 2) ── */}
      <div style={{ ...styles.a4Page, ...styles.rulesPage }} className="print-page-break haf-print-page">
        <div style={styles.formCodeTop}>HOS01</div>

        <ol style={styles.rulesList} start={15}>
          {[
            "In case of damage to any part of the hostel buildings, furniture, apparatus or other property of the institute, caused by inmates of the hostel, the loss shall be recovered from the persons identified as responsible for such damage. However, if the persons causing damage cannot be identified, the cost of repairing the same as may be assessed will be charged equally amongst all the inmates of the hostel or group of inmates of the hostel found responsible for the damage.",
            "Students should lock their room properly when they go out for bath, food etc. Each roommate must keep a key of the door lock of his/her room in case of double / triple/four seated accommodations.",
            "Every student residing in the hostel must join the mess attached to that hostel. Individual cooking is not permitted. They are not allowed to cook anything in their rooms.",
            "Every inmate of the hostel shall pay the mess bill and other charges as per the notified schedule failing which fine will be imposed as decided by the hostel authority. The approved rules regarding mess cut will be applicable to all the inmates of the hostel. Mess exemption on medical ground under extraordinary situation will be allowed with payment of service charge as decided by the hostel authority. Whenever a student is applying for rebate on medical grounds, he/she must submit a copy of medical certificate by the Medical Officer of the Institute or by the external doctor, if it is advised so by the Institute doctor.",
            "Ragging in any form is a cognizable offence and severely punishable as per the Supreme Court directives leading to expulsion from the Hostel and the disciplinary action may culminate in his/her expulsion from the Institute as well. The Institute administration may report incidents of ragging to the Police for taking appropriate action under the law.",
            "Students should take treatment in the Institute dispensary between 8AM to 6PM when they are sick. For emergency, between 6PM to 8AM they should contact the medical officer of the institute at his residence in the colony campus. The Institute doctor and the concerned hostel Warden In-charge and Warden will decide further course of treatment. Students are advised to take treatment at the nearest clinic and inform about it to the authorities immediately in case of emergency occurring outside the Institute campus.",
            "In case of need for hospitalization, student should inform his/her parents / guardian. Parents / guardian are required to communicate to the concerned Warden In-charge/ Warden in this regard.",
            "Penalty for violation of hostel rules will be decided by the hostel authorities considering the severity of the offense / violation of rules / act of indiscipline. Fine/ penalty amount may be deducted from the hostel deposit. If cumulative fine exceeds Rs.1500/- per academic year, he / she will not be considered in merit for the next hostel admission.",
            "Guests are not permitted to stay in the rooms of the students. The student must get permission for keeping his/her guest in the guest room of the Hostel from the concerned Warden In-charge. Any Guests under special circumstances are allowed to stay in hostel for one/two days with prior permission from Warden/Chief Warden/Management subjected to availability. Female guests are not permitted to stay in Boys Hostel. Likewise Male guests are not allowed to stay in the girl's hostel. A boarder keeping a guest without permission is liable for disciplinary action as per law and will be fined heavily.",
            "Students are prohibited from giving shelter to any other student/outsider in the rooms. In case of any unauthorized shelter, the student will be liable to disciplinary action.",
            "Resident students are not permitted to invite any outside person to address any meeting in the hostel without written permission of the Principal/Chief Executive Director.",
            "Lights, fans must be switched off when not in use. The use of electric heater, electric rod and other similar appliances are strictly prohibited. Boarders are warned against tempering with electric installation and for all electric repairs the official electrician should be called in.",
            "Students, in their own interest, are advised not to keep excess cash or any valuables in their hostel rooms.",
            "They are cautioned to be very careful about safety of their belongings. They should close their rooms securely when they leave the room even for short periods or when they are sleeping. Institute shall not be responsible for the loss of such items due to theft or otherwise. However, in the case of theft, the matter should be immediately reported to the concerned Warden In-charge/Warden and Chief Security Officer of the Institute.",
            "Male students are strictly forbidden from entering the Girls' Hostel and female students from entering Boy's Hostel.",
            "Students are prohibited from consuming alcoholic drinks, drugs, cigarettes, tobacco products or any other intoxicants inside the hostel or to enter the hostel after consuming the same. Any student found consuming such thing or in a drunken state in the hostel will render himself liable for strict disciplinary action as per law, including expulsion/rustication from Hostel/Institute.",
            "Students are prohibited from screening/ keeping obscene literature/ video films in the possession. Any violation in this regard will result disciplinary action.",
            "Going Home / Leave: Students who wish to go home or take leave from the hostel must obtain prior approval through Microsoft Teams (MS Teams) before leaving the hostel premises.",
          ].map((text, i) => (
            <li key={i + 15} style={styles.rulesLi}>{text}</li>
          ))}
        </ol>
      </div>

      {/* ── PAGE 4 – Additional Rules, Undertaking & Declaration ── */}
      <div style={{ ...styles.a4Page, ...styles.rulesPage }} className="print-page-break haf-print-page">
        <div style={styles.formCodeTop}>HOS01</div>

        <div style={styles.additionalHeading}>Additional Rules for Girls' Hostel:</div>

        <ol style={styles.rulesList} start={32}>
          {[
            "Closing time is 8:30 PM in the evening under any circumstances.",
            "No male visitor is allowed to enter the Girls' Hostel without prior permission of the respective Warden In-charge/Warden.",
            "The girl students must make entry in the \"In/Out Register\" kept at the Security office.",
          ].map((text, i) => (
            <li key={i + 32} style={styles.rulesLi}>{text}</li>
          ))}
        </ol>

        <div style={styles.additionalHeading}>Additional Rules for Boys' Hostel:</div>

        <ol style={styles.rulesList} start={35}>
          {[
            "Closing time is 9:30 PM in the Night under any circumstances.",
            "No female visitor is allowed to enter the Boys' Hostel without prior permission of the respective Warden In-charge/Warden.",
            "The boy's students must make entry in the \"In/Out Register\" kept at the Security office.",
          ].map((text, i) => (
            <li key={i + 35} style={styles.rulesLi}>{text}</li>
          ))}
        </ol>

        <div style={styles.noteText}>
          Note: Read carefully the rules and regulations form before submitting the application form.
        </div>

        <div style={styles.undertakingTitle}>UNDERTAKING BY HOSTEL INMATE</div>

        <div style={styles.undertakingText}>
          I have fully understood the rules and regulations of hostel. I promise that I will not violate the rules and regulations. Any time I am found violating this, I may be out of the hostel giving 24 hours notice. In case I do not vacate, I may be forcibly made to vacate, including clearing my belongings. This has been intimated to my parents and their consent has been taken.
          <br /><br />
          In case I am fined for violating the rules/guidelines as a warning and if I do not pay the fine with in the stipulated period, I may be sent out within 24 hours notice on Indisciplinary measure and that I will forfeit the entire amount paid to the hostel including the caution deposit if any.
        </div>
          <br />
        <div style={styles.signLine}>Signature of the student</div>

        <div style={styles.declarationTitle}>DECLARATION BY PARENT</div>

        <div style={styles.declarationText}>
          My ward{" "}
          <span style={styles.dotted}>{studentName || "\u00a0"}</span>
          {" "}Studying in{" "}
          <span style={{ ...styles.dotted, minWidth: "60px" }}>{year || "\u00a0"}</span>
          {" "}Year of{" "}
          <span style={styles.dotted}>{branch || "\u00a0"}</span>
          {" "}Branch may kindly be accommodated in the hostel. He/She will abide by rules and regulations of the hostel as specified from time to time, failing which he/she may be rusticated from the hostel within 24 hours notice, without any further intimation. Mr./Miss{" "}
          <span style={styles.dotted}>{guardianName || "\u00a0"}</span>
          {" "}will be local Guardian whose address and phone numbers are furnished in the application form.
        </div>
          <br />
        <div style={styles.signLine}>Signature of the Parent/Local Guardian</div>
      </div>

      {/* ── Action Buttons ── */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '20px'
      }} className="no-print">
        <button
          onClick={onBack}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            border: '2px solid #007bff',
            background: 'white',
            color: '#007bff',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#f0f8ff';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'white';
          }}
        >
          ← Back to Form
        </button>
        <button
          onClick={() => window.print()}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            border: 'none',
            background: '#007bff',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#0056b3';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#007bff';
          }}
        >
          🖨️ Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
