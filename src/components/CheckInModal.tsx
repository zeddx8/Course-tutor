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

interface CheckInModalProps {
  visible: boolean;
  onClose: () => void;
  booking: Booking | null;
  onConfirm: (code: string) => { success: boolean; message: string };
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  visible,
  onClose,
  booking,
  onConfirm,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!booking) return null;

  const handleSubmit = () => {
    if (!code.trim()) {
      setError('Please enter the 6-character check-in code.');
      return;
    }

    const res = onConfirm(code);
    if (res.success) {
      Alert.alert('Session Verified! 🎉', res.message, [
        {
          text: 'Great',
          onPress: () => {
            setCode('');
            setError('');
            onClose();
          },
        },
      ]);
    } else {
      setError(res.message);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Verify Student Attendance</Text>
          <Text style={styles.subtitle}>
            Enter the 6-character Check-In PIN provided by {booking.student_name} to confirm delivery and release GHS {booking.tutor_share.toFixed(2)} from escrow.
          </Text>

          <View style={styles.codeContainer}>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={(text) => {
                setCode(text.toUpperCase());
                setError('');
              }}
              placeholder="e.g. CT-7392"
              autoCapitalize="characters"
              maxLength={8}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.escrowNotice}>
            <Text style={styles.noticeText}>
              ⚡ Escrow Release: Funds move immediately from Pending to your Available Wallet Balance upon verification.
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit}>
              <Text style={styles.verifyText}>Verify & Release</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    ...THEME.shadows.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  codeContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    color: THEME.colors.primaryDark,
    backgroundColor: THEME.colors.primarySoft,
  },
  errorText: {
    color: THEME.colors.danger,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
  escrowNotice: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 8,
    marginVertical: 12,
  },
  noticeText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  verifyButton: {
    flex: 2,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
