import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  Wallet,
  User,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Menu,
  X,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  Star,
  MapPin,
  Video,
  Building2,
  Plus,
  FileText,
  CreditCard,
  Lock,
  Users,
  Award,
  SlidersHorizontal,
  Info,
  ArrowUpRight,
  RefreshCw,
} from './lucide-react';

// ============================================================================
// PRE-SEEDED CCTU ACADEMIC DATA (6 Schools, 18 Departments)
// ============================================================================

const INITIAL_SCHOOLS = [
  {
    id: 'soe',
    code: 'SOE',
    name: 'School of Engineering',
    departments: [
      'Civil Engineering',
      'Electrical/Electronic Engineering',
      'Mechanical Engineering',
      'Renewable Energy Technology',
    ],
  },
  {
    id: 'sbms',
    code: 'SBMS',
    name: 'School of Business & Management Studies',
    departments: [
      'Accounting and Finance',
      'Management and Administration',
      'Marketing Studies',
      'Procurement and Supply Chain Management',
      'Entrepreneurship and Agribusiness',
    ],
  },
  {
    id: 'sast',
    code: 'SAST',
    name: 'School of Applied Sciences & Technology',
    departments: [
      'Computer Science & Technology',
      'Statistics & Mathematics',
      'Hospitality Management',
      'Food Science and Postharvest Technology',
    ],
  },
  {
    id: 'saa',
    code: 'SAA',
    name: 'School of Applied Arts',
    departments: [
      'Tourism Management',
      'Fashion Design and Textile Studies',
      'Liberal Studies',
    ],
  },
  {
    id: 'sbne',
    code: 'SBNE',
    name: 'School of Built & Natural Environment',
    departments: [
      'Construction Technology and Management',
      'Environmental Management and Technology',
    ],
  },
  {
    id: 'sgs',
    code: 'SGS',
    name: 'School of Graduate Studies',
    departments: [
      'M.Tech Civil Engineering',
      'M.Tech Construction Technology and Management',
    ],
  },
];

const INITIAL_COURSES = [
  {
    id: 'c-cst204',
    code: 'CST 204',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science & Technology',
    schoolId: 'sast',
    category: 'practical_software',
    level: 200,
  },
  {
    id: 'c-cst301',
    code: 'CST 301',
    title: 'Database Management Systems',
    department: 'Computer Science & Technology',
    schoolId: 'sast',
    category: 'practical_software',
    level: 300,
  },
  {
    id: 'c-acc201',
    code: 'ACC 201',
    title: 'Financial Accounting',
    department: 'Accounting and Finance',
    schoolId: 'sbms',
    category: 'theory',
    level: 200,
  },
  {
    id: 'c-mec302',
    code: 'MEC 302',
    title: 'AutoCAD & Engineering Drawing',
    department: 'Mechanical Engineering',
    schoolId: 'soe',
    category: 'practical_software',
    level: 300,
  },
  {
    id: 'c-sta202',
    code: 'STA 202',
    title: 'Engineering Statistics',
    department: 'Statistics & Mathematics',
    schoolId: 'sast',
    category: 'theory',
    level: 200,
  },
  {
    id: 'c-eee205',
    code: 'EEE 205',
    title: 'Circuit Design & Analysis',
    department: 'Electrical/Electronic Engineering',
    schoolId: 'soe',
    category: 'practical_software',
    level: 200,
  },
  {
    id: 'c-ctm304',
    code: 'CTM 304',
    title: 'Quantity Surveying & Estimating',
    department: 'Construction Technology and Management',
    schoolId: 'sbne',
    category: 'theory',
    level: 300,
  },
  {
    id: 'c-fdt208',
    code: 'FDT 208',
    title: 'Pattern Drafting & Garment Construction',
    department: 'Fashion Design and Textile Studies',
    schoolId: 'saa',
    category: 'practical_software',
    level: 200,
  },
];

const INITIAL_TUTORS = [
  {
    id: 't-esi',
    name: 'Esi Boateng',
    indexNumber: 'CCTU/BT/CS/22/014',
    department: 'Computer Science & Technology',
    programmeTier: 'B.Tech L400',
    verified: true,
    rating: 4.9,
    reviewCount: 18,
    completedSessions: 24,
    hourlyRateSolo: 45,
    hourlyRateGroup: 20,
    deliveryModes: ['on_campus', 'online'],
    studySessions: ['regular', 'evening', 'weekend'],
    bio: 'Final-year B.Tech Computer Science student specializing in algorithms, SQL schema design, and exam walkthroughs. Structured past-question prep and live code debugging.',
    courses: [
      { courseId: 'c-cst204', code: 'CST 204', title: 'Data Structures & Algorithms', grade: 'A', category: 'practical_software' },
      { courseId: 'c-cst301', code: 'CST 301', title: 'Database Management Systems', grade: 'A', category: 'practical_software' },
    ],
  },
  {
    id: 't-kojo',
    name: 'Kojo Annan',
    indexNumber: 'CCTU/BT/AF/22/089',
    department: 'Accounting and Finance',
    programmeTier: 'B.Tech Top-Up L400',
    verified: true,
    rating: 4.8,
    reviewCount: 14,
    completedSessions: 19,
    hourlyRateSolo: 40,
    hourlyRateGroup: 18,
    deliveryModes: ['on_campus', 'online'],
    studySessions: ['evening', 'weekend'],
    bio: 'Teaching Assistant and B.Tech Accounting Top-Up candidate. Focused on IFRS financial statements, ratio analysis, and mid-semester exam drills for Evening and Weekend cohorts.',
    courses: [
      { courseId: 'c-acc201', code: 'ACC 201', title: 'Financial Accounting', grade: 'A', category: 'theory' },
      { courseId: 'c-sta202', code: 'STA 202', title: 'Engineering Statistics', grade: 'B+', category: 'theory' },
    ],
  },
  {
    id: 't-yaw',
    name: 'Yaw Osei-Mensah',
    indexNumber: 'CCTU/NSP/ME/25/004',
    department: 'Mechanical Engineering',
    programmeTier: 'National Service (NSP)',
    verified: true,
    rating: 4.9,
    reviewCount: 11,
    completedSessions: 15,
    hourlyRateSolo: 55,
    hourlyRateGroup: 25,
    deliveryModes: ['on_campus', 'online'],
    studySessions: ['regular', 'weekend'],
    bio: 'National Service Personnel in Mechanical Engineering. Hands-on AutoCAD 2D/3D modeling, orthographic projection, and circuit simulation sessions with screen sharing.',
    courses: [
      { courseId: 'c-mec302', code: 'MEC 302', title: 'AutoCAD & Engineering Drawing', grade: 'A', category: 'practical_software' },
      { courseId: 'c-eee205', code: 'EEE 205', title: 'Circuit Design & Analysis', grade: 'B+', category: 'practical_software' },
    ],
  },
  {
    id: 't-abena',
    name: 'Abena Kumi',
    indexNumber: 'CCTU/MT/CT/25/011',
    department: 'Construction Technology and Management',
    programmeTier: 'M.Tech Candidate',
    verified: true,
    rating: 4.7,
    reviewCount: 9,
    completedSessions: 12,
    hourlyRateSolo: 50,
    hourlyRateGroup: 22,
    deliveryModes: ['online'],
    studySessions: ['evening', 'weekend'],
    bio: 'Postgraduate researcher in Construction Technology. Guides HND and B.Tech students through measurement, taking-off quantities, and statistical analysis.',
    courses: [
      { courseId: 'c-ctm304', code: 'CTM 304', title: 'Quantity Surveying & Estimating', grade: 'A', category: 'theory' },
      { courseId: 'c-sta202', code: 'STA 202', title: 'Engineering Statistics', grade: 'A', category: 'theory' },
    ],
  },
];

