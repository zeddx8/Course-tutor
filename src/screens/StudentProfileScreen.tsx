import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import { useApp } from '../context/AppContext';

interface StudentProfileScreenProps {
  onApplyTutor: () => void;
}

export const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({ onApplyTutor }) => {
  const { currentUser, switchRole } = useApp();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{currentUser.full_name.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{currentUser.full_name}</Text>
        <Text style={styles.userIndex}>Index: {currentUser.index_number}</Text>
        <Text style={styles.userDept}>
          {currentUser.programme_tier} • {currentUser.study_session.toUpperCase()} Session
        </Text>
      </View>

      {/* Become a Tutor Promo */}
      <View style={styles.tutorPromoCard}>
        <Text style={styles.tutorPromoTitle}>Earn as a Peer Tutor at CCTU</Text>
        <Text style={styles.tutorPromoDesc}>
          Did you score an A or B+ in CST 204, ACC 101, or Engineering Math? Turn your knowledge into income with automated MoMo payouts.
        </Text>
        <TouchableOpacity style={styles.tutorPromoBtn} onPress={onApplyTutor}>
          <Text style={styles.tutorPromoBtnText}>Apply as Tutor & Upload Transcript →</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Account Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>Campus:</Text>
          <Text style={styles.infoVal}>Cape Coast Technical University</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>Email:</Text>
          <Text style={styles.infoVal}>{currentUser.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>Phone (MoMo):</Text>
          <Text style={styles.infoVal}>{currentUser.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>Regulatory:</Text>
          <Text style={styles.infoVal}>Act 843 Data Protection Compliant</Text>
        </View>
      </View>

      {/* Role Switcher Shortcuts */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Switch Application Mode</Text>
        <View style={styles.roleBtnRow}>
          <TouchableOpacity style={styles.roleToggle} onPress={() => switchRole('student')}>
            <Text style={styles.roleToggleText}>Student Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roleToggle} onPress={() => switchRole('tutor')}>
            <Text style={styles.roleToggleText}>Tutor Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roleToggle} onPress={() => switchRole('admin')}>
            <Text style={styles.roleToggleText}>Campus Ops</Text>
          </TouchableOpacity>
        </View>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  userIndex: {
    fontSize: 13,
    color: THEME.colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  userDept: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  tutorPromoCard: {
    backgroundColor: THEME.colors.secondarySoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tutorPromoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#92400E',
  },
  tutorPromoDesc: {
    fontSize: 12,
    color: '#78350F',
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 16,
  },
  tutorPromoBtn: {
    backgroundColor: THEME.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tutorPromoBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoKey: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  roleBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  roleToggle: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  roleToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
});
