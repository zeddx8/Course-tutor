import {
  Booking,
  Transaction,
  TutorWallet,
  Payout,
  MoMoNetwork,
  Course,
  DeliveryMode,
  SessionType,
} from '../types';

export class EscrowService {
  /**
   * Generates a secure, readable 6-character check-in code for the student
   */
  static generateCheckInCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Generates a unique Paystack payment reference
   */
  static generatePaystackReference(): string {
    return `CT_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  }

  /**
   * Calculates platform fee (15%) and tutor share (85%)
   */
  static calculateSplits(totalAmount: number): { platformFee: number; tutorShare: number } {
    const platformFee = Math.round(totalAmount * 0.15 * 100) / 100;
    const tutorShare = Math.round((totalAmount - platformFee) * 100) / 100;
    return { platformFee, tutorShare };
  }

  /**
   * Anti-Bypass Filter:
   * Detects Ghanaian phone numbers (+233, 024, 054, etc.) or email addresses in in-app chat.
   * Encourages students & tutors to keep bookings on-platform to retain escrow protection.
   */
  static filterAntiBypass(message: string): { sanitizedText: string; isFlagged: boolean } {
    const ghanaPhoneRegex = /(?:\+?233|0)[25][0-9]{8}/gi;
    const genericPhoneRegex = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

    let flagged = false;
    let sanitized = message;

    if (ghanaPhoneRegex.test(message) || genericPhoneRegex.test(message) || emailRegex.test(message)) {
      flagged = true;
      sanitized = sanitized
        .replace(ghanaPhoneRegex, '[CONTACT INFO BLOCKED FOR ESCROW PROTECTION]')
        .replace(genericPhoneRegex, '[PHONE BLOCKED]')
        .replace(emailRegex, '[EMAIL BLOCKED]');
    }

    return { sanitizedText: sanitized, isFlagged: flagged };
  }
}