const INITIAL_PENDING_APPLICANTS = [
  {
    id: 'app-1',
    name: 'Nana Ama Serwaa',
    indexNumber: 'CCTU/BT/EE/22/041',
    department: 'Electrical/Electronic Engineering',
    programmeTier: 'B.Tech L400',
    submittedAt: '2026-11-21 14:20',
    momoNetwork: 'MTN',
    momoNumber: '+233 24 812 3390',
    hourlyRateSolo: 45,
    hourlyRateGroup: 20,
    idCardRef: 'ID_CCTU_22041_VERIFIED.pdf',
    transcriptRef: 'TRANSCRIPT_L300_SEM2_CGPA_3.84.pdf',
    cgpa: '3.84 / 4.00',
    bio: 'Strong background in analog/digital circuit analysis, Proteus simulation, and lab report preparation.',
    courses: [
      { courseId: 'c-eee205', code: 'EEE 205', title: 'Circuit Design & Analysis', grade: 'A', category: 'practical_software' },
      { courseId: 'c-sta202', code: 'STA 202', title: 'Engineering Statistics', grade: 'B+', category: 'theory' },
    ],
  },
  {
    id: 'app-2',
    name: 'Samuel Tetteh',
    indexNumber: 'CCTU/HN/FD/23/019',
    department: 'Fashion Design and Textile Studies',
    programmeTier: 'HND L300',
    submittedAt: '2026-11-22 09:05',
    momoNetwork: 'Telecel',
    momoNumber: '+233 20 451 9921',
    hourlyRateSolo: 35,
    hourlyRateGroup: 15,
    idCardRef: 'ID_CCTU_23019_VERIFIED.pdf',
    transcriptRef: 'TRANSCRIPT_HND2_SEM2_CGPA_3.71.pdf',
    cgpa: '3.71 / 4.00',
    bio: 'Practical studio tutor for pattern drafting, grading, and textile production coursework.',
    courses: [
      { courseId: 'c-fdt208', code: 'FDT 208', title: 'Pattern Drafting & Garment Construction', grade: 'A', category: 'practical_software' },
    ],
  },
];

const INITIAL_BOOKINGS = [
  {
    id: 'bk-101',
    studentName: 'Kwame Mensah',
    studentIndex: 'CCTU/BT/CS/23/052',
    tutorId: 't-esi',
    tutorName: 'Esi Boateng',
    courseCode: 'CST 204',
    courseTitle: 'Data Structures & Algorithms',
    sessionType: 'solo',
    deliveryMode: 'on_campus',
    locationOrLink: 'CCTU Main Library — Study Room 2B',
    scheduledDate: '2026-11-24',
    scheduledTime: '15:00',
    durationHours: 2,
    totalAmount: 90.0,
    checkinCode: 'CT8492',
    status: 'confirmed', // confirmed | completed | disputed | refunded
    escrowStatus: 'held', // held | released | refunded | disputed
    paymentMethod: 'MTN MoMo',
    paystackRef: 'PSK_CT_984210A',
    rated: false,
    ratingGiven: null,
    disputeReason: null,
  },
  {
    id: 'bk-100',
    studentName: 'Kwame Mensah',
    studentIndex: 'CCTU/BT/CS/23/052',
    tutorId: 't-esi',
    tutorName: 'Esi Boateng',
    courseCode: 'CST 301',
    courseTitle: 'Database Management Systems',
    sessionType: 'solo',
    deliveryMode: 'online',
    locationOrLink: 'https://meet.google.com/ctu-dbms-301',
    scheduledDate: '2026-11-18',
    scheduledTime: '18:00',
    durationHours: 2,
    totalAmount: 90.0,
    checkinCode: 'CT3109',
    status: 'completed',
    escrowStatus: 'released',
    paymentMethod: 'MTN MoMo',
    paystackRef: 'PSK_CT_882104F',
    rated: false,
    ratingGiven: null,
    disputeReason: null,
  },
];

const INITIAL_LEDGER = [
  {
    id: 'tx-1',
    date: '2026-11-22 10:14',
    reference: 'PSK_CT_984210A',
    type: 'escrow_hold',
    description: 'Booking CST 204 (Kwame Mensah)',
    grossAmount: 90.0,
    platformFee: 10.8,
    netAmount: 79.2,
    status: 'held',
  },
  {
    id: 'tx-2',
    date: '2026-11-18 20:05',
    reference: 'PSK_CT_882104F',
    type: 'escrow_release',
    description: 'Completed CST 301 (Kwame Mensah)',
    grossAmount: 90.0,
    platformFee: 10.8,
    netAmount: 79.2,
    status: 'released',
  },
  {
    id: 'tx-3',
    date: '2026-11-15 16:40',
    reference: 'TRF_MOMO_44129',
    type: 'payout',
    description: 'Withdrawal to MTN MoMo (024***8812)',
    grossAmount: 150.0,
    platformFee: 0.0,
    netAmount: -150.0,
    status: 'success',
  },
];

const PLATFORM_FEE_RATE = 0.12;

// ============================================================================
// UTILITY HELPERS
// ============================================================================

const formatGHS = (value) =>
  `GHS ${Number(value || 0).toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const generateCheckinCode = () => {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `CT${digits}`;
};

const generatePaystackRef = () =>
  `PSK_CT_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

// ============================================================================
// REUSABLE UI PRIMITIVES
// ============================================================================

