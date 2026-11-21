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
import { CCTU_DEPARTMENTS, CCTU_SCHOOLS } from '../constants/cctuData';

export const AdminDashboardScreen: React.FC = () => {
  const { tutors, verifyTutor, bookings, resolveDispute, courses } = useApp();
  const [activeTab, setActiveTab] = useState<'vetting' | 'escrow' | 'catalog'>('vetting');

  const pendingTutors = tutors.filter((t) => t.verification_status === 'pending');
  const disputedBookings = bookings.filter((b) => b.status === 'disputed');
  const heldTransactionsCount = bookings.filter((b) => b.escrow_status === 'held').length;
  const totalHeldAmount = bookings
    .filter((b) => b.escrow_status === 'held')
    .reduce((sum, b) => sum + b.total_amount, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Admin Summary Cards */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Escrow Funds Held</Text>
          <Text style={styles.metricVal}>GHS {totalHeldAmount.toFixed(2)}</Text>
          <Text style={styles.metricSub}>{heldTransactionsCount} Active Holds</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Pending Vetting</Text>
          <Text style={styles.metricVal}>{pendingTutors.length}</Text>
          <Text style={styles.metricSub}>Applicant Queue</Text>
        </View>
      </View>

      {/* Admin Sub Navigation Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vetting' && styles.tabActive]}
          onPress={() => setActiveTab('vetting')}
        >
          <Text style={[styles.tabText, activeTab === 'vetting' && styles.tabTextActive]}>
            Tutor Vetting ({pendingTutors.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'escrow' && styles.tabActive]}
          onPress={() => setActiveTab('escrow')}
        >
          <Text style={[styles.tabText, activeTab === 'escrow' && styles.tabTextActive]}>
            Disputes & Escrow ({disputedBookings.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'catalog' && styles.tabActive]}
          onPress={() => setActiveTab('catalog')}
        >
          <Text style={[styles.tabText, activeTab === 'catalog' && styles.tabTextActive]}>
            CCTU Catalog ({courses.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* TAB 1: TUTOR VETTING QUEUE */}
      {activeTab === 'vetting' && (
        <View>
          <Text style={styles.sectionHeading}>Pending Tutor Applications</Text>
          {pendingTutors.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyCardText}>No tutors currently awaiting vetting.</Text>
            </View>
          ) : (
            pendingTutors.map((tutor) => (
              <View key={tutor.user_id} style={styles.applicantCard}>
                <View style={styles.applicantHeader}>
                  <View>
                    <Text style={styles.applicantName}>{tutor.full_name}</Text>
                    <Text style={styles.applicantSub}>
                      Level {tutor.level} • {tutor.department_name}
                    </Text>
                  </View>
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingBadgeText}>Pending Vetting</Text>
                  </View>
                </View>

                <Text style={styles.applicantBio}>{tutor.bio}</Text>

                <View style={styles.docProofRow}>
                  <View style={styles.docChip}>
                    <Text style={styles.docChipText}>🪪 ID: Verified CCTU Card</Text>
                  </View>
                  <View style={styles.docChip}>
                    <Text style={styles.docChipText}>📄 Transcript: A in Courses</Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => {
                      verifyTutor(tutor.user_id, false, 'Transcript verification insufficient');
                      Alert.alert('Application Rejected', `${tutor.full_name} has been notified.`);
                    }}
                  >
                    <Text style={styles.rejectBtnText}>Reject</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.approveBtn}
                    onPress={() => {
                      verifyTutor(tutor.user_id, true);
                      Alert.alert('Tutor Approved! ✅', `${tutor.full_name} is now live and Paystack recipient code generated.`);
                    }}
                  >
                    <Text style={styles.approveBtnText}>Approve & Register Recipient</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* TAB 2: DISPUTES & ESCROW RESOLUTION */}
      {activeTab === 'escrow' && (
        <View>
          <Text style={styles.sectionHeading}>Disputed Tutoring Sessions</Text>
          {disputedBookings.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyCardText}>No active session disputes.</Text>
            </View>
          ) : (
            disputedBookings.map((bk) => (
              <View key={bk.id} style={styles.disputeCard}>
                <Text style={styles.disputeTitle}>
                  {bk.course.code}: {bk.student_name} vs. {bk.tutor_name}
                </Text>
                <Text style={styles.disputeAmount}>
                  Held Amount: GHS {bk.total_amount.toFixed(2)} (Tutor share: GHS {bk.tutor_share.toFixed(2)})
                </Text>
                <View style={styles.disputeReasonBox}>
                  <Text style={styles.disputeReasonLabel}>Reported Reason:</Text>
                  <Text style={styles.disputeReasonText}>{bk.dispute_reason}</Text>
                </View>

                <View style={styles.resolutionRow}>
                  <TouchableOpacity
                    style={styles.refundBtn}
                    onPress={() => {
                      resolveDispute(bk.id, 'refund_student');
                      Alert.alert('Refund Executed', '100% refund credited back to student MoMo account.');
                    }}
                  >
                    <Text style={styles.refundBtnText}>100% Student Refund</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.splitBtn}
                    onPress={() => {
                      resolveDispute(bk.id, 'split');
                      Alert.alert('Split Executed', '50% released to tutor, 50% refunded to student.');
                    }}
                  >
                    <Text style={styles.splitBtnText}>50/50 Split</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.releaseBtn}
                    onPress={() => {
                      resolveDispute(bk.id, 'release_to_tutor');
                      Alert.alert('Released', 'Escrow released to tutor wallet.');
                    }}
                  >
                    <Text style={styles.releaseBtnText}>Release to Tutor</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* TAB 3: CCTU CATALOG */}
      {activeTab === 'catalog' && (
        <View>
          <Text style={styles.sectionHeading}>CCTU Academic Structure (18 Departments)</Text>
          {CCTU_SCHOOLS.map((school) => {
            const depts = CCTU_DEPARTMENTS.filter((d) => d.school_id === school.id);
            return (
              <View key={school.id} style={styles.schoolCard}>
                <Text style={styles.schoolName}>{school.name} ({school.short_code})</Text>
                {depts.map((d) => (
                  <View key={d.id} style={styles.deptItem}>
                    <Text style={styles.deptItemText}>• {d.name}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      )}
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
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginTop: 4,
  },
  metricSub: {
    fontSize: 10,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: THEME.colors.primary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginBottom: 10,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  emptyCardText: {
    fontSize: 13,
    color: THEME.colors.textMuted,
  },
  applicantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 12,
  },
  applicantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicantName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  applicantSub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  pendingBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#B45309',
  },
  applicantBio: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginVertical: 8,
  },
  docProofRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  docChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  docChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.danger,
  },
  rejectBtnText: {
    color: THEME.colors.danger,
    fontWeight: 'bold',
    fontSize: 12,
  },
  approveBtn: {
    flex: 2,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  approveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  disputeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginBottom: 12,
  },
  disputeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  disputeAmount: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  disputeReasonBox: {
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  disputeReasonLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#991B1B',
  },
  disputeReasonText: {
    fontSize: 12,
    color: '#7F1D1D',
    marginTop: 2,
  },
  resolutionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  refundBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  refundBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  splitBtn: {
    flex: 1,
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  splitBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  releaseBtn: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  releaseBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  schoolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginBottom: 6,
  },
  deptItem: {
    paddingVertical: 2,
  },
  deptItemText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
});
