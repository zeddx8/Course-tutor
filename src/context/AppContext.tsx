import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  TutorProfile,
  Booking,
  Transaction,
  TutorWallet,
  Payout,
  ChatMessage,
  Course,
  MoMoNetwork,
  SessionType,
  DeliveryMode,
} from '../types';
import {
  INITIAL_TUTORS,
  CCTU_COURSES,
  CCTU_DEPARTMENTS,
  CAMPUS_LOCATIONS,
} from '../constants/cctuData';
import { EscrowService } from '../services/escrowService';

interface AppContextType {
  // Current user & role
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  updateCurrentUser: (updates: Partial<User>) => void;

  // Catalog
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;

  // Tutors
  tutors: TutorProfile[];
  applyAsTutor: (profile: Omit<TutorProfile, 'user_id' | 'verification_status' | 'rating_avg' | 'total_reviews'>) => void;
  verifyTutor: (tutorId: string, approved: boolean, reason?: string) => void;

  // Bookings & Escrow
  bookings: Booking[];
  createBooking: (params: {
    tutorId: string;
    courseId: string;
    sessionType: SessionType;
    deliveryMode: DeliveryMode;
    locationOrLink: string;
    date: string;
    time: string;
    durationMinutes: number;
    momoNetwork: MoMoNetwork;
    momoNumber: string;
  }) => Promise<Booking>;
  verifyCheckInCode: (bookingId: string, inputCode: string) => { success: boolean; message: string };
  reportDispute: (bookingId: string, reason: string) => void;
  resolveDispute: (bookingId: string, resolution: 'refund_student' | 'release_to_tutor' | 'split') => void;
  cancelBooking: (bookingId: string) => { success: boolean; message: string };

  // Wallet & Payouts
  wallets: Record<string, TutorWallet>;
  transactions: Transaction[];
  payouts: Payout[];
  requestPayout: (tutorId: string, amount: number, momoNumber: string, momoNetwork: MoMoNetwork) => { success: boolean; message: string };

  // Reviews
  addReview: (bookingId: string, rating: number, comment: string) => void;

  // Chat
  messages: ChatMessage[];
  sendMessage: (bookingId: string | undefined, recipientId: string, text: string) => void;
}

