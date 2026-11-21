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
import { MoMoNetwork, TutorWallet } from '../types';

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
  wallet: TutorWallet;
  defaultMomoNumber: string;
  defaultNetwork: MoMoNetwork;
  onConfirmPayout: (amount: number, momoNumber: string, network: MoMoNetwork) => { success: boolean; message: string };
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  visible,
  onClose,
  wallet,
  defaultMomoNumber,
  defaultNetwork,
  onConfirmPayout,
}) => {
  const [amount, setAmount] = useState('');
  const [momoNumber, setMomoNumber] = useState(defaultMomoNumber);
  const [network, setNetwork] = useState<MoMoNetwork>(defaultNetwork);
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (num > wallet.available_balance) {
      setError(`Cannot withdraw more than available GHS ${wallet.available_balance.toFixed(2)}.`);
      return;
    }

    const res = onConfirmPayout(num, momoNumber, network);
    if (res.success) {
      Alert.alert('Payout Sent! 🚀', res.message, [
        {
          text: 'Done',
          onPress: () => {
            setAmount('');
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
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Withdraw to Mobile Money</Text>
              <Text style={styles.subtitle}>Paystack MoMo Transfer API</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available for Immediate Payout</Text>
            <Text style={styles.balanceAmount}>GHS {wallet.available_balance.toFixed(2)}</Text>
            <Text style={styles.balanceHelp}>
              (Note: GHS {wallet.pending_balance.toFixed(2)} is held in active session escrow)
            </Text>
          </View>

          <Text style={styles.sectionLabel}>Select Payout Network</Text>
          <View style={styles.networkRow}>
            {(['MTN', 'Telecel', 'AT'] as MoMoNetwork[]).map((net) => {
              const selected = network === net;
              return (
                <TouchableOpacity
                  key={net}
                  onPress={() => setNetwork(net)}
                  style={[styles.networkOption, selected && styles.networkOptionSelected]}
                >
                  <Text style={[styles.networkText, selected && styles.networkTextSelected]}>
                    {net}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Mobile Money Number</Text>
          <TextInput
            style={styles.input}
            value={momoNumber}
            onChangeText={setMomoNumber}
            keyboardType="phone-pad"
            placeholder="0244123456"
          />

          <Text style={styles.sectionLabel}>Withdrawal Amount (GHS)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(txt) => {
              setAmount(txt);
              setError('');
            }}
            keyboardType="numeric"
            placeholder={`Min GHS 10.00 - Max GHS ${wallet.available_balance.toFixed(2)}`}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
            <Text style={styles.withdrawBtnText}>Confirm Withdrawal</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  closeBtn: {
    fontSize: 20,
    color: THEME.colors.textMuted,
  },
  balanceCard: {
    backgroundColor: THEME.colors.primarySoft,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  balanceLabel: {
    fontSize: 11,
    color: THEME.colors.primaryDark,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginTop: 2,
  },
  balanceHelp: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 4,
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
    marginBottom: 14,
  },
  networkOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  networkOptionSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  networkText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  networkTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
    marginBottom: 14,
  },
  errorText: {
    color: THEME.colors.danger,
    fontSize: 12,
    marginBottom: 12,
  },
  withdrawBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  withdrawBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