function StatusBadge({ status }) {
  const styles = {
    confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    held: 'bg-amber-50 text-amber-800 border-amber-200',
    completed: 'bg-slate-100 text-slate-700 border-slate-200',
    released: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    disputed: 'bg-rose-50 text-rose-800 border-rose-200',
    refunded: 'bg-slate-100 text-slate-600 border-slate-200',
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    theory: 'bg-slate-100 text-slate-700 border-slate-200',
    practical_software: 'bg-[#ECF6F1] text-[#0F5C3E] border-[#CBE5D8]',
  };

  const labels = {
    confirmed: 'Confirmed',
    held: 'Escrow Held',
    completed: 'Completed',
    released: 'Released',
    success: 'Paid Out',
    disputed: 'Disputed',
    refunded: 'Refunded',
    pending: 'Pending Review',
    theory: 'Theory & Exam Prep',
    practical_software: 'Practical & Software',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${
        styles[status] || 'bg-slate-100 text-slate-700 border-slate-200'
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-lg' }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${maxWidth} bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, subtext, icon: Icon, highlight = false }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {Icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              highlight ? 'bg-[#ECF6F1] text-[#0F5C3E]' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div
          className={`text-2xl font-semibold tracking-tight tabular-nums ${
            highlight ? 'text-[#0F5C3E]' : 'text-slate-900'
          }`}
        >
          {value}
        </div>
        {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Navigation & Role State
  const [role, setRole] = useState('student'); // 'student' | 'tutor' | 'admin'
  const [activeTab, setActiveTab] = useState('discover');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; tone: string } | null>(null);
  const showToast = (message, tone = 'success') => {
    setToast({ message, tone });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3800);
  };

  // Shared Domain State
  const [schools] = useState(INITIAL_SCHOOLS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [tutors, setTutors] = useState(INITIAL_TUTORS);
  const [pendingApplicants, setPendingApplicants] = useState(INITIAL_PENDING_APPLICANTS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [ledger, setLedger] = useState(INITIAL_LEDGER);

  // Esi Boateng (Active Tutor) Wallet State
  const [tutorWallet, setTutorWallet] = useState({
    availableBalance: 214.5,
    pendingEscrow: 79.2, // 88% of GHS 90.00 held booking
  });
  const [platformRevenue, setPlatformRevenue] = useState(142.8);

  // Student Discovery Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [sessionFilter, setSessionFilter] = useState('all');

  // Modals State
  const [bookingTutor, setBookingTutor] = useState(null);
  const [disputeBooking, setDisputeBooking] = useState(null);
  const [ratingBooking, setRatingBooking] = useState(null);
  const [checkinBooking, setCheckinBooking] = useState(null);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [reviewApplicant, setReviewApplicant] = useState(null);
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Switch role and set sensible default tab
  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setMobileMenuOpen(false);
    if (nextRole === 'student') setActiveTab('discover');
    if (nextRole === 'tutor') setActiveTab('schedule');
    if (nextRole === 'admin') setActiveTab('overview');
  };

  // Derived Metrics
  const escrowHeldTotal = useMemo(
    () =>
      bookings
        .filter((b) => b.escrowStatus === 'held' || b.escrowStatus === 'disputed')
        .reduce((sum, b) => sum + b.totalAmount, 0),
    [bookings]
  );

  const activeDisputesCount = useMemo(
    () => bookings.filter((b) => b.status === 'disputed').length,
    [bookings]
  );

  const activeTutorProfile = useMemo(
    () => tutors.find((t) => t.id === 't-esi') || tutors[0],
    [tutors]
  );

  // Navigation Config per Role
  const navItems = useMemo(() => {
    if (role === 'student') {
      return [
        { id: 'discover', label: 'Find a Tutor', icon: Search },
        { id: 'sessions', label: 'My Sessions', icon: Calendar, badge: bookings.filter((b) => b.status === 'confirmed').length },
      ];
    }
    if (role === 'tutor') {
      return [
        { id: 'schedule', label: 'Schedule & Check-In', icon: Calendar, badge: bookings.filter((b) => b.tutorId === 't-esi' && b.status === 'confirmed').length },
        { id: 'earnings', label: 'Earnings & Payouts', icon: Wallet },
        { id: 'profile', label: 'Tutor Profile & Rates', icon: User },
      ];
    }
    return [
      { id: 'overview', label: 'Overview & Vetting', icon: ShieldCheck, badge: pendingApplicants.length },
      { id: 'disputes', label: 'Disputes & Escrow', icon: AlertTriangle, badge: activeDisputesCount },
      { id: 'catalog', label: 'CCTU Catalog', icon: BookOpen },
    ];
  }, [role, bookings, pendingApplicants.length, activeDisputesCount]);

  const currentUserMeta = (({
    student: { name: 'Kwame Mensah', detail: 'B.Tech CS L300' },
    tutor: { name: 'Esi Boateng', detail: 'Verified Tutor' },
    admin: { name: 'Campus Operations', detail: 'Admin' },
  } as Record<string, { name: string; detail: string }>)[role]) || { name: 'Kwame Mensah', detail: 'B.Tech CS L300' };

  const currentViewTitle =
    navItems.find((item) => item.id === activeTab)?.label || 'Course Tutor';

  // ==========================================================================
  // CORE DOMAIN ACTIONS (SHARED LIVE STATE)
  // ==========================================================================

  // 1. Student books a session (Paystack MoMo simulation -> Escrow Hold)
  const handleCreateBooking = (payload) => {
    const newCode = generateCheckinCode();
    const ref = generatePaystackRef();
    const fee = Number((payload.totalAmount * PLATFORM_FEE_RATE).toFixed(2));
    const tutorShare = Number((payload.totalAmount - fee).toFixed(2));

    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      studentName: 'Kwame Mensah',
      studentIndex: 'CCTU/BT/CS/23/052',
      tutorId: payload.tutor.id,
      tutorName: payload.tutor.name,
      courseCode: payload.course.code,
      courseTitle: payload.course.title,
      sessionType: payload.sessionType,
      deliveryMode: payload.deliveryMode,
      locationOrLink: payload.locationOrLink,
      scheduledDate: payload.date,
      scheduledTime: payload.time,
      durationHours: payload.duration,
      totalAmount: payload.totalAmount,
      checkinCode: newCode,
      status: 'confirmed',
      escrowStatus: 'held',
      paymentMethod: payload.paymentMethod,
      paystackRef: ref,
      rated: false,
      ratingGiven: null,
      disputeReason: null,
    };

    setBookings((prev) => [newBooking, ...prev]);

    if (payload.tutor.id === 't-esi') {
      setTutorWallet((w) => ({
        ...w,
        pendingEscrow: Number((w.pendingEscrow + tutorShare).toFixed(2)),
      }));
    }

    setLedger((prev) => [
      {
        id: `tx-${Date.now()}`,
        date: '2026-11-22 13:35',
        reference: ref,
        type: 'escrow_hold',
        description: `Booking ${payload.course.code} (Kwame Mensah)`,
        grossAmount: payload.totalAmount,
        platformFee: fee,
        netAmount: tutorShare,
        status: 'held',
      },
      ...prev,
    ]);

    setBookingTutor(null);
    setActiveTab('sessions');
    showToast(`Booking confirmed. Check-In Code ${newCode} sent via SMS and saved to My Sessions.`);
  };

  // 2. Student reports an issue -> Freezes escrow -> Admin Disputes
  const handleReportIssue = (bookingId, reason) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'disputed', escrowStatus: 'disputed', disputeReason: reason }
          : b
      )
    );
    setDisputeBooking(null);
    showToast('Issue reported. Escrow funds are frozen pending Campus Operations review.', 'warning');
  };

  // 3. Student rates a completed session
  const handleRateSession = (bookingId, stars) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, rated: true, ratingGiven: stars } : b))
    );
    setRatingBooking(null);
    showToast('Verified review submitted. Thank you for your feedback.');
  };

  // 4. Tutor enters 6-char Check-In Code -> Releases Escrow atomically
  const handleVerifyCheckin = (booking, enteredCode) => {
    if (enteredCode.trim().toUpperCase() !== booking.checkinCode.toUpperCase()) {
      return false;
    }

    const fee = Number((booking.totalAmount * PLATFORM_FEE_RATE).toFixed(2));
    const tutorShare = Number((booking.totalAmount - fee).toFixed(2));

    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id ? { ...b, status: 'completed', escrowStatus: 'released' } : b
      )
    );

    if (booking.tutorId === 't-esi') {
      setTutorWallet((w) => ({
        pendingEscrow: Math.max(0, Number((w.pendingEscrow - tutorShare).toFixed(2))),
        availableBalance: Number((w.availableBalance + tutorShare).toFixed(2)),
      }));
    }

    setPlatformRevenue((rev) => Number((rev + fee).toFixed(2)));

    setLedger((prev) => [
      {
        id: `tx-${Date.now()}`,
        date: '2026-11-22 13:42',
        reference: booking.paystackRef,
        type: 'escrow_release',
        description: `Completed ${booking.courseCode} (${booking.studentName})`,
        grossAmount: booking.totalAmount,
        platformFee: fee,
        netAmount: tutorShare,
        status: 'released',
      },
      ...prev,
    ]);

    setCheckinBooking(null);
    showToast(`Attendance verified. ${formatGHS(tutorShare)} released to Available Balance.`);
    return true;
  };

  // 5. Tutor withdraws Available Balance to MoMo
  const handleWithdrawMoMo = ({ network, phone, amount }) => {
    const numericAmount = Number(amount);
    if (numericAmount <= 0 || numericAmount > tutorWallet.availableBalance) return;

    setTutorWallet((w) => ({
      ...w,
      availableBalance: Number((w.availableBalance - numericAmount).toFixed(2)),
    }));

    setLedger((prev) => [
      {
        id: `tx-${Date.now()}`,
        date: '2026-11-22 13:45',
        reference: `TRF_MOMO_${Math.floor(10000 + Math.random() * 89999)}`,
        type: 'payout',
        description: `Withdrawal to ${network} (${phone})`,
        grossAmount: numericAmount,
        platformFee: 0,
        netAmount: -numericAmount,
        status: 'success',
      },
      ...prev,
    ]);

    setWithdrawModalOpen(false);
    showToast(`Payout of ${formatGHS(numericAmount)} initiated to ${network} (${phone}).`);
  };

  // 6. Tutor updates profile & rates
  const handleSaveTutorProfile = (updates) => {
    setTutors((prev) =>
      prev.map((t) => (t.id === 't-esi' ? { ...t, ...updates } : t))
    );
    showToast('Tutor profile, hourly rates, and availability updated.');
  };

  // 7. Admin approves or rejects a pending tutor applicant
  const handleVettingDecision = (applicant, decision) => {
    setPendingApplicants((prev) => prev.filter((a) => a.id !== applicant.id));

    if (decision === 'approve') {
      const newTutor = {
        id: `t-${Date.now()}`,
        name: applicant.name,
        indexNumber: applicant.indexNumber,
        department: applicant.department,
        programmeTier: applicant.programmeTier,
        verified: true,
        rating: 5.0,
        reviewCount: 0,
        completedSessions: 0,
        hourlyRateSolo: applicant.hourlyRateSolo,
        hourlyRateGroup: applicant.hourlyRateGroup,
        deliveryModes: ['on_campus', 'online'],
        studySessions: ['regular', 'weekend'],
        bio: applicant.bio,
        courses: applicant.courses,
      };
      setTutors((prev) => [newTutor, ...prev]);
      showToast(`${applicant.name} approved and published to Student Discovery.`);
    } else {
      showToast(`Application for ${applicant.name} rejected.`, 'warning');
    }
    setReviewApplicant(null);
  };

  // 8. Admin resolves a dispute (Refund Student 100% OR Release to Tutor)
  const handleResolveDispute = (booking, resolution) => {
    const fee = Number((booking.totalAmount * PLATFORM_FEE_RATE).toFixed(2));
    const tutorShare = Number((booking.totalAmount - fee).toFixed(2));

    if (resolution === 'refund') {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id ? { ...b, status: 'refunded', escrowStatus: 'refunded' } : b
        )
      );
      if (booking.tutorId === 't-esi') {
        setTutorWallet((w) => ({
          ...w,
          pendingEscrow: Math.max(0, Number((w.pendingEscrow - tutorShare).toFixed(2))),
        }));
      }
      showToast(`100% refund (${formatGHS(booking.totalAmount)}) issued to ${booking.studentName}.`);
    } else {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id ? { ...b, status: 'completed', escrowStatus: 'released' } : b
        )
      );
      if (booking.tutorId === 't-esi') {
        setTutorWallet((w) => ({
          pendingEscrow: Math.max(0, Number((w.pendingEscrow - tutorShare).toFixed(2))),
          availableBalance: Number((w.availableBalance + tutorShare).toFixed(2)),
        }));
      }
      setPlatformRevenue((rev) => Number((rev + fee).toFixed(2)));
      showToast(`Dispute closed. ${formatGHS(tutorShare)} released to ${booking.tutorName}.`);
    }
  };

  // 9. Admin adds a new course to the CCTU catalog
  const handleAddCourse = (courseData) => {
    const school = schools.find((s) => s.departments.includes(courseData.department));
    const newCourse = {
      id: `c-${Date.now()}`,
      code: courseData.code.toUpperCase(),
      title: courseData.title,
      department: courseData.department,
      schoolId: school ? school.id : 'sast',
      category: courseData.category,
      level: Number(courseData.level),
    };
    setCourses((prev) => [newCourse, ...prev]);
    setAddCourseOpen(false);
    showToast(`${newCourse.code} added to the CCTU Course Catalog.`);
  };

  const handleCopyCode = (id, code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedId(id);
    showToast(`Check-In Code ${code} copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ==========================================================================
  // RENDER SHELL
  // ==========================================================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex">
      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar (256px desktop, slide-over drawer on mobile) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Wordmark */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F5C3E] text-white flex items-center justify-center font-semibold text-sm tracking-tight">
                CT
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900 tracking-tight">
                  Course Tutor
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  CCTU Campus
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Role-Specific Navigation */}
          <nav className="p-3 space-y-1" aria-label="Workspace navigation">
            <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {role === 'student'
                ? 'Student Workspace'
                : role === 'tutor'
                ? 'Tutor Workspace'
                : 'Admin Operations'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-[#ECF6F1] text-[#0F5C3E]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-[#0F5C3E]" />
                  )}
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </span>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full tabular-nums ${
                        isActive
                          ? 'bg-[#0F5C3E] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Workspace Role Switcher */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70">
          <div className="text-[11px] font-medium text-slate-500 mb-2">
            Switch workspace role
          </div>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/70 rounded-lg">
            {['student', 'tutor', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleSwitch(r)}
                className={`py-1.5 text-xs font-medium rounded-md capitalize transition-colors min-h-[36px] ${
                  role === r
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Lock className="w-3.5 h-3.5 text-[#0F5C3E] shrink-0" />
            <span>Paystack Escrow & Act 843</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (64px) */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
              {currentViewTitle}
            </h1>
          </div>

          {/* Current User Badge */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#ECF6F1] text-[#0F5C3E] border border-[#CBE5D8] flex items-center justify-center text-xs font-semibold shrink-0">
              {currentUserMeta.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="hidden sm:block text-right leading-tight">
              <div className="text-xs font-semibold text-slate-900">
                {currentUserMeta.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {currentUserMeta.detail}
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
          {/* ============================================================== */}
          {/* DASHBOARD 1: STUDENT WORKSPACE                                 */}
          {/* ============================================================== */}
          {role === 'student' && activeTab === 'discover' && (
            <StudentDiscoverView
              tutors={tutors}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              deliveryFilter={deliveryFilter}
              setDeliveryFilter={setDeliveryFilter}
              sessionFilter={sessionFilter}
              setSessionFilter={setSessionFilter}
              onBook={(tutor) => setBookingTutor(tutor)}
            />
          )}

          {role === 'student' && activeTab === 'sessions' && (
            <StudentSessionsView
              bookings={bookings}
              copiedId={copiedId}
              onCopyCode={handleCopyCode}
              onReportIssue={(b) => setDisputeBooking(b)}
              onRate={(b) => setRatingBooking(b)}
              onFindTutor={() => setActiveTab('discover')}
            />
          )}

          {/* ============================================================== */}
          {/* DASHBOARD 2: TUTOR WORKSPACE                                   */}
          {/* ============================================================== */}
          {role === 'tutor' && activeTab === 'schedule' && (
            <TutorScheduleView
              wallet={tutorWallet}
              tutorProfile={activeTutorProfile}
              bookings={bookings.filter((b) => b.tutorId === 't-esi')}
              onOpenCheckin={(b) => setCheckinBooking(b)}
            />
          )}

          {role === 'tutor' && activeTab === 'earnings' && (
            <TutorEarningsView
              wallet={tutorWallet}
              ledger={ledger}
              onOpenWithdraw={() => setWithdrawModalOpen(true)}
            />
          )}

          {role === 'tutor' && activeTab === 'profile' && (
            <TutorProfileView
              tutorProfile={activeTutorProfile}
              onSave={handleSaveTutorProfile}
            />
          )}

          {/* ============================================================== */}
          {/* DASHBOARD 3: ADMIN OPERATIONS WORKSPACE                        */}
          {/* ============================================================== */}
          {role === 'admin' && activeTab === 'overview' && (
            <AdminOverviewView
              escrowHeldTotal={escrowHeldTotal}
              pendingApplicants={pendingApplicants}
              activeDisputesCount={activeDisputesCount}
              platformRevenue={platformRevenue}
              onReviewApplicant={(app) => setReviewApplicant(app)}
            />
          )}

          {role === 'admin' && activeTab === 'disputes' && (
            <AdminDisputesEscrowView
              bookings={bookings}
              onResolveDispute={handleResolveDispute}
            />
          )}

          {role === 'admin' && activeTab === 'catalog' && (
            <AdminCatalogView
              schools={schools}
              courses={courses}
              onOpenAddCourse={() => setAddCourseOpen(true)}
            />
          )}
        </main>
      </div>

      {/* ================================================================== */}
      {/* MODALS                                                             */}
      {/* ================================================================== */}

      <BookingCheckoutModal
        tutor={bookingTutor}
        onClose={() => setBookingTutor(null)}
        onConfirm={handleCreateBooking}
      />

      <DisputeModal
        booking={disputeBooking}
        onClose={() => setDisputeBooking(null)}
        onSubmit={handleReportIssue}
      />

      <RatingModal
        booking={ratingBooking}
        onClose={() => setRatingBooking(null)}
        onSubmit={handleRateSession}
      />

      <CheckinVerifyModal
        booking={checkinBooking}
        onClose={() => setCheckinBooking(null)}
        onVerify={handleVerifyCheckin}
      />

      <WithdrawMoMoModal
        isOpen={withdrawModalOpen}
        availableBalance={tutorWallet.availableBalance}
        onClose={() => setWithdrawModalOpen(false)}
        onConfirm={handleWithdrawMoMo}
      />

      <ApplicantReviewModal
        applicant={reviewApplicant}
        onClose={() => setReviewApplicant(null)}
        onDecision={handleVettingDecision}
      />

      <AddCourseModal
        isOpen={addCourseOpen}
        schools={schools}
        onClose={() => setAddCourseOpen(false)}
        onAdd={handleAddCourse}
      />

      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2.5 text-sm"
        >
          {toast.tone === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// STUDENT VIEWS
// ============================================================================

function StudentDiscoverView({
  tutors,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  deliveryFilter,
  setDeliveryFilter,
  sessionFilter,
  setSessionFilter,
  onBook,
}) {
  const filteredTutors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tutors.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q) ||
        t.courses.some(
          (c) =>
            c.code.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q)
        );

      const matchesCategory =
        categoryFilter === 'all' ||
        t.courses.some((c) => c.category === categoryFilter);

      const matchesDelivery =
        deliveryFilter === 'all' || t.deliveryModes.includes(deliveryFilter);

      const matchesSession =
        sessionFilter === 'all' || t.studySessions.includes(sessionFilter);

      return matchesQuery && matchesCategory && matchesDelivery && matchesSession;
    });
  }, [tutors, searchQuery, categoryFilter, deliveryFilter, sessionFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setDeliveryFilter('all');
    setSessionFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Search & Filters Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course code (e.g., CST 204, ACC 201), title, or tutor name"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#0F5C3E] focus:ring-2 focus:ring-[#0F5C3E]/15 min-h-[44px]"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 pt-1">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 mr-1">Category:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'theory', label: 'Theory & Exam Prep' },
              { id: 'practical_software', label: 'Practical & Software' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setCategoryFilter(chip.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors min-h-[36px] ${
                  categoryFilter === chip.id
                    ? 'bg-[#0F5C3E] text-white border-[#0F5C3E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block h-4 w-px bg-slate-200" />

          {/* Delivery Mode */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 mr-1">Mode:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'on_campus', label: 'On-Campus' },
              { id: 'online', label: 'Online' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setDeliveryFilter(chip.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors min-h-[36px] ${
                  deliveryFilter === chip.id
                    ? 'bg-[#0F5C3E] text-white border-[#0F5C3E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block h-4 w-px bg-slate-200" />

          {/* Study Session */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 mr-1">Session:</span>
            {['all', 'regular', 'evening', 'weekend'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSessionFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-colors min-h-[36px] ${
                  sessionFilter === s
                    ? 'bg-[#0F5C3E] text-white border-[#0F5C3E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900 tabular-nums">{filteredTutors.length}</span> vetted CCTU tutors
        </p>
        {(searchQuery || categoryFilter !== 'all' || deliveryFilter !== 'all' || sessionFilter !== 'all') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-medium text-[#0F5C3E] hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Tutor Cards Grid */}
      {filteredTutors.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-900">No matching tutors found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try clearing your search query or adjusting the category, delivery mode, or study session filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-medium bg-[#0F5C3E] text-white rounded-lg hover:bg-[#0B462F] min-h-[40px]"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-slate-900">{tutor.name}</h3>
                      {tutor.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ECF6F1] text-[#0F5C3E] border border-[#CBE5D8]">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {tutor.department} &middot; {tutor.programmeTier}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg tabular-nums shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{tutor.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({tutor.reviewCount})</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed">{tutor.bio}</p>

                {/* Approved Courses with Grades */}
                <div className="flex flex-wrap gap-1.5">
                  {tutor.courses.map((c) => (
                    <span
                      key={c.courseId}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-50 border border-slate-200 text-slate-700"
                    >
                      <span className="font-semibold text-slate-900">{c.code}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-[#0F5C3E] font-semibold">Grade {c.grade}</span>
                    </span>
                  ))}
                </div>

                {/* Delivery & Session Tags */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="inline-flex items-center gap-1">
                    {tutor.deliveryModes.includes('on_campus') && (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>On-Campus</span>
                      </>
                    )}
                    {tutor.deliveryModes.length === 2 && <span className="mx-1">&middot;</span>}
                    {tutor.deliveryModes.includes('online') && (
                      <>
                        <Video className="w-3.5 h-3.5 text-slate-400" />
                        <span>Online</span>
                      </>
                    )}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="capitalize">
                    {tutor.studySessions.join(', ')}
                  </span>
                </div>
              </div>

              {/* Footer: Pricing + CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 tabular-nums">
                  <div>
                    <div className="text-[11px] text-slate-500">Solo rate</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {formatGHS(tutor.hourlyRateSolo)}<span className="text-xs font-normal text-slate-500">/hr</span>
                    </div>
                  </div>
                  <div className="h-7 w-px bg-slate-200" />
                  <div>
                    <div className="text-[11px] text-slate-500">Group rate</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {formatGHS(tutor.hourlyRateGroup)}<span className="text-xs font-normal text-slate-500">/hr</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onBook(tutor)}
                  className="px-4 py-2.5 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg transition-colors min-h-[44px]"
                >
                  Book session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StudentSessionsView({
  bookings,
  copiedId,
  onCopyCode,
  onReportIssue,
  onRate,
  onFindTutor,
}) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">No booked sessions yet</h3>
        <p className="text-xs text-slate-500 mt-1">
          Find a verified CCTU tutor to book your first escrow-protected session.
        </p>
        <button
          type="button"
          onClick={onFindTutor}
          className="mt-4 px-4 py-2.5 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg min-h-[44px]"
        >
          Find a tutor
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-slate-900">
                {b.courseCode} &mdash; {b.courseTitle}
              </span>
              <StatusBadge status={b.status} />
              <StatusBadge status={b.escrowStatus} />
            </div>

            <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Tutor: <strong className="text-slate-900">{b.tutorName}</strong></span>
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {b.scheduledDate} at {b.scheduledTime} ({b.durationHours}h)
              </span>
              <span className="inline-flex items-center gap-1">
                {b.deliveryMode === 'on_campus' ? (
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <Video className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className="truncate max-w-xs">{b.locationOrLink}</span>
              </span>
            </div>

            <div className="text-xs text-slate-500 tabular-nums">
              Paid {formatGHS(b.totalAmount)} via {b.paymentMethod} &middot; Ref: {b.paystackRef}
            </div>

            {b.disputeReason && (
              <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                Dispute filed: {b.disputeReason}
              </div>
            )}
          </div>

          {/* Check-In Code & Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {b.status === 'confirmed' && (
              <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-[#ECF6F1] border border-[#CBE5D8]">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-[#0F5C3E]">
                    Check-In Code
                  </div>
                  <div className="text-base font-bold tracking-widest text-[#0F5C3E] tabular-nums">
                    {b.checkinCode}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCopyCode(b.id, b.checkinCode)}
                  className="p-2 rounded-md bg-white border border-[#CBE5D8] text-[#0F5C3E] hover:bg-slate-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                  aria-label="Copy check-in code"
                >
                  {copiedId === b.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              {b.status === 'confirmed' && (
                <button
                  type="button"
                  onClick={() => onReportIssue(b)}
                  className="px-3.5 py-2 text-xs font-medium text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 rounded-lg min-h-[44px]"
                >
                  Report issue
                </button>
              )}

              {b.status === 'completed' && !b.rated && (
                <button
                  type="button"
                  onClick={() => onRate(b)}
                  className="px-3.5 py-2 text-xs font-medium text-white bg-[#0F5C3E] hover:bg-[#0B462F] rounded-lg min-h-[44px]"
                >
                  Rate session
                </button>
              )}

              {b.status === 'completed' && b.rated && (
                <span className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg tabular-nums">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Rated {b.ratingGiven}.0
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// TUTOR VIEWS
// ============================================================================

function TutorScheduleView({ wallet, tutorProfile, bookings, onOpenCheckin }) {
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const completedCount =
    tutorProfile.completedSessions +
    bookings.filter((b) => b.status === 'completed').length -
    1;

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Pending Escrow"
          value={formatGHS(wallet.pendingEscrow)}
          subtext="Releases on check-in (88% share)"
          icon={Lock}
        />
        <KpiCard
          label="Available Balance"
          value={formatGHS(wallet.availableBalance)}
          subtext="Ready for MoMo withdrawal"
          icon={Wallet}
          highlight
        />
        <KpiCard
          label="Completed Sessions"
          value={completedCount}
          subtext="Verified attendance"
          icon={CheckCircle2}
        />
        <KpiCard
          label="Average Rating"
          value={`${tutorProfile.rating.toFixed(1)} / 5.0`}
          subtext={`${tutorProfile.reviewCount} verified reviews`}
          icon={Star}
        />
      </div>

      {/* Incoming Confirmed Bookings */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Incoming confirmed bookings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter the student&apos;s 6-character Check-In Code at the session to verify attendance and release escrow.
            </p>
          </div>
        </div>

        {confirmedBookings.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-7 h-7 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">No upcoming sessions</p>
            <p className="text-xs text-slate-500 mt-1">
              New student bookings will appear here once Paystack MoMo payment is confirmed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-5">Student & Course</th>
                  <th className="py-3 px-5">Schedule & Venue</th>
                  <th className="py-3 px-5">Escrow Gross</th>
                  <th className="py-3 px-5">Your Share (88%)</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {confirmedBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-slate-900">{b.studentName}</div>
                      <div className="text-xs text-slate-500">
                        {b.courseCode} &middot; {b.sessionType === 'solo' ? 'Solo' : 'Group'}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="text-slate-900 tabular-nums">
                        {b.scheduledDate} &middot; {b.scheduledTime} ({b.durationHours}h)
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[220px]">
                        {b.locationOrLink}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 tabular-nums text-slate-700">
                      {formatGHS(b.totalAmount)}
                    </td>
                    <td className="py-3.5 px-5 tabular-nums font-semibold text-[#0F5C3E]">
                      {formatGHS(b.totalAmount * (1 - PLATFORM_FEE_RATE))}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenCheckin(b)}
                        className="px-3.5 py-2 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg min-h-[40px]"
                      >
                        Verify check-in
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function TutorEarningsView({ wallet, ledger, onOpenWithdraw }) {
  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-slate-500">Available Balance</div>
            <div className="text-2xl font-semibold text-[#0F5C3E] tabular-nums mt-1">
              {formatGHS(wallet.availableBalance)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Cleared funds eligible for instant MoMo transfer
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenWithdraw}
            disabled={wallet.availableBalance <= 0}
            className="px-4 py-2.5 bg-[#0F5C3E] hover:bg-[#0B462F] disabled:opacity-50 text-white text-xs font-medium rounded-lg min-h-[44px] shrink-0"
          >
            Withdraw to MoMo
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-xs font-medium text-slate-500">Pending Escrow Balance</div>
          <div className="text-2xl font-semibold text-slate-900 tabular-nums mt-1">
            {formatGHS(wallet.pendingEscrow)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Held securely until student attendance is verified via Check-In Code
          </div>
        </div>
      </div>

      {/* Transaction & Payout Ledger */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Transaction & Payout Ledger
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Reference</th>
                <th className="py-3 px-5">Description</th>
                <th className="py-3 px-5 text-right">Net Amount</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {ledger.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5 text-xs text-slate-500 tabular-nums whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3.5 px-5 text-xs font-mono text-slate-600 whitespace-nowrap">
                    {tx.reference}
                  </td>
                  <td className="py-3.5 px-5 text-slate-900">{tx.description}</td>
                  <td
                    className={`py-3.5 px-5 text-right font-semibold tabular-nums whitespace-nowrap ${
                      tx.netAmount < 0 ? 'text-slate-700' : 'text-[#0F5C3E]'
                    }`}
                  >
                    {tx.netAmount < 0 ? '-' : '+'}
                    {formatGHS(Math.abs(tx.netAmount))}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TutorProfileView({ tutorProfile, onSave }) {
  const [soloRate, setSoloRate] = useState(tutorProfile.hourlyRateSolo);
  const [groupRate, setGroupRate] = useState(tutorProfile.hourlyRateGroup);
  const [bio, setBio] = useState(tutorProfile.bio);
  const [sessions, setSessions] = useState(tutorProfile.studySessions);

  const toggleSession = (s) => {
    setSessions((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      hourlyRateSolo: Number(soloRate),
      hourlyRateGroup: Number(groupRate),
      bio,
      studySessions: sessions.length > 0 ? sessions : ['regular'],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl space-y-5"
    >
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Tutor Profile & Hourly Rates
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Updates reflect immediately in the Student Discovery directory.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Solo hourly rate (GHS)
          </label>
          <input
            type="number"
            min="15"
            max="200"
            value={soloRate}
            onChange={(e) => setSoloRate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg tabular-nums focus:outline-none focus:border-[#0F5C3E] min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Group hourly rate per head (GHS)
          </label>
          <input
            type="number"
            min="10"
            max="100"
            value={groupRate}
            onChange={(e) => setGroupRate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg tabular-nums focus:outline-none focus:border-[#0F5C3E] min-h-[44px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1.5">
          Tutoring bio & methodology
        </label>
        <textarea
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F5C3E]"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-2">
          Available CCTU study sessions
        </label>
        <div className="flex flex-wrap gap-2">
          {['regular', 'evening', 'weekend'].map((s) => {
            const active = sessions.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSession(s)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border capitalize min-h-[44px] ${
                  active
                    ? 'bg-[#ECF6F1] text-[#0F5C3E] border-[#0F5C3E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg min-h-[44px]"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// ADMIN VIEWS
// ============================================================================

function AdminOverviewView({
  escrowHeldTotal,
  pendingApplicants,
  activeDisputesCount,
  platformRevenue,
  onReviewApplicant,
}) {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Escrow Funds Held"
          value={formatGHS(escrowHeldTotal)}
          subtext="Active & disputed holds"
          icon={Lock}
          highlight
        />
        <KpiCard
          label="Pending Vetting Queue"
          value={pendingApplicants.length}
          subtext="Awaiting ID & transcript review"
          icon={ShieldCheck}
        />
        <KpiCard
          label="Active Disputes"
          value={activeDisputesCount}
          subtext="Frozen escrow tickets"
          icon={AlertTriangle}
        />
        <KpiCard
          label="Platform Revenue (12%)"
          value={formatGHS(platformRevenue)}
          subtext="Settled commission"
          icon={Wallet}
        />
      </div>

      {/* Tutor Vetting Queue */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Tutor Vetting Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verify Student/Staff ID and semester transcript grades (A or B+) before publishing tutors.
          </p>
        </div>

        {pendingApplicants.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">Vetting queue is clear</p>
            <p className="text-xs text-slate-500 mt-1">
              All pending tutor applications have been reviewed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-5">Applicant</th>
                  <th className="py-3 px-5">Department & Tier</th>
                  <th className="py-3 px-5">Nominated Courses</th>
                  <th className="py-3 px-5">Submitted</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {pendingApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-slate-900">{app.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{app.indexNumber}</div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="text-slate-900">{app.department}</div>
                      <div className="text-xs text-slate-500">{app.programmeTier}</div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex flex-wrap gap-1">
                        {app.courses.map((c) => (
                          <span
                            key={c.courseId}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {c.code} ({c.grade})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-500 tabular-nums whitespace-nowrap">
                      {app.submittedAt}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => onReviewApplicant(app)}
                        className="px-3.5 py-2 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg min-h-[40px]"
                      >
                        Review application
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDisputesEscrowView({ bookings, onResolveDispute }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-900">
          Escrow Ledger & Dispute Resolution
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitor held Paystack funds and resolve disputed sessions via full refund or tutor release.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              <th className="py-3 px-5">Booking & Parties</th>
              <th className="py-3 px-5">Paystack Ref</th>
              <th className="py-3 px-5">Amount</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-right">Resolution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/60">
                <td className="py-3.5 px-5">
                  <div className="font-medium text-slate-900">
                    {b.courseCode} &middot; {b.studentName} &rarr; {b.tutorName}
                  </div>
                  {b.disputeReason && (
                    <div className="text-xs text-rose-700 mt-0.5">
                      Reason: {b.disputeReason}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-5 text-xs font-mono text-slate-600">
                  {b.paystackRef}
                </td>
                <td className="py-3.5 px-5 tabular-nums font-medium text-slate-900">
                  {formatGHS(b.totalAmount)}
                </td>
                <td className="py-3.5 px-5">
                  <StatusBadge status={b.escrowStatus} />
                </td>
                <td className="py-3.5 px-5 text-right">
                  {b.status === 'disputed' ? (
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onResolveDispute(b, 'refund')}
                        className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg min-h-[36px]"
                      >
                        Refund student (100%)
                      </button>
                      <button
                        type="button"
                        onClick={() => onResolveDispute(b, 'release')}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-[#0F5C3E] hover:bg-[#0B462F] rounded-lg min-h-[36px]"
                      >
                        Release to tutor
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">No action required</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCatalogView({ schools, courses, onOpenAddCourse }) {
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredSchools = useMemo(() => {
    return schools.filter((s) => schoolFilter === 'all' || s.id === schoolFilter);
  }, [schools, schoolFilter]);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesSchool = schoolFilter === 'all' || c.schoolId === schoolFilter;
      const matchesQuery =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q);
      return matchesSchool && matchesQuery;
    });
  }, [courses, schoolFilter, query]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter courses or departments"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#0F5C3E] min-h-[44px]"
            />
          </div>
          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F5C3E] min-h-[44px]"
          >
            <option value="all">All 6 Schools (18 Departments)</option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} &mdash; {s.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={onOpenAddCourse}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Add course</span>
        </button>
      </div>

      {/* Seeded Courses Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Seeded Courses ({filteredCourses.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Code</th>
                <th className="py-3 px-5">Course Title</th>
                <th className="py-3 px-5">Department</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5 text-right">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-5 font-semibold text-slate-900 whitespace-nowrap">
                    {c.code}
                  </td>
                  <td className="py-3 px-5 text-slate-800">{c.title}</td>
                  <td className="py-3 px-5 text-xs text-slate-600">{c.department}</td>
                  <td className="py-3 px-5">
                    <StatusBadge status={c.category} />
                  </td>
                  <td className="py-3 px-5 text-right tabular-nums text-xs font-medium text-slate-600">
                    L{c.level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Hierarchy Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900 mb-3">
          CCTU Academic Structure (6 Schools, 18 Departments)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSchools.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-semibold text-[#0F5C3E]">
                  {s.name}
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {s.code}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {s.departments.map((dept) => (
                  <li key={dept} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span>{dept}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODALS IMPLEMENTATION
// ============================================================================

function BookingCheckoutModal({ tutor, onClose, onConfirm }) {
  const [courseId, setCourseId] = useState('');
  const [sessionType, setSessionType] = useState('solo');
  const [deliveryMode, setDeliveryMode] = useState('on_campus');
  const [locationOrLink, setLocationOrLink] = useState('CCTU Main Library — Study Area');
  const [date, setDate] = useState('2026-11-26');
  const [time, setTime] = useState('16:00');
  const [duration, setDuration] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('MTN MoMo');

  if (!tutor) return null;

  const selectedCourse =
    tutor.courses.find((c) => c.courseId === courseId) || tutor.courses[0];
  const unitRate =
    sessionType === 'solo' ? tutor.hourlyRateSolo : tutor.hourlyRateGroup;
  const totalAmount = unitRate * duration;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      tutor,
      course: selectedCourse,
      sessionType,
      deliveryMode,
      locationOrLink:
        deliveryMode === 'online'
          ? 'https://meet.google.com/ctu-live-session'
          : locationOrLink,
      date,
      time,
      duration,
      totalAmount,
      paymentMethod,
    });
  };

  return (
    <Modal
      isOpen={Boolean(tutor)}
      onClose={onClose}
      title={`Book session with ${tutor.name}`}
      subtitle={`${tutor.department} • Escrow-protected Paystack checkout`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Select approved course
          </label>
          <select
            value={selectedCourse.courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-[#0F5C3E] min-h-[44px]"
          >
            {tutor.courses.map((c) => (
              <option key={c.courseId} value={c.courseId}>
                {c.code} — {c.title} (Grade {c.grade})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Session type
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['solo', 'group'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSessionType(type)}
                  className={`py-2 text-xs font-medium rounded-lg border capitalize min-h-[40px] ${
                    sessionType === type
                      ? 'bg-[#ECF6F1] text-[#0F5C3E] border-[#0F5C3E]'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Delivery mode
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'on_campus', label: 'Campus' },
                { id: 'online', label: 'Online' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDeliveryMode(m.id)}
                  className={`py-2 text-xs font-medium rounded-lg border min-h-[40px] ${
                    deliveryMode === m.id
                      ? 'bg-[#ECF6F1] text-[#0F5C3E] border-[#0F5C3E]'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {deliveryMode === 'on_campus' && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              CCTU meeting spot
            </label>
            <input
              type="text"
              value={locationOrLink}
              onChange={(e) => setLocationOrLink(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F5C3E] min-h-[44px]"
            />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg bg-white min-h-[44px]"
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Paystack payment rail
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['MTN MoMo', 'Telecel Cash', 'AT Money', 'Card'].map((rail) => (
              <button
                key={rail}
                type="button"
                onClick={() => setPaymentMethod(rail)}
                className={`px-2 py-2 text-xs font-medium rounded-lg border min-h-[40px] ${
                  paymentMethod === rail
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {rail}
              </button>
            ))}
          </div>
        </div>

        {/* Escrow Summary Box */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              {formatGHS(unitRate)} &times; {duration} hr{duration > 1 ? 's' : ''}
            </span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {formatGHS(totalAmount)}
            </span>
          </div>
          <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            <Lock className="w-3.5 h-3.5 text-[#0F5C3E] shrink-0 mt-0.5" />
            <span>
              Funds are held in Course Tutor Escrow and only released after you share your 6-character Check-In Code with the tutor.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0F5C3E] hover:bg-[#0B462F] text-white text-xs font-medium rounded-lg min-h-[44px] tabular-nums"
          >
            Pay {formatGHS(totalAmount)} via {paymentMethod}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function DisputeModal({ booking, onClose, onSubmit }) {
  const [reason, setReason] = useState('Tutor did not show up at the scheduled time');
  if (!booking) return null;

  return (
    <Modal
      isOpen={Boolean(booking)}
      onClose={onClose}
      title="Report session issue"
      subtitle={`Booking ${booking.courseCode} with ${booking.tutorName}`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(booking.id, reason);
        }}
        className="space-y-4"
      >
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
          Filing a dispute immediately freezes the {formatGHS(booking.totalAmount)} escrow balance until Campus Operations reviews the case.
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Describe the issue
          </label>
          <textarea
            rows={3}
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F5C3E]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-medium bg-rose-700 hover:bg-rose-800 text-white rounded-lg min-h-[44px]"
          >
            Freeze escrow & report
          </button>
        </div>
      </form>
    </Modal>
  );
}

function RatingModal({ booking, onClose, onSubmit }) {
  const [stars, setStars] = useState(5);
  if (!booking) return null;

  return (
    <Modal
      isOpen={Boolean(booking)}
      onClose={onClose}
      title="Rate completed session"
      subtitle={`${booking.courseCode} with ${booking.tutorName}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStars(n)}
              className="p-2 rounded-lg hover:bg-slate-100"
              aria-label={`Rate ${n} stars`}
            >
              <Star
                className={`w-7 h-7 ${
                  n <= stars ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(booking.id, stars)}
            className="px-4 py-2 text-xs font-medium bg-[#0F5C3E] hover:bg-[#0B462F] text-white rounded-lg min-h-[44px]"
          >
            Submit review
          </button>
        </div>
      </div>
    </Modal>
  );
}

function CheckinVerifyModal({ booking, onClose, onVerify }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onVerify(booking, code);
    if (!ok) {
      setError(`Invalid code. Ask ${booking.studentName} for their 6-character Check-In Code.`);
    } else {
      setCode('');
      setError('');
    }
  };

  return (
    <Modal
      isOpen={Boolean(booking)}
      onClose={() => {
        setCode('');
        setError('');
        onClose();
      }}
      title="Verify student check-in"
      subtitle={`${booking.courseCode} • ${booking.studentName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Enter 6-character Check-In Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="e.g. CT8492"
            className="w-full px-4 py-3 text-center text-lg font-bold tracking-widest uppercase border border-slate-200 rounded-lg focus:outline-none focus:border-[#0F5C3E] tabular-nums"
          />
          {error && <p className="text-xs text-rose-600 mt-1.5">{error}</p>}
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 tabular-nums">
          <div className="flex justify-between">
            <span>Gross session fee:</span>
            <span>{formatGHS(booking.totalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform commission (12%):</span>
            <span>-{formatGHS(booking.totalAmount * PLATFORM_FEE_RATE)}</span>
          </div>
          <div className="flex justify-between font-semibold text-[#0F5C3E] pt-1 border-t border-slate-200">
            <span>Released to Available Balance:</span>
            <span>{formatGHS(booking.totalAmount * (1 - PLATFORM_FEE_RATE))}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-medium bg-[#0F5C3E] hover:bg-[#0B462F] text-white rounded-lg min-h-[44px]"
          >
            Verify & release escrow
          </button>
        </div>
      </form>
    </Modal>
  );
}

function WithdrawMoMoModal({ isOpen, availableBalance, onClose, onConfirm }) {
  const [network, setNetwork] = useState('MTN MoMo');
  const [phone, setPhone] = useState('+233 24 510 8812');
  const [amount, setAmount] = useState(availableBalance.toFixed(2));

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Withdraw to Mobile Money"
      subtitle={`Available balance: ${formatGHS(availableBalance)}`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm({ network, phone, amount });
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            MoMo network
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['MTN MoMo', 'Telecel Cash', 'AT Money'].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNetwork(n)}
                className={`py-2 text-xs font-medium rounded-lg border min-h-[40px] ${
                  network === n
                    ? 'bg-[#ECF6F1] text-[#0F5C3E] border-[#0F5C3E]'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Registered MoMo number
          </label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Amount to withdraw (GHS)
          </label>
          <input
            type="number"
            step="0.01"
            min="10"
            max={availableBalance}
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg tabular-nums min-h-[44px]"
          />
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
          Paystack Transfer API (Sandbox): Transfers settle to your verified recipient code within minutes.
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-medium bg-[#0F5C3E] hover:bg-[#0B462F] text-white rounded-lg min-h-[44px]"
          >
            Confirm payout
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ApplicantReviewModal({ applicant, onClose, onDecision }) {
  if (!applicant) return null;

  return (
    <Modal
      isOpen={Boolean(applicant)}
      onClose={onClose}
      title={`Vetting Review: ${applicant.name}`}
      subtitle={`${applicant.indexNumber} • ${applicant.department}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Side-by-side Verification Documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900">
                Student / Staff ID Card
              </span>
              <FileText className="w-4 h-4 text-[#0F5C3E]" />
            </div>
            <div className="text-xs font-mono text-slate-600 truncate">
              {applicant.idCardRef}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              Signed URL verified &middot; Act 843 encrypted
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900">
                Semester Transcript
              </span>
              <Award className="w-4 h-4 text-[#0F5C3E]" />
            </div>
            <div className="text-xs font-mono text-slate-600 truncate">
              {applicant.transcriptRef}
            </div>
            <div className="text-[11px] text-slate-700 font-medium tabular-nums">
              CGPA: {applicant.cgpa}
            </div>
          </div>
        </div>

        {/* Nominated Courses */}
        <div>
          <div className="text-xs font-semibold text-slate-900 mb-2">
            Nominated courses & verified grades
          </div>
          <div className="space-y-2">
            {applicant.courses.map((c) => (
              <div
                key={c.courseId}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900">{c.code}</span>
                  <span className="text-slate-600 ml-2">{c.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#ECF6F1] text-[#0F5C3E] font-semibold">
                  Grade {c.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payout & Rate Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs p-3.5 rounded-lg bg-slate-50 border border-slate-200 tabular-nums">
          <div>
            <div className="text-slate-500">Solo / Group Rate</div>
            <div className="font-semibold text-slate-900 mt-0.5">
              {formatGHS(applicant.hourlyRateSolo)} / {formatGHS(applicant.hourlyRateGroup)}
            </div>
          </div>
          <div>
            <div className="text-slate-500">MoMo Payout Wallet</div>
            <div className="font-semibold text-slate-900 mt-0.5">
              {applicant.momoNetwork} ({applicant.momoNumber})
            </div>
          </div>
          <div>
            <div className="text-slate-500">Programme Tier</div>
            <div className="font-semibold text-slate-900 mt-0.5">
              {applicant.programmeTier}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => onDecision(applicant, 'reject')}
            className="px-4 py-2.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg min-h-[44px]"
          >
            Reject application
          </button>
          <button
            type="button"
            onClick={() => onDecision(applicant, 'approve')}
            className="px-5 py-2.5 text-xs font-medium bg-[#0F5C3E] hover:bg-[#0B462F] text-white rounded-lg min-h-[44px]"
          >
            Approve & publish tutor
          </button>
        </div>
      </div>
    </Modal>
  );
}

function AddCourseModal({ isOpen, schools, onClose, onAdd }) {
  const allDepartments = schools.flatMap((s) => s.departments);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState(allDepartments[0]);
  const [category, setCategory] = useState('theory');
  const [level, setLevel] = useState('200');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;
    onAdd({ code, title, department, category, level });
    setCode('');
    setTitle('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add course to CCTU catalog"
      subtitle="Pre-seeded courses appear immediately in tutor applications and search."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Course code
            </label>
            <input
              type="text"
              required
              placeholder="CST 308"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg min-h-[44px]"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Course title
            </label>
            <input
              type="text"
              required
              placeholder="Software Engineering"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg min-h-[44px]"
          >
            {allDepartments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg min-h-[44px]"
            >
              <option value="theory">Theory & Exam Prep</option>
              <option value="practical_software">Practical & Software</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg min-h-[44px]"
            >
              {[100, 200, 300, 400, 500].map((l) => (
                <option key={l} value={l}>
                  Level {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-medium bg-[#0F5C3E] hover:bg-[#0B462F] text-white rounded-lg min-h-[44px]"
          >
            Add course
          </button>
        </div>
      </form>
    </Modal>
  );
}