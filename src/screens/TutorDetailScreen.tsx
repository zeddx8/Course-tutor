import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { THEME } from '../constants/theme';
import { TutorProfile, Course, SessionType, DeliveryMode } from '../types';
import { CAMPUS_LOCATIONS } from '../constants/cctuData';

interface TutorDetailScreenProps {
  tutor: TutorProfile;
  onBack: () => void;
  onInitiateBooking: (params: {
    tutor: TutorProfile;
    course: Course;
    sessionType: SessionType;
    deliveryMode: DeliveryMode;
    locationOrLink: string;
    date: string;
    time: string;
    durationMinutes: number;
  }) => void;
  onOpenDirectChat: () => void;
}

export const TutorDetailScreen: React.FC<TutorDetailScreenProps> = ({
  tutor,
  onBack,
  onInitiateBooking,
  onOpenDirectChat,
}) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [sessionType, setSessionType] = useState<SessionType>('solo');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('on_campus');
  const [selectedVenue, setSelectedVenue] = useState(CAMPUS_LOCATIONS[0]);
  const [selectedDuration, setSelectedDuration] = useState(60); // minutes
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);

  const activeCourse = tutor.courses[selectedCourseIndex];
  const hourlyRate = sessionType === 'solo' ? tutor.hourly_rate_solo : tutor.hourly_rate_group;
  const hours = selectedDuration / 60;
  const totalAmount = Math.round(hourlyRate * hours * 100) / 100;

  const timeSlots = [
    { date: 'Today', time: '4:00 PM - 5:00 PM' },
    { date: 'Tomorrow', time: '10:00 AM - 12:00 PM' },
    { date: 'Tomorrow', time: '2:00 PM - 4:00 PM' },
    { date: 'Friday', time: '3:00 PM - 5:00 PM' },
    { date: 'Saturday', time: '11:00 AM - 1:00 PM' },
  ];

  const handleProceed = () => {
    const courseObj: Course = {
      id: activeCourse.course_id,
      department_id: 'dept-cst',
      code: activeCourse.course_code,
      title: activeCourse.course_title,
      category: 'theory',
      level: 200,
    };

    const locationOrLink =
      deliveryMode === 'on_campus'
        ? selectedVenue
        : 'https://meet.google.com/cctu-session-' + Math.random().toString(36).substring(2, 6);

    onInitiateBooking({
      tutor,
      course: courseObj,
      sessionType,
      deliveryMode,
      locationOrLink,
      date: timeSlots[selectedSlotIndex].date,
      time: timeSlots[selectedSlotIndex].time,
      durationMinutes: selectedDuration,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Tutors</Text>
      </TouchableOpacity>

      {/* Tutor Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>{tutor.full_name.charAt(0)}</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{tutor.full_name}</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verified</Text>
            </View>
          </View>
          <Text style={styles.deptText}>
            Level {tutor.level} • {tutor.department_name}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>
              {tutor.rating_avg.toFixed(1)} Rating ({tutor.total_reviews} verified student reviews)
            </Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Tutor</Text>
        <Text style={styles.bioText}>{tutor.bio}</Text>
        <TouchableOpacity style={styles.chatShortcut} onPress={onOpenDirectChat}>
          <Text style={styles.chatShortcutText}>💬 Ask a Pre-Booking Question</Text>
        </TouchableOpacity>
      </View>

      {/* Select Course Taught */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select Course for Tutoring</Text>
        {tutor.courses.map((c, index) => {
          const selected = selectedCourseIndex === index;
          return (
            <TouchableOpacity
              key={c.course_id}
              style={[styles.courseOption, selected && styles.courseOptionSelected]}
              onPress={() => setSelectedCourseIndex(index)}
            >
              <View style={styles.courseCodeBadge}>
                <Text style={styles.courseCodeBadgeText}>{c.course_code}</Text>
              </View>
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>{c.course_title}</Text>
                <Text style={styles.gradeText}>Transcript Grade Verified: Grade {c.grade_achieved}</Text>
              </View>
              <Text style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
                {selected ? '●' : '○'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Session Type & Delivery */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Session Format & Mode</Text>

        <Text style={styles.subLabel}>Session Type</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, sessionType === 'solo' && styles.toggleBtnActive]}
            onPress={() => setSessionType('solo')}
          >
            <Text style={[styles.toggleBtnText, sessionType === 'solo' && styles.toggleBtnTextActive]}>
              Solo 1-on-1 (GHS {tutor.hourly_rate_solo.toFixed(0)}/hr)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, sessionType === 'group' && styles.toggleBtnActive]}
            onPress={() => setSessionType('group')}
          >
            <Text style={[styles.toggleBtnText, sessionType === 'group' && styles.toggleBtnTextActive]}>
              Group Study (GHS {tutor.hourly_rate_group.toFixed(0)}/head)
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subLabel}>Delivery Mode</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, deliveryMode === 'on_campus' && styles.toggleBtnActive]}
            onPress={() => setDeliveryMode('on_campus')}
          >
            <Text style={[styles.toggleBtnText, deliveryMode === 'on_campus' && styles.toggleBtnTextActive]}>
              📍 On-Campus (CCTU)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, deliveryMode === 'online' && styles.toggleBtnActive]}
            onPress={() => setDeliveryMode('online')}
          >
            <Text style={[styles.toggleBtnText, deliveryMode === 'online' && styles.toggleBtnTextActive]}>
              🌐 Online (Google Meet)
            </Text>
          </TouchableOpacity>
        </View>

        {deliveryMode === 'on_campus' && (
          <View style={styles.venuePicker}>
            <Text style={styles.subLabel}>Designated Campus Study Spot</Text>
            {CAMPUS_LOCATIONS.slice(0, 3).map((loc) => (
              <TouchableOpacity
                key={loc}
                style={[styles.venueOption, selectedVenue === loc && styles.venueOptionSelected]}
                onPress={() => setSelectedVenue(loc)}
              >
                <Text style={styles.venueText}>{loc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Select Time Slot */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select Available Time Slot</Text>
        <View style={styles.slotGrid}>
          {timeSlots.map((slot, idx) => {
            const active = selectedSlotIndex === idx;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.slotCard, active && styles.slotCardActive]}
                onPress={() => setSelectedSlotIndex(idx)}
              >
                <Text style={[styles.slotDate, active && styles.slotDateActive]}>{slot.date}</Text>
                <Text style={[styles.slotTime, active && styles.slotTimeActive]}>{slot.time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Checkout Bar */}
      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.totalLabel}>Total Payable (in Escrow)</Text>
          <Text style={styles.totalPrice}>GHS {totalAmount.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.payBtn} onPress={handleProceed}>
          <Text style={styles.payBtnText}>Book with MoMo →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    padding: THEME.spacing.md,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 14,
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.sm,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  avatarLetter: {
    fontSize: 26,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginRight: 6,
  },
  verifiedBadge: {
    backgroundColor: THEME.colors.successSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: THEME.colors.success,
  },
  deptText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingStar: {
    color: THEME.colors.secondaryLight,
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
  chatShortcut: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  chatShortcutText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.primary,
  },
  courseOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  courseOptionSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primarySoft,
  },
  courseCodeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  courseCodeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  gradeText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  radioCircle: {
    fontSize: 18,
    color: '#CBD5E1',
    marginLeft: 8,
  },
  radioCircleSelected: {
    color: THEME.colors.primary,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    marginBottom: 6,
    marginTop: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  toggleBtnActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  venuePicker: {
    marginTop: 10,
  },
  venueOption: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  venueOptionSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primarySoft,
  },
  venueText: {
    fontSize: 12,
    color: THEME.colors.textPrimary,
  },
  slotGrid: {
    gap: 8,
  },
  slotCard: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: '#F8FAFC',
  },
  slotCardActive: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primarySoft,
  },
  slotDate: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  slotDateActive: {
    color: THEME.colors.primaryDark,
    fontWeight: 'bold',
  },
  slotTime: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
    marginTop: 2,
  },
  slotTimeActive: {
    color: THEME.colors.primaryDark,
    fontWeight: '700',
  },
  checkoutBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginTop: 4,
    ...THEME.shadows.md,
  },
  totalLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  payBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
