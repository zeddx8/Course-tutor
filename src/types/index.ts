export type UserRole = 'student' | 'tutor' | 'admin';

export type StudySession = 'regular' | 'evening' | 'weekend';

export type ProgrammeTier =
  | 'M.Tech'
  | 'B.Tech'
  | 'B.Tech_TopUp'
  | 'B.A.'
  | 'HND'
  | 'Diploma'
  | 'Prof_Diploma';

export type CourseCategory = 'theory' | 'practical_software';

export type TutorVerificationStatus = 'pending' | 'approved' | 'rejected';

export type MoMoNetwork = 'MTN' | 'Telecel' | 'AT';

export type DeliveryMode = 'on_campus' | 'online';

export type SessionType = 'solo' | 'group';

export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'disputed'
  | 'cancelled';

export type EscrowStatus = 'held' | 'released' | 'refunded';

export interface University {
  id: string;
  name: string;
  short_code: string;
}

export interface School {
  id: string;
  university_id: string;
  name: string;
  short_code: string;
}

export interface Department {
  id: string;
  school_id: string;
  name: string;
}

export interface Course {
  id: string;
  department_id: string;
  code: string;
  title: string;
  category: CourseCategory;
  level: 100 | 200 | 300 | 400 | 500;
  department_name?: string;
}

export interface User {
  id: string;
  university_id: string;
  department_id: string;
  full_name: string;
  email: string;
  phone: string;
  index_number: string;
  programme_tier: ProgrammeTier;
  study_session: StudySession;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface TutorCourseGrade {
  course_id: string;
  course_code: string;
  course_title: string;
  grade_achieved: 'A' | 'B+' | 'B';
}

export interface TutorProfile {
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  bio: string;
  hourly_rate_solo: number; // in GHS
  hourly_rate_group: number; // per head in GHS
  id_card_url: string;
  transcript_url: string;
  momo_number: string;
  momo_network: MoMoNetwork;
  paystack_recipient_code?: string;
  verification_status: TutorVerificationStatus;
  rejection_reason?: string;
  rating_avg: number;
  total_reviews: number;
  level: number;
  department_name: string;
  courses: TutorCourseGrade[];
  available_days: string[];
}

export interface Booking {
  id: string;
  student_id: string;
  student_name: string;
  student_phone: string;
  student_index: string;
  tutor_id: string;
  tutor_name: string;
  tutor_phone: string;
  course: Course;
  session_type: SessionType;
  delivery_mode: DeliveryMode;
  location_or_link: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  total_amount: number; // GHS
  platform_fee: number; // 10-15% commission
  tutor_share: number;
  checkin_code: string; // 6-character code
  status: BookingStatus;
  escrow_status: EscrowStatus;
  created_at: string;
  dispute_reason?: string;
  reviewed?: boolean;
}

export interface Transaction {
  id: string;
  booking_id: string;
  payer_id: string;
  payer_name: string;
  paystack_reference: string;
  amount: number;
  platform_fee: number;
  tutor_share: number;
  escrow_status: EscrowStatus;
  created_at: string;
}

export interface TutorWallet {
  tutor_id: string;
  available_balance: number;
  pending_balance: number;
  total_withdrawn: number;
  updated_at: string;
}

export interface Payout {
  id: string;
  tutor_id: string;
  tutor_name: string;
  amount: number;
  momo_number: string;
  momo_network: MoMoNetwork;
  paystack_transfer_code: string;
  status: 'pending' | 'success' | 'failed';
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  student_id: string;
  student_name: string;
  tutor_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  booking_id?: string;
  recipient_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  text: string;
  created_at: string;
  is_flagged?: boolean;
}
