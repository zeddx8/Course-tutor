import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { THEME } from '../constants/theme';
import { Booking } from '../types';

interface DisputeModalProps {
  visible: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSubmit: (bookingId: string, reason: string) => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  visible,
  onClose,
  booking,
  onSubmit,
}) => {
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState<'no_show' | 'late' | 'incompetent' | 'other'>('no_show');

  if (!booking) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert('Error', 'Please describe the issue in detail.');
      return;
    }

    const fullReason = `[Category: ${category.toUpperCase()}] ${reason}`;
    onSubmit(booking.id, fullReason);
    Alert.alert(
      'Issue Reported',
      'The session escrow balance has been frozen. Our Campus Operations team will review chat logs, check-in attempts, and contact both parties within 24 hours.',
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Report Session Issue / Dispute</Text>
          <Text style={styles.subtitle}>
            Booking: {booking.course.code} with {booking.tutor_name}
          </Text>

          <View style={styles.categoryRow}>
            {[
              { id: 'no_show', label: 'Tutor No-Show' },
              { id: 'late', label: 'Late Arrival (>20m)' },
              { id: 'incompetent', label: 'Incomplete Delivery' },
              { id: 'other', label: 'Other Issue' },
            ].map((cat) => {
              const selected = category === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryChip, selected && styles.categoryChipSelected]}
                  onPress={() => setCategory(cat.id as any)}
                >
                  <Text style={[styles.categoryChipText, selected && styles.categoryChipTextSelected]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.inputLabel}>Detailed Description of Issue</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={reason}
            onChangeText={setReason}
            placeholder="Please detail what occurred at the session..."
          />

          <View style={styles.freezeNotice}>
            <Text style={styles.freezeNoticeText}>
              ❄️ Escrow Protection: Funds will NOT be released to the tutor while this dispute is pending resolution.
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Freeze & Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: THEME.spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipSelected: {
    backgroundColor: THEME.colors.dangerSoft,
    borderColor: THEME.colors.danger,
  },
  categoryChipText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: THEME.colors.danger,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
  },
  textArea: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#F8FAFC',
    marginBottom: 12,
  },
  freezeNotice: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  freezeNoticeText: {
    fontSize: 11,
    color: '#991B1B',
    lineHeight: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  submitBtn: {
    flex: 2,
    backgroundColor: THEME.colors.danger,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
