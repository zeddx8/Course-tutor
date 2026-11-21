import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { TutorProfile } from '../types';

interface TutorCardProps {
  tutor: TutorProfile;
  onPress: () => void;
  onBook: () => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor, onPress, onBook }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitial}>{tutor.full_name.charAt(0)}</Text>
        </View>

        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{tutor.full_name}</Text>
            {tutor.verification_status === 'approved' && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.department}>
            Level {tutor.level} • {tutor.department_name}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>
              {tutor.rating_avg.toFixed(1)} ({tutor.total_reviews} reviews)
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.bio} numberOfLines={2}>
        {tutor.bio}
      </Text>

      {/* Course Tags */}
      <View style={styles.courseList}>
        {tutor.courses.map((c) => (
          <View key={c.course_id} style={styles.courseChip}>
            <Text style={styles.courseChipText}>
              {c.course_code} <Text style={styles.gradeBadge}>({c.grade_achieved})</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* Pricing & Booking Footer */}
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.rateLabel}>Hourly Rate</Text>
          <View style={styles.ratesContainer}>
            <Text style={styles.soloRate}>
              GHS {tutor.hourly_rate_solo.toFixed(0)}
              <Text style={styles.rateUnit}> /solo</Text>
            </Text>
            <Text style={styles.groupRate}>
              GHS {tutor.hourly_rate_group.toFixed(0)}
              <Text style={styles.rateUnit}> /group</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={onBook}>
          <Text style={styles.bookButtonText}>Book Slot</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radii.lg,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.sm,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
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
    fontWeight: '700',
    color: THEME.colors.success,
  },
  department: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  star: {
    color: THEME.colors.secondaryLight,
    fontSize: 14,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  bio: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
    marginBottom: THEME.spacing.sm,
  },
  courseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: THEME.spacing.md,
  },
  courseChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  gradeBadge: {
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: THEME.spacing.sm,
  },
  rateLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
  },
  ratesContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  soloRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  groupRate: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.secondary,
  },
  rateUnit: {
    fontSize: 10,
    fontWeight: 'normal',
    color: THEME.colors.textMuted,
  },
  bookButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: THEME.radii.md,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
