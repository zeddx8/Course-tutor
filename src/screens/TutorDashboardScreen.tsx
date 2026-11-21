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
import { useApp } from '../context/AppContext';
import { BookingCard } from '../components/BookingCard';
import { CheckInModal } from '../components/CheckInModal';
import { WithdrawModal } from '../components/WithdrawModal';
import { Booking } from '../types';

interface TutorDashboardScreenProps {
  onOpenChat: (booking: Booking) => void;
  onApplyTutor: () => void;
}

export const TutorDashboardScreen: React.FC<TutorDashboardScreenProps> = ({
  onOpenChat,
  onApplyTutor,
}) => {
  const { currentUser, wallets, bookings, verifyCheckInCode, requestPayout, payouts } = useApp();
  const [selectedBookingForCheckIn, setSelectedBookingForCheckIn] = useState<Booking | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const tutorWallet = wallets[currentUser.id] || {
    tutor_id: currentUser.id,
    available_balance: 180.0,
    pending_balance: 76.5,
    total_withdrawn: 450.0,
    updated_at: new Date().toISOString(),
  };

  const incomingSessions = bookings.filter((b) => b.tutor_id === currentUser.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Wallet Card */}
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <Text style={styles.walletCardTitle}>Tutor Earnings & Escrow</Text>
          <View style={styles.walletBadge}>
            <Text style={styles.walletBadgeText}>Paystack MoMo Active</Text>
          </View>
        </View>

        <View style={styles.balanceGrid}>
          <View style={styles.balanceCol}>
            <Text style={styles.balanceSubLabel}>Available to Withdraw</Text>
            <Text style={styles.availableAmount}>
              GHS {tutorWallet.available_balance.toFixed(2)}
            </Text>
          </View>

          <View style={styles.balanceCol}>
            <Text style={styles.balanceSubLabel}>Held in Escrow</Text>
            <Text style={styles.pendingAmount}>
              GHS {tutorWallet.pending_balance.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.walletFooter}>
          <Text style={styles.escrowNote}>
            Funds held in escrow are released when you enter the student's 6-character check-in code.
          </Text>

          <TouchableOpacity
            style={styles.withdrawBtn}
            onPress={() => setShowWithdrawModal(true)}
          >
            <Text style={styles.withdrawBtnText}>Withdraw to MoMo →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Attendance Check-In Button */}
      <TouchableOpacity
        style={styles.bigCheckInAction}
        onPress={() => {
          const firstConfirmed = incomingSessions.find((s) => s.status === 'confirmed');
          if (firstConfirmed) {
            setSelectedBookingForCheckIn(firstConfirmed);
          } else {
            Alert.alert('Attendance Check-In', 'No currently confirmed sessions pending verification.');
          }
        }}
      >
        <Text style={styles.checkInActionIcon}>🔑</Text>
        <View style={styles.checkInActionText}>
          <Text style={styles.checkInActionTitle}>Verify Student Check-In Code</Text>
          <Text style={styles.checkInActionSubtitle}>
            Enter PIN to mark attendance and release session payout immediately
          </Text>
        </View>
      </TouchableOpacity>

      {/* Upcoming Assigned Sessions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Tutoring Sessions</Text>
        <Text style={styles.countBadge}>{incomingSessions.length} total</Text>
      </View>

      {incomingSessions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No student bookings scheduled yet.</Text>
        </View>
      ) : (
        incomingSessions.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            isTutor={true}
            onOpenChat={() => onOpenChat(booking)}
            onVerifyCheckIn={() => setSelectedBookingForCheckIn(booking)}
          />
        ))
      )}

      {/* Payout History Ledger */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent MoMo Payouts</Text>
      </View>
      {payouts.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No MoMo withdrawals yet.</Text>
        </View>
      ) : (
        payouts.map((p) => (
          <View key={p.id} style={styles.payoutItem}>
            <View>
              <Text style={styles.payoutAmount}>GHS {p.amount.toFixed(2)}</Text>
              <Text style={styles.payoutDetails}>
                {p.momo_network} • {p.momo_number}
              </Text>
            </View>
            <View style={styles.payoutStatusBadge}>
              <Text style={styles.payoutStatusText}>✓ {p.status.toUpperCase()}</Text>
            </View>
          </View>
        ))
      )}

      {/* Check-In Modal */}
      <CheckInModal
        visible={!!selectedBookingForCheckIn}
        booking={selectedBookingForCheckIn}
        onClose={() => setSelectedBookingForCheckIn(null)}
        onConfirm={(code) => {
          if (!selectedBookingForCheckIn) return { success: false, message: 'No booking' };
          return verifyCheckInCode(selectedBookingForCheckIn.id, code);
        }}
      />

      {/* Withdraw Modal */}
      <WithdrawModal
        visible={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        wallet={tutorWallet}
        defaultMomoNumber={currentUser.phone.replace('+233', '0')}
        defaultNetwork="MTN"
        onConfirmPayout={(amount, momoNumber, network) => {
          return requestPayout(currentUser.id, amount, momoNumber, network);
        }}
      />
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
  walletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 16,
    ...THEME.shadows.md,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  walletCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  walletBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  walletBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#B45309',
  },
  balanceGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  balanceCol: {
    flex: 1,
  },
  balanceSubLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginBottom: 4,
  },
  availableAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  pendingAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.secondary,
  },
  walletFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  escrowNote: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    lineHeight: 15,
    marginBottom: 12,
  },
  withdrawBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  withdrawBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bigCheckInAction: {
    backgroundColor: THEME.colors.primarySoft,
    borderWidth: 1.5,
    borderColor: THEME.colors.primary,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkInActionIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  checkInActionText: {
    flex: 1,
  },
  checkInActionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.primaryDark,
  },
  checkInActionSubtitle: {
    fontSize: 11,
    color: THEME.colors.primary,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  countBadge: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 13,
    color: THEME.colors.textMuted,
  },
  payoutItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  payoutAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  payoutDetails: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  payoutStatusBadge: {
    backgroundColor: THEME.colors.successSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  payoutStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: THEME.colors.success,
  },
});