const DEFAULT_STUDENT_USER: User = {
  id: 'usr-student-01',
  university_id: 'u-cctu-01',
  department_id: 'dept-cst',
  full_name: 'David Selorm',
  email: 'david.selorm@cctu.edu.gh',
  phone: '+233541234567',
  index_number: '052104001',
  programme_tier: 'B.Tech',
  study_session: 'regular',
  role: 'student',
  avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
  created_at: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_STUDENT_USER);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [courses, setCourses] = useState<Course[]>(CCTU_COURSES);
  const [tutors, setTutors] = useState<TutorProfile[]>(INITIAL_TUTORS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);

  // Seed sample wallets for tutors
  const [wallets, setWallets] = useState<Record<string, TutorWallet>>({
    'tut-kwame-01': {
      tutor_id: 'tut-kwame-01',
      available_balance: 180.0,
      pending_balance: 76.5,
      total_withdrawn: 450.0,
      updated_at: new Date().toISOString(),
    },
    'tut-abena-02': {
      tutor_id: 'tut-abena-02',
      available_balance: 220.0,
      pending_balance: 0.0,
      total_withdrawn: 600.0,
      updated_at: new Date().toISOString(),
    },
  });

  // Seed initial booking with escrow held
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'bk-sample-01',
      student_id: 'usr-student-01',
      student_name: 'David Selorm',
      student_phone: '+233541234567',
      student_index: '052104001',
      tutor_id: 'tut-kwame-01',
      tutor_name: 'Kwame Mensah',
      tutor_phone: '+233244123456',
      course: CCTU_COURSES[0], // CST 204
      session_type: 'solo',
      delivery_mode: 'on_campus',
      location_or_link: 'CCTU Central Library (Discussion Pods)',
      scheduled_date: 'Tomorrow',
      scheduled_time: '2:00 PM - 4:00 PM',
      duration_minutes: 120,
      total_amount: 90.0,
      platform_fee: 13.5,
      tutor_share: 76.5,
      checkin_code: 'CT-7392',
      status: 'confirmed',
      escrow_status: 'held',
      created_at: new Date().toISOString(),
    },
    {
      id: 'bk-sample-02',
      student_id: 'usr-student-01',
      student_name: 'David Selorm',
      student_phone: '+233541234567',
      student_index: '052104001',
      tutor_id: 'tut-abena-02',
      tutor_name: 'Abena Osei Poku',
      tutor_phone: '+233277987654',
      course: CCTU_COURSES[7], // ACC 101
      session_type: 'solo',
      delivery_mode: 'online',
      location_or_link: 'https://meet.google.com/cctu-tutor-acc',
      scheduled_date: 'Last Friday',
      scheduled_time: '4:00 PM - 5:00 PM',
      duration_minutes: 60,
      total_amount: 50.0,
      platform_fee: 7.5,
      tutor_share: 42.5,
      checkin_code: 'CT-1940',
      status: 'completed',
      escrow_status: 'released',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      reviewed: true,
    },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      booking_id: 'bk-sample-01',
      sender_id: 'tut-kwame-01',
      sender_name: 'Kwame Mensah',
      sender_role: 'tutor',
      recipient_id: 'usr-student-01',
      text: 'Hello David! Looking forward to our CST 204 session on Binary Trees tomorrow.',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'msg-02',
      booking_id: 'bk-sample-01',
      sender_id: 'usr-student-01',
      sender_name: 'David Selorm',
      sender_role: 'student',
      recipient_id: 'tut-kwame-01',
      text: 'Great! I will bring past questions from 2024 Mid-Sem.',
      created_at: new Date(Date.now() - 1800000).toISOString(),
    },
  ]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'student') {
      setCurrentUser(DEFAULT_STUDENT_USER);
    } else if (role === 'tutor') {
      const kwame = tutors[0];
      setCurrentUser({
        id: kwame.user_id,
        university_id: 'u-cctu-01',
        department_id: 'dept-cst',
        full_name: kwame.full_name,
        email: kwame.email,
        phone: kwame.phone,
        index_number: '052002005',
        programme_tier: 'B.Tech',
        study_session: 'regular',
        role: 'tutor',
        created_at: new Date().toISOString(),
      });
    } else if (role === 'admin') {
      setCurrentUser({
        id: 'usr-admin-01',
        university_id: 'u-cctu-01',
        department_id: 'dept-cst',
        full_name: 'Campus Admin & Ops',
        email: 'ops@cctu.coursetutor.com',
        phone: '+233244000111',
        index_number: 'CCTU-STAFF-09',
        programme_tier: 'B.Tech',
        study_session: 'regular',
        role: 'admin',
        created_at: new Date().toISOString(),
      });
    }
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `c-${Date.now()}`,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const applyAsTutor = (profileData: Omit<TutorProfile, 'user_id' | 'verification_status' | 'rating_avg' | 'total_reviews'>) => {
    const newTutor: TutorProfile = {
      ...profileData,
      user_id: `tut-${Date.now()}`,
      verification_status: 'pending',
      rating_avg: 0.0,
      total_reviews: 0,
    };
    setTutors((prev) => [newTutor, ...prev]);
  };

  const verifyTutor = (tutorId: string, approved: boolean, reason?: string) => {
    setTutors((prev) =>
      prev.map((t) => {
        if (t.user_id === tutorId) {
          return {
            ...t,
            verification_status: approved ? 'approved' : 'rejected',
            rejection_reason: reason,
            paystack_recipient_code: approved ? `RCP_${tutorId}_momo` : undefined,
          };
        }
        return t;
      })
    );

    // If approved, create initial wallet
    if (approved && !wallets[tutorId]) {
      setWallets((prev) => ({
        ...prev,
        [tutorId]: {
          tutor_id: tutorId,
          available_balance: 0.0,
          pending_balance: 0.0,
          total_withdrawn: 0.0,
          updated_at: new Date().toISOString(),
        },
      }));
    }
  };

  const createBooking = async (params: {
    tutorId: string;
    courseId: string;
    sessionType: SessionType;
    deliveryMode: DeliveryMode;
    locationOrLink: string;
    date: string;
    time: string;
    durationMinutes: number;
    momoNetwork: MoMoNetwork;
    momoNumber: string;
  }): Promise<Booking> => {
    const tutor = tutors.find((t) => t.user_id === params.tutorId);
    const course = courses.find((c) => c.id === params.courseId);

    if (!tutor || !course) throw new Error('Tutor or course not found');

    const hourlyRate = params.sessionType === 'solo' ? tutor.hourly_rate_solo : tutor.hourly_rate_group;
    const hours = params.durationMinutes / 60;
    const totalAmount = Math.round(hourlyRate * hours * 100) / 100;
    const { platformFee, tutorShare } = EscrowService.calculateSplits(totalAmount);
    const checkinCode = EscrowService.generateCheckInCode();
    const paystackRef = EscrowService.generatePaystackReference();

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      student_id: currentUser.id,
      student_name: currentUser.full_name,
      student_phone: currentUser.phone,
      student_index: currentUser.index_number,
      tutor_id: tutor.user_id,
      tutor_name: tutor.full_name,
      tutor_phone: tutor.phone,
      course,
      session_type: params.sessionType,
      delivery_mode: params.deliveryMode,
      location_or_link: params.locationOrLink,
      scheduled_date: params.date,
      scheduled_time: params.time,
      duration_minutes: params.durationMinutes,
      total_amount: totalAmount,
      platform_fee: platformFee,
      tutor_share: tutorShare,
      checkin_code: checkinCode,
      status: 'confirmed', // Confirmed after Paystack webhook hold
      escrow_status: 'held',
      created_at: new Date().toISOString(),
    };

    // Log transaction record
    const newTxn: Transaction = {
      id: `txn-${Date.now()}`,
      booking_id: newBooking.id,
      payer_id: currentUser.id,
      payer_name: currentUser.full_name,
      paystack_reference: paystackRef,
      amount: totalAmount,
      platform_fee: platformFee,
      tutor_share: tutorShare,
      escrow_status: 'held',
      created_at: new Date().toISOString(),
    };

    // Atomically increment tutor's pending balance in wallet
    setWallets((prev) => {
      const current = prev[tutor.user_id] || {
        tutor_id: tutor.user_id,
        available_balance: 0,
        pending_balance: 0,
        total_withdrawn: 0,
        updated_at: new Date().toISOString(),
      };
      return {
        ...prev,
        [tutor.user_id]: {
          ...current,
          pending_balance: current.pending_balance + tutorShare,
          updated_at: new Date().toISOString(),
        },
      };
    });

    setTransactions((prev) => [newTxn, ...prev]);
    setBookings((prev) => [newBooking, ...prev]);

    return newBooking;
  };

  /**
   * Tutor enters student's 6-character check-in code to verify session & release escrow
   */
  const verifyCheckInCode = (bookingId: string, inputCode: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      return { success: false, message: 'Booking not found.' };
    }

    if (booking.status === 'completed') {
      return { success: false, message: 'Session is already verified and completed.' };
    }

    const cleanInput = inputCode.trim().toUpperCase();
    const cleanActual = booking.checkin_code.replace('-', '').trim().toUpperCase();
    const match = cleanInput === cleanActual || cleanInput === booking.checkin_code.toUpperCase();

    if (!match) {
      return { success: false, message: 'Invalid check-in code. Please confirm with the student.' };
    }

    // Atomic Escrow Release:
    // 1. Booking becomes completed
    // 2. Escrow status becomes released
    // 3. Move tutor_share from pending_balance to available_balance
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'completed', escrow_status: 'released' }
          : b
      )
    );

    setTransactions((prev) =>
      prev.map((t) =>
        t.booking_id === bookingId ? { ...t, escrow_status: 'released' } : t
      )
    );

    setWallets((prev) => {
      const w = prev[booking.tutor_id];
      if (!w) return prev;
      return {
        ...prev,
        [booking.tutor_id]: {
          ...w,
          pending_balance: Math.max(0, w.pending_balance - booking.tutor_share),
          available_balance: w.available_balance + booking.tutor_share,
          updated_at: new Date().toISOString(),
        },
      };
    });

    return {
      success: true,
      message: `Verified! GHS ${booking.tutor_share.toFixed(2)} released from escrow to available balance.`,
    };
  };

  const reportDispute = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'disputed', dispute_reason: reason }
          : b
      )
    );
  };

  const resolveDispute = (bookingId: string, resolution: 'refund_student' | 'release_to_tutor' | 'split') => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    if (resolution === 'refund_student') {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'cancelled', escrow_status: 'refunded' } : b
        )
      );
      setWallets((prev) => {
        const w = prev[booking.tutor_id];
        if (!w) return prev;
        return {
          ...prev,
          [booking.tutor_id]: {
            ...w,
            pending_balance: Math.max(0, w.pending_balance - booking.tutor_share),
            updated_at: new Date().toISOString(),
          },
        };
      });
    } else if (resolution === 'release_to_tutor') {
      verifyCheckInCode(bookingId, booking.checkin_code);
    } else if (resolution === 'split') {
      const half = Math.round((booking.tutor_share / 2) * 100) / 100;
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'completed', escrow_status: 'released' } : b
        )
      );
      setWallets((prev) => {
        const w = prev[booking.tutor_id];
        if (!w) return prev;
        return {
          ...prev,
          [booking.tutor_id]: {
            ...w,
            pending_balance: Math.max(0, w.pending_balance - booking.tutor_share),
            available_balance: w.available_balance + half,
            updated_at: new Date().toISOString(),
          },
        };
      });
    }
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found.' };

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled', escrow_status: 'refunded' } : b
      )
    );

    setWallets((prev) => {
      const w = prev[booking.tutor_id];
      if (!w) return prev;
      return {
        ...prev,
        [booking.tutor_id]: {
          ...w,
          pending_balance: Math.max(0, w.pending_balance - booking.tutor_share),
          updated_at: new Date().toISOString(),
        },
      };
    });

    return { success: true, message: 'Booking cancelled. 100% refund credited to your Mobile Money account.' };
  };

  const requestPayout = (tutorId: string, amount: number, momoNumber: string, momoNetwork: MoMoNetwork) => {
    const wallet = wallets[tutorId];
    if (!wallet || wallet.available_balance < amount) {
      return { success: false, message: 'Insufficient available balance.' };
    }

    if (amount < 10) {
      return { success: false, message: 'Minimum withdrawal is GHS 10.00.' };
    }

    const transferCode = `TRF_${Date.now()}`;
    const newPayout: Payout = {
      id: `payout-${Date.now()}`,
      tutor_id: tutorId,
      tutor_name: currentUser.full_name,
      amount,
      momo_number: momoNumber,
      momo_network: momoNetwork,
      paystack_transfer_code: transferCode,
      status: 'success',
      created_at: new Date().toISOString(),
    };

    setWallets((prev) => ({
      ...prev,
      [tutorId]: {
        ...wallet,
        available_balance: wallet.available_balance - amount,
        total_withdrawn: wallet.total_withdrawn + amount,
        updated_at: new Date().toISOString(),
      },
    }));

    setPayouts((prev) => [newPayout, ...prev]);

    return {
      success: true,
      message: `GHS ${amount.toFixed(2)} sent via Paystack Transfer to ${momoNetwork} (${momoNumber}).`,
    };
  };

  const addReview = (bookingId: string, rating: number, comment: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, reviewed: true } : b))
    );
  };

  const sendMessage = (bookingId: string | undefined, recipientId: string, text: string) => {
    const { sanitizedText, isFlagged } = EscrowService.filterAntiBypass(text);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      booking_id: bookingId,
      recipient_id: recipientId,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      sender_role: currentRole,
      text: sanitizedText,
      created_at: new Date().toISOString(),
      is_flagged: isFlagged,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        updateCurrentUser,
        courses,
        addCourse,
        tutors,
        applyAsTutor,
        verifyTutor,
        bookings,
        createBooking,
        verifyCheckInCode,
        reportDispute,
        resolveDispute,
        cancelBooking,
        wallets,
        transactions,
        payouts,
        requestPayout,
        addReview,
        messages,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
