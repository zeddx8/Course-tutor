import { School, Department, Course, TutorProfile, University } from '../types';

export const CCTU_UNIVERSITY: University = {
  id: 'u-cctu-01',
  name: 'Cape Coast Technical University',
  short_code: 'CCTU',
};

export const CCTU_SCHOOLS: School[] = [
  { id: 'sch-saast', university_id: 'u-cctu-01', name: 'School of Applied Sciences & Technology', short_code: 'SAST' },
  { id: 'sch-soe', university_id: 'u-cctu-01', name: 'School of Engineering', short_code: 'SOE' },
  { id: 'sch-sbms', university_id: 'u-cctu-01', name: 'School of Business & Management Studies', short_code: 'SBMS' },
  { id: 'sch-saa', university_id: 'u-cctu-01', name: 'School of Applied Arts', short_code: 'SAA' },
  { id: 'sch-sbne', university_id: 'u-cctu-01', name: 'School of Built & Natural Environment', short_code: 'SBNE' },
  { id: 'sch-grad', university_id: 'u-cctu-01', name: 'School of Graduate Studies', short_code: 'SGS' },
];

export const CCTU_DEPARTMENTS: Department[] = [
  // SAST
  { id: 'dept-cst', school_id: 'sch-saast', name: 'Computer Science & Technology' },
  { id: 'dept-stat', school_id: 'sch-saast', name: 'Statistics & Mathematics' },
  { id: 'dept-hosp', school_id: 'sch-saast', name: 'Hospitality Management' },
  { id: 'dept-food', school_id: 'sch-saast', name: 'Food Science & Postharvest Technology' },

  // SOE
  { id: 'dept-civil', school_id: 'sch-soe', name: 'Civil Engineering' },
  { id: 'dept-elect', school_id: 'sch-soe', name: 'Electrical/Electronic Engineering' },
  { id: 'dept-mech', school_id: 'sch-soe', name: 'Mechanical Engineering' },
  { id: 'dept-renew', school_id: 'sch-soe', name: 'Renewable Energy Technology' },

  // SBMS
  { id: 'dept-acc', school_id: 'sch-sbms', name: 'Accounting and Finance' },
  { id: 'dept-mgmt', school_id: 'sch-sbms', name: 'Management and Administration' },
  { id: 'dept-mkt', school_id: 'sch-sbms', name: 'Marketing Studies' },
  { id: 'dept-proc', school_id: 'sch-sbms', name: 'Procurement and Supply Chain Management' },
  { id: 'dept-entrep', school_id: 'sch-sbms', name: 'Entrepreneurship and Agribusiness' },

  // SAA
  { id: 'dept-tourism', school_id: 'sch-saa', name: 'Tourism Management' },
  { id: 'dept-fashion', school_id: 'sch-saa', name: 'Fashion Design and Textile Studies' },
  { id: 'dept-liberal', school_id: 'sch-saa', name: 'Liberal Studies (African Studies)' },

  // SBNE
  { id: 'dept-const', school_id: 'sch-sbne', name: 'Construction Technology and Management' },
  { id: 'dept-env', school_id: 'sch-sbne', name: 'Environmental Management and Technology' },

  // Graduate Studies
  { id: 'dept-grad-eng', school_id: 'sch-grad', name: 'Postgraduate Engineering Programmes' },
];

