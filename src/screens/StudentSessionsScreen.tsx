import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { THEME } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { BookingCard } from '../components/BookingCard';
import { DisputeModal } from '../components/DisputeModal';
import { ReviewModal } from '../components/ReviewModal';
import { Booking } from '../types';

interface StudentSessionsScreenProps {
  onOpenChat: (booking: Booking) => void;
}

export const StudentSessionsScreen: React.FC<StudentSessionsScreenProps> = ({ onOpenChat }) => {
  const { bookings, reportDispute, addReview, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedBookingForDispute, setSelectedBookingForDispute] = useState<Booking | null>(null);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [qrModalBooking, setQrModalBooking] = useState<Booking | null>(null);

  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'pending_payment'
  );
  const pastBookings = bookings.filter(
    (b) => b.status === 'completed' || b.status === 'disputed' || b.status === 'cancelled'
  );

  const displayedList = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming & Live ({upcomingBookings.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Past Sessions ({pastBookings.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Escrow Status Tip */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerText}>
          🔒 <Text style={styles.bold}>Check-In Escrow Rule:</Text> Only share your Check-In Code with your tutor when you are physically or virtually in session. Entering the code releases escrow.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {displayedList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming' ? 'No Upcoming Sessions' : 'No Past Sessions'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming'
                ? 'Search for vetted peer tutors on the Discover tab and book your study slot.'
                : 'Completed and verified tutoring sessions will appear here.'}
            </Text>
          </View>
        ) : (
          displayedList.map((item) => (
            <BookingCard
              key={item.id}
              booking={item}
              isTutor={false}
              onOpenChat={() => onOpenChat(item)}
              onReportDispute={() => setSelectedBookingForDispute(item)}
              onReview={() => setSelectedBookingForReview(item)}
              onCancel={() => cancelBooking(item.id)}
              onShowQR={() => setQrModalBooking(item)}
            />
          ))
        )}
      </ScrollView>

      {/* Dispute Modal */}
      <DisputeModal
        visible={!!selectedBookingForDispute}
        booking={selectedBookingForDispute}
        onClose={() => setSelectedBookingForDispute(null)}
        onSubmit={(bookingId, reason) => {
          reportDispute(bookingId, reason);
          setSelectedBookingForDispute(null);
        }}
      />

      {/* Review Modal */}
      <ReviewModal
        visible={!!selectedBookingForReview}
        booking={selectedBookingForReview}
        onClose={() => setSelectedBookingForReview(null)}
        onSubmit={(bookingId, rating, comment) => {
          addReview(bookingId, rating, comment);
          setSelectedBookingForReview(null);
        }}
      />

      {/* QR Code Simulation Modal */}
      <Modal visible={!!qrModalBooking} transparent animationType="fade">
        <View style={styles.qrOverlay}>
          <View style={styles.qrCard}>
            <Text style={styles.qrTitle}>Session Check-In PIN</Text>
            <Text style={styles.qrSubtitle}>
              Show this code to {qrModalBooking?.tutor_name} to authorize escrow release.
            </Text>

            {/* QR Visual */}
            <View style={styles.qrBox}>
              <Text style={styles.qrFakeIcon}>📱</Text>
              <Text style={styles.qrBigCode}>{qrModalBooking?.checkin_code}</Text>
            </View>

            <Text style={styles.qrWarning}>
              Only show this at the venue when the tutor has arrived and begun teaching.
            </Text>

            <TouchableOpacity style={styles.closeQrBtn} onPress={() => setQrModalBooking(null)}>
              <Text style={styles.closeQrBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    paddingHorizontal: THEME.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: THEME.colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  tabTextActive: {
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  infoBanner: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    marginHorizontal: THEME.spacing.md,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  infoBannerText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    padding: THEME.spacing.md,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
    lineHeight: 18,
  },
  qrOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  qrSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  qrBox: {
    width: 200,
    height: 180,
    backgroundColor: THEME.colors.primarySoft,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  qrFakeIcon: {
    fontSize: 48,
    marginBottom: 6,
  },
  qrBigCode: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 4,
    color: THEME.colors.primaryDark,
  },
  qrWarning: {
    fontSize: 11,
    color: THEME.colors.danger,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 16,
  },
  closeQrBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  closeQrBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
