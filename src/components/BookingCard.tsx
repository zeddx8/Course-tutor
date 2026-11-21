import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
  isTutor?: boolean;
  onOpenChat: () => void;
  onVerifyCheckIn?: () => void;
  onReportDispute?: () => void;
  onReview?: () => void;
  onCancel?: () => void;
  onShowQR?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isTutor = false,
  onOpenChat,
  onVerifyCheckIn,
  onReportDispute,
  onReview,
  onCancel,
  onShowQR,
}) => {
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'confirmed':
        return { bg: THEME.colors.primarySoft, text: THEME.colors.primary, label: 'Confirmed (In Escrow)' };
      case 'in_progress':
        return { bg: THEME.colors.warningSoft, text: THEME.colors.warning, label: 'In Progress' };
      case 'completed':
        return { bg: THEME.colors.successSoft, text: THEME.colors.success, label: 'Completed & Released' };
      case 'disputed':
        return { bg: THEME.colors.dangerSoft, text: THEME.colors.danger, label: 'Disputed (Frozen)' };
      case 'cancelled':
        return { bg: '#F1F5F9', text: THEME.colors.textMuted, label: 'Cancelled & Refunded' };
      default:
        return { bg: '#F1F5F9', text: THEME.colors.textMuted, label: booking.status };
    }
  };

  const status = getStatusBadge();

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.courseBadge}>
          <Text style={styles.courseCode}>{booking.course.code}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.text }]}>{status.label}</Text>
        </View>
      </View>

      <Text style={styles.courseTitle}>{booking.course.title}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{isTutor ? 'Student' : 'Tutor'}:</Text>
        <Text style={styles.infoValue}>{isTutor ? booking.student_name : booking.tutor_name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Schedule:</Text>
        <Text style={styles.infoValue}>
          {booking.scheduled_date} • {booking.scheduled_time} ({booking.duration_minutes} min)
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Delivery:</Text>
        <Text style={styles.infoValue}>
          {booking.delivery_mode === 'on_campus' ? '📍 ' : '🌐 '}
          {booking.location_or_link}
        </Text>
      </View>

      {/* 6-Character Check-In Code Box */}
      {booking.status === 'confirmed' && (
        <View style={styles.checkInBox}>
          <View>
            <Text style={styles.checkInLabel}>
              {isTutor ? 'Session Attendance Pin' : 'Your Check-In Pin (Give to Tutor)'}
            </Text>
            <Text style={styles.checkInCode}>
              {isTutor ? '•••••• (Ask Student)' : booking.checkin_code}
            </Text>
          </View>
          {!isTutor && onShowQR && (
            <TouchableOpacity style={styles.qrButton} onPress={onShowQR}>
              <Text style={styles.qrButtonText}>Show QR</Text>
            </TouchableOpacity>
          )}
          {isTutor && onVerifyCheckIn && (
            <TouchableOpacity style={styles.verifyButton} onPress={onVerifyCheckIn}>
              <Text style={styles.verifyButtonText}>Enter Code</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Escrow & Payment Summary */}
      <View style={styles.paymentSummaryRow}>
        <Text style={styles.amountText}>
          Total: <Text style={styles.boldAmount}>GHS {booking.total_amount.toFixed(2)}</Text>
        </Text>
        <Text style={styles.escrowStatusText}>
          Escrow: <Text style={styles.boldText}>{booking.escrow_status.toUpperCase()}</Text>
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.chatButton} onPress={onOpenChat}>
          <Text style={styles.chatButtonText}>💬 Message</Text>
        </TouchableOpacity>

        {!isTutor && booking.status === 'confirmed' && onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {!isTutor && booking.status === 'completed' && !booking.reviewed && onReview && (
          <TouchableOpacity style={styles.reviewButton} onPress={onReview}>
            <Text style={styles.reviewButtonText}>★ Rate Session</Text>
          </TouchableOpacity>
        )}

        {booking.status === 'confirmed' && onReportDispute && (
          <TouchableOpacity style={styles.disputeButton} onPress={onReportDispute}>
            <Text style={styles.disputeButtonText}>Report Issue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radii.lg,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  courseBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    width: 65,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    flex: 1,
  },
  checkInBox: {
    backgroundColor: THEME.colors.primarySoft,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkInLabel: {
    fontSize: 11,
    color: THEME.colors.primaryDark,
    fontWeight: '600',
  },
  checkInCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    letterSpacing: 2,
    marginTop: 2,
  },
  qrButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qrButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  verifyButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  paymentSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 4,
  },
  amountText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
  },
  boldAmount: {
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  escrowStatusText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  boldText: {
    fontWeight: '700',
    color: THEME.colors.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
    flexWrap: 'wrap',
  },
  chatButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  chatButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  reviewButton: {
    backgroundColor: THEME.colors.secondarySoft,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  reviewButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.colors.secondary,
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 12,
    color: THEME.colors.danger,
    fontWeight: '600',
  },
  disputeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  disputeButtonText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
});