export const CCTU_COURSES: Course[] = [
  // Computer Science & Technology
  { id: 'c-cst204', department_id: 'dept-cst', code: 'CST 204', title: 'Data Structures & Algorithms', category: 'theory', level: 200, department_name: 'Computer Science & Technology' },
  { id: 'c-cst101', department_id: 'dept-cst', code: 'CST 101', title: 'Introduction to Programming in Python & C', category: 'practical_software', level: 100, department_name: 'Computer Science & Technology' },
  { id: 'c-cst302', department_id: 'dept-cst', code: 'CST 302', title: 'Database Design & SQL Systems', category: 'practical_software', level: 300, department_name: 'Computer Science & Technology' },
  { id: 'c-cst308', department_id: 'dept-cst', code: 'CST 308', title: 'Web Application Development', category: 'practical_software', level: 300, department_name: 'Computer Science & Technology' },
  { id: 'c-cst402', department_id: 'dept-cst', code: 'CST 402', title: 'Computer Networking & Cybersecurity', category: 'theory', level: 400, department_name: 'Computer Science & Technology' },

  // Statistics & Math
  { id: 'c-sta202', department_id: 'dept-stat', code: 'STA 202', title: 'Business Statistics & Probability', category: 'theory', level: 200, department_name: 'Statistics & Mathematics' },
  { id: 'c-sta305', department_id: 'dept-stat', code: 'STA 305', title: 'Data Analysis with SPSS & R', category: 'practical_software', level: 300, department_name: 'Statistics & Mathematics' },

  // Accounting & Finance
  { id: 'c-acc101', department_id: 'dept-acc', code: 'ACC 101', title: 'Financial Accounting Principles', category: 'theory', level: 100, department_name: 'Accounting and Finance' },
  { id: 'c-acc205', department_id: 'dept-acc', code: 'ACC 205', title: 'Cost & Management Accounting', category: 'theory', level: 200, department_name: 'Accounting and Finance' },
  { id: 'c-acc309', department_id: 'dept-acc', code: 'ACC 309', title: 'Auditing, Assurance & Tally', category: 'practical_software', level: 300, department_name: 'Accounting and Finance' },

  // Engineering
  { id: 'c-mec205', department_id: 'dept-mech', code: 'MEC 205', title: 'Engineering Mathematics & Calculus II', category: 'theory', level: 200, department_name: 'Mechanical Engineering' },
  { id: 'c-cad201', department_id: 'dept-mech', code: 'CAD 201', title: 'Computer Aided Drafting (AutoCAD & SolidWorks)', category: 'practical_software', level: 200, department_name: 'Mechanical Engineering' },
  { id: 'c-ele301', department_id: 'dept-elect', code: 'ELE 301', title: 'Electrical Circuit Theory & MATLAB', category: 'theory', level: 300, department_name: 'Electrical/Electronic Engineering' },
  { id: 'c-civ201', department_id: 'dept-civil', code: 'CIV 201', title: 'Structural Mechanics & Revit Architecture', category: 'practical_software', level: 200, department_name: 'Civil Engineering' },

  // Procurement & Marketing
  { id: 'c-mkt102', department_id: 'dept-mkt', code: 'MKT 102', title: 'Principles of Modern Marketing', category: 'theory', level: 100, department_name: 'Marketing Studies' },
  { id: 'c-prc201', department_id: 'dept-proc', code: 'PRC 201', title: 'Public Procurement & Logistics', category: 'theory', level: 200, department_name: 'Procurement and Supply Chain Management' },
];

