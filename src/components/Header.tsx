import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { THEME } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showRoleSelector?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Course Tutor',
  subtitle = 'Cape Coast Technical University',
  showRoleSelector = true,
}) => {
  const { currentRole, switchRole, currentUser } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={styles.badgeIcon}>
            <Text style={styles.badgeIconText}>CT</Text>
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        {showRoleSelector && (
          <View style={styles.roleContainer}>
            {(['student', 'tutor', 'admin'] as UserRole[]).map((role) => {
              const active = currentRole === role;
              return (
                <TouchableOpacity
                  key={role}
                  onPress={() => switchRole(role)}
                  style={[styles.roleButton, active && styles.roleButtonActive]}
                >
                  <Text style={[styles.roleButtonText, active && styles.roleButtonTextActive]}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <View style={styles.userBanner}>
        <Text style={styles.greetingText}>
          Logged in as <Text style={styles.boldText}>{currentUser.full_name}</Text>
          {currentUser.index_number ? ` • ${currentUser.index_number}` : ''}
        </Text>
        <View style={[styles.statusPill, currentRole === 'admin' ? styles.adminPill : styles.campusPill]}>
          <Text style={styles.statusPillText}>
            {currentRole === 'student' ? 'Student Mode' : currentRole === 'tutor' ? 'Tutor Mode' : 'Campus Ops'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.primary,
    paddingTop: 48,
    paddingHorizontal: THEME.spacing.md,
    paddingBottom: THEME.spacing.md,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...THEME.shadows.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: THEME.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#D1FAE5',
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    padding: 3,
  },
  roleButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  roleButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  roleButtonText: {
    color: '#D1FAE5',
    fontSize: 11,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: THEME.colors.primaryDark,
    fontWeight: '700',
  },
  userBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  greetingText: {
    fontSize: 12,
    color: '#ECFDF5',
    flex: 1,
  },
  boldText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  campusPill: {
    backgroundColor: THEME.colors.secondaryLight,
  },
  adminPill: {
    backgroundColor: '#3B82F6',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
});
