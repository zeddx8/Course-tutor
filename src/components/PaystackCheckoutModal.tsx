import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { THEME } from '../constants/theme';
import { MoMoNetwork, TutorProfile, Course, SessionType, DeliveryMode } from '../types';

interface PaystackCheckoutModalProps {
  visible: boolean;
  onClose: () => void;
  tutor: TutorProfile;
  course: Course;
  sessionType: SessionType;
  deliveryMode: DeliveryMode;
  locationOrLink: string;
  date: string;
  time: string;
  durationMinutes: number;
  onSuccess: (momoNetwork: MoMoNetwork, momoNumber: string) => void;
}

export const PaystackCheckoutModal: React.FC<PaystackCheckoutModalProps> = ({
  visible,
  onClose,
  tutor,
  course,
  sessionType,
  deliveryMode,
  locationOrLink,
  date,
  time,
  durationMinutes,
  onSuccess,
}) => {
  const [network, setNetwork] = useState<MoMoNetwork>('MTN');
  const [phone, setPhone] = useState('0244123456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'authorizing' | 'success'>('form');

  const hourlyRate = sessionType === 'solo' ? tutor.hourly_rate_solo : tutor.hourly_rate_group;
  const hours = durationMinutes / 60;
  const totalAmount = Math.round(hourlyRate * hours * 100) / 100;
  const platformFee = Math.round(totalAmount * 0.15 * 100) / 100;
  const tutorShare = Math.round((totalAmount - platformFee) * 100) / 100;

  const handlePay = () => {
    setIsProcessing(true);
    setStep('authorizing');

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setTimeout(() => {
        onSuccess(network, phone);
        setStep('form');
      }, 1500);
    }, 2000);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Paystack Escrow Checkout</Text>
              <Text style={styles.subtitle}>Mobile Money & Card Gateway (Ghana)</Text>
            </View>
            <TouchableOpacity onPress={onClose} disabled={isProcessing}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {step === 'form' && (
            <View>
              {/* Order Summary */}
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryItemTitle}>
                    {course.code} • {course.title}
                  </Text>
                  <Text style={styles.summaryItemAmount}>GHS {totalAmount.toFixed(2)}</Text>
                </View>
                <Text style={styles.summaryDetails}>
                  Tutor: {tutor.full_name} ({sessionType.toUpperCase()}) • {durationMinutes} mins
                </Text>
                <View style={styles.divider} />
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Tutor Share (Released on PIN):</Text>
                  <Text style={styles.breakdownValue}>GHS {tutorShare.toFixed(2)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Platform Escrow & SMS Fee (15%):</Text>
                  <Text style={styles.breakdownValue}>GHS {platformFee.toFixed(2)}</Text>
                </View>
              </View>

              {/* Escrow Guarantee Notice */}
              <View style={styles.escrowNotice}>
                <Text style={styles.escrowShieldIcon}>🛡️</Text>
                <Text style={styles.escrowNoticeText}>
                  <Text style={styles.bold}>100% Escrow Protection:</Text> Funds are held in platform escrow and will ONLY be released to the tutor after you attend and share your Check-In Code.
                </Text>
              </View>

              {/* Mobile Money Selector */}
              <Text style={styles.sectionLabel}>Select Mobile Money Network</Text>
              <View style={styles.networkRow}>
                {(['MTN', 'Telecel', 'AT'] as MoMoNetwork[]).map((net) => {
                  const selected = network === net;
                  return (
                    <TouchableOpacity
                      key={net}
                      onPress={() => setNetwork(net)}
                      style={[
                        styles.networkCard,
                        selected && styles.networkCardSelected,
                        net === 'MTN' && selected && { borderColor: THEME.colors.momoMtn },
                        net === 'Telecel' && selected && { borderColor: THEME.colors.momoTelecel },
                        net === 'AT' && selected && { borderColor: THEME.colors.momoAt },
                      ]}
                    >
                      <View
                        style={[
                          styles.networkDot,
                          net === 'MTN' && { backgroundColor: THEME.colors.momoMtn },
                          net === 'Telecel' && { backgroundColor: THEME.colors.momoTelecel },
                          net === 'AT' && { backgroundColor: THEME.colors.momoAt },
                        ]}
                      />
                      <Text style={[styles.networkName, selected && styles.networkNameSelected]}>
                        {net} {net === 'MTN' ? 'MoMo' : net === 'Telecel' ? 'Cash' : 'Money'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* MoMo Number Input */}
              <Text style={styles.sectionLabel}>Wallet Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="e.g. 0244123456"
              />

              {/* Pay Button */}
              <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                <Text style={styles.payButtonText}>
                  Pay GHS {totalAmount.toFixed(2)} via Paystack
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 'authorizing' && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={THEME.colors.primary} />
              <Text style={styles.loadingTitle}>Authorizing Mobile Money...</Text>
              <Text style={styles.loadingSubtitle}>
                Prompt sent to {phone} ({network}). Approve the MoMo prompt on your phone.
              </Text>
              <Text style={styles.webhookNote}>Simulating Paystack charge.success webhook...</Text>
            </View>
          )}

          {step === 'success' && (
            <View style={styles.centerContainer}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>
              <Text style={styles.loadingTitle}>Payment Held in Escrow!</Text>
              <Text style={styles.loadingSubtitle}>
                Booking confirmed! Your Check-In Code has been generated and dispatched via SMS.
              </Text>
            </View>
          )}
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
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.textMuted,
  },
  summaryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: THEME.radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  summaryItemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  summaryDetails: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  breakdownLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  breakdownValue: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  escrowNotice: {
    backgroundColor: THEME.colors.primarySoft,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  escrowShieldIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  escrowNoticeText: {
    fontSize: 11,
    color: THEME.colors.primaryDark,
    flex: 1,
    lineHeight: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 6,
  },
  networkRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  networkCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  networkCardSelected: {
    backgroundColor: '#FFFFFF',
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  networkName: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  networkNameSelected: {
    color: THEME.colors.textPrimary,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  payButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  centerContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginTop: 16,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  webhookNote: {
    fontSize: 11,
    color: THEME.colors.primary,
    fontStyle: 'italic',
    marginTop: 12,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