export const INITIAL_TUTORS: TutorProfile[] = [
  {
    user_id: 'tut-kwame-01',
    full_name: 'Kwame Mensah',
    email: 'k.mensah@cctu.edu.gh',
    phone: '+233244123456',
    bio: 'Level 400 Computer Science student & departmental TA. Mentored 40+ students to pass CST 204 & CST 302 with A grades.',
    hourly_rate_solo: 45.0,
    hourly_rate_group: 20.0,
    id_card_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
    transcript_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
    momo_number: '0244123456',
    momo_network: 'MTN',
    paystack_recipient_code: 'RCP_kwame_mtn_001',
    verification_status: 'approved',
    rating_avg: 4.9,
    total_reviews: 28,
    level: 400,
    department_name: 'Computer Science & Technology',
    courses: [
      { course_id: 'c-cst204', course_code: 'CST 204', course_title: 'Data Structures & Algorithms', grade_achieved: 'A' },
      { course_id: 'c-cst101', course_code: 'CST 101', course_title: 'Intro to Programming in Python & C', grade_achieved: 'A' },
      { course_id: 'c-cst302', course_code: 'CST 302', course_title: 'Database Design & SQL Systems', grade_achieved: 'B+' },
    ],
    available_days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    user_id: 'tut-abena-02',
    full_name: 'Abena Osei Poku',
    email: 'abena.op@cctu.edu.gh',
    phone: '+233277987654',
    bio: 'National Service Personnel (NSP) in the Accounting & Finance Department. High honors graduate with deep mastery in Cost & Financial Accounting.',
    hourly_rate_solo: 50.0,
    hourly_rate_group: 25.0,
    id_card_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    transcript_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
    momo_number: '0277987654',
    momo_network: 'Telecel',
    paystack_recipient_code: 'RCP_abena_telecel_002',
    verification_status: 'approved',
    rating_avg: 4.8,
    total_reviews: 19,
    level: 500,
    department_name: 'Accounting and Finance',
    courses: [
      { course_id: 'c-acc101', course_code: 'ACC 101', course_title: 'Financial Accounting Principles', grade_achieved: 'A' },
      { course_id: 'c-acc205', course_code: 'ACC 205', course_title: 'Cost & Management Accounting', grade_achieved: 'A' },
    ],
    available_days: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
  },
  {
    user_id: 'tut-kofi-03',
    full_name: 'Kofi Asante-Boateng',
    email: 'k.asante@cctu.edu.gh',
    phone: '+233261239876',
    bio: 'B.Tech Mechanical Engineering student. Certified AutoCAD & Revit instructor. I help students ace technical drawings & calculus walkthroughs.',
    hourly_rate_solo: 40.0,
    hourly_rate_group: 18.0,
    id_card_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    transcript_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
    momo_number: '0261239876',
    momo_network: 'AT',
    paystack_recipient_code: 'RCP_kofi_at_003',
    verification_status: 'approved',
    rating_avg: 4.7,
    total_reviews: 14,
    level: 300,
    department_name: 'Mechanical Engineering',
    courses: [
      { course_id: 'c-cad201', course_code: 'CAD 201', course_title: 'Computer Aided Drafting (AutoCAD)', grade_achieved: 'A' },
      { course_id: 'c-mec205', course_code: 'MEC 205', course_title: 'Engineering Mathematics & Calculus II', grade_achieved: 'B+' },
    ],
    available_days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
  },
  {
    user_id: 'tut-efua-04',
    full_name: 'Efua Bartels',
    email: 'e.bartels@cctu.edu.gh',
    phone: '+233551122334',
    bio: 'Statistics & Math major. Specialize in simplifying Business Statistics, probability distributions, SPSS practicals and past questions (pasco).',
    hourly_rate_solo: 35.0,
    hourly_rate_group: 15.0,
    id_card_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    transcript_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
    momo_number: '0551122334',
    momo_network: 'MTN',
    paystack_recipient_code: 'RCP_efua_mtn_004',
    verification_status: 'approved',
    rating_avg: 5.0,
    total_reviews: 22,
    level: 400,
    department_name: 'Statistics & Mathematics',
    courses: [
      { course_id: 'c-sta202', course_code: 'STA 202', course_title: 'Business Statistics & Probability', grade_achieved: 'A' },
      { course_id: 'c-sta305', course_code: 'STA 305', course_title: 'Data Analysis with SPSS & R', grade_achieved: 'A' },
    ],
    available_days: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  {
    user_id: 'tut-pending-05',
    full_name: 'Emanuel Tetteh',
    email: 'e.tetteh@cctu.edu.gh',
    phone: '+233240998877',
    bio: 'Electrical Engineering Level 300 student looking to tutor Circuit Theory and MATLAB simulation.',
    hourly_rate_solo: 40.0,
    hourly_rate_group: 20.0,
    id_card_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    transcript_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
    momo_number: '0240998877',
    momo_network: 'MTN',
    verification_status: 'pending',
    rating_avg: 0.0,
    total_reviews: 0,
    level: 300,
    department_name: 'Electrical/Electronic Engineering',
    courses: [
      { course_id: 'c-ele301', course_code: 'ELE 301', course_title: 'Electrical Circuit Theory & MATLAB', grade_achieved: 'A' },
    ],
    available_days: ['Monday', 'Tuesday', 'Wednesday'],
  },
];

export const CAMPUS_LOCATIONS = [
  'CCTU Central Library (Ground Floor Discussion Pods)',
  'CCTU Central Library (2nd Floor Quiet Study)',
  'SAST Computer Lab 2',
  'Engineering Block Study Terrace',
  'SBMS Lecture Hall Quadrangle',
  'Departmental Common Room',
];
