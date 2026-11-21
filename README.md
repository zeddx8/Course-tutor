# Course Tutor — Cross-Platform Mobile App (Android & iOS)

> **Commercial Peer-Tutoring Marketplace for Ghanaian Universities**  
> Initial Beachhead Launch: **Cape Coast Technical University (CCTU), Ghana** (`cctu.edu.gh`)  
> Full compliance with the Master Software Project Documentation (MVP Blueprint v1.0) & Ghana Data Protection Act, 2012 (Act 843).

---

## 📱 Platform Overview

**Course Tutor** is an independent, mobile-first marketplace that connects Ghanaian tertiary students who need academic or practical technical support with vetted peer tutors, Teaching Assistants (TAs), and National Service Personnel (NSP). 

The platform supports **both Android and iOS** out of the box, as well as Progressive Web Application (PWA) and Expo Go modes.

### Key Pillars
1. **Academic Hierarchy Partitioning**: Pre-seeded CCTU academic catalog across 5 Schools, Graduate School, and 18 Academic Departments with multi-campus `university_id` isolation.
2. **Mandatory Tutor Proof of Competence**: Enforces uploaded Student/Staff ID verification and academic transcripts demonstrating an **A** or **B+** in nominated courses.
3. **End-to-End Escrow Protection**: Funds paid via Mobile Money (**MTN MoMo, Telecel Cash, AT Money**) are held in platform escrow until session attendance is confirmed.
4. **Attendance Check-In PIN**: Every confirmed booking generates a unique 6-character Check-In PIN visible only to the student. The tutor verifies the PIN to authorize atomic escrow release to their wallet.
5. **Anti-Bypass Shield**: In-app messaging engine detects and masks phone numbers and off-platform payment attempts to safeguard escrow protection.

---

## 🏗️ System Architecture & Screen Map

```
┌────────────────────────────────────────────────────────────────────────┐
│                        COURSE TUTOR MOBILE APP                         │
│                         (React Native / Expo)                          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
  STUDENT FLOW                TUTOR FLOW                ADMIN OPS
  ├─ Search by Course Code    ├─ Verified Application   ├─ Tutor Vetting Queue
  │  (CST 204, ACC 101, etc)  │  (ID & Transcript A/B+) │  (ID & Transcript)
  ├─ Theory vs Practical      ├─ Live Schedule          ├─ Paystack Recipient
  ├─ Solo vs Group Rates      ├─ Check-In PIN Entry     │  Auto-Registration
  ├─ Paystack MoMo Checkout   │  (Releases Escrow)      ├─ Dispute Resolution
  ├─ 6-Digit Check-In Code    ├─ MoMo Payout Wallet     │  (100%, 50%, Release)
  └─ Verified Reviews & Chat  └─ Anti-Bypass Messaging └─ CCTU Course Catalog
```

---

## 🗄️ PostgreSQL Database Schema (PRD 03 Aligned)

The database design partitions into four operational domains across 11 normalized tables:

1. **Domain A (Academic Hierarchy)**:
   - `universities`: Multi-campus master (`CCTU`, `UCC`, `KNUST`, `UG`).
   - `schools`: 5 faculties + School of Graduate Studies.
   - `departments`: 18 departments (Civil, Electrical, Mechanical, Computer Science, Statistics, Accounting, Marketing, etc.).
   - `courses`: Course codes, titles, levels (100–500), and categories (`theory` vs `practical_software`).

2. **Domain B (Users & Tutor Vetting)**:
   - `users`: Student/Staff index numbers, phone (+233 format), study sessions (`regular`, `evening`, `weekend`), programme tiers (`B.Tech`, `M.Tech`, `HND`).
   - `tutor_profiles`: Solo & group hourly rates (GHS), MoMo number & network, Paystack recipient code, rating.
   - `tutor_courses`: Grade achieved (`A`, `B+`) verified against official transcripts.

3. **Domain C (Bookings & Quality)**:
   - `bookings`: Hybrid delivery (`on_campus` vs `online`), 6-character `checkin_code`, status lifecycle (`pending_payment` -> `confirmed` -> `in_progress` -> `completed` / `disputed`).
   - `reviews`: Verified 1–5 star reviews restricted to completed bookings.

4. **Domain D (Escrow & Ledger)**:
   - `transactions`: Paystack webhook references, gross amounts, platform fee (15%), tutor share (85%), escrow status (`held`, `released`, `refunded`).
   - `tutor_wallets`: Atomic isolation between `available_balance` and `pending_balance`.
   - `payouts`: Paystack MoMo Transfer API disbursement ledger.

---

## 💳 Payment & Escrow Workflow (Paystack + MoMo)

```
1. STUDENT CHECKOUT ──────> 2. PAYSTACK WEBHOOK ──────> 3. SESSION DELIVERY
   Student books slot          charge.success verified     Student meets tutor
   Pays via MTN / Telecel /    Funds logged as 'held'      Shows 6-character
   AT Mobile Money.            Pending balance +GHS        Check-In Code.
                                                           │
                                                           ▼
5. MOMO WITHDRAWAL  <────── 4. ESCROW RELEASE   <────── TUTOR VERIFIES
   Tutor requests payout       Atomic DB transaction       Tutor enters PIN;
   via Paystack Transfer API   moves tutor share from      Booking status
   to MoMo wallet.             Pending -> Available.       marked 'completed'.
```

### Cancellation & Refund Matrix
- **Student Cancels 12+ Hours Before**: 100% automated refund to student MoMo wallet.
- **Student Cancels < 12 Hours Before**: 50% refund to student, 50% released to tutor for reserved slot.
- **Tutor No-Show**: 100% refund to student + reliability strike against tutor account.
- **Disputed Session**: Escrow frozen (`disputed`) pending Campus Operations review.

---

## 🚀 Running on Android & iOS

### Prerequisites
- Node.js 18+ (tested with Node.js 24)
- npm or yarn
- Expo Go app on iOS (App Store) or Android (Play Store), or Android Studio / Xcode simulators.

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Start Expo development server
npm start
```

### Run on iOS:
- Press `i` in the terminal to launch the iOS Simulator (macOS), or
- Scan the displayed QR code with your iPhone camera using the **Expo Go** app.

### Run on Android:
- Press `a` in the terminal to launch the Android Emulator, or
- Scan the displayed QR code using the **Expo Go** app on your Android device.

### Run in Browser (Web / PWA):
- Press `w` in the terminal to preview in your web browser.

---

## 📦 Building Native Binaries (APK, AAB, IPA)

Using EAS (Expo Application Services) Build:
```bash
# Build Android APK for testing
npx eas-cli build -p android --profile preview

# Build Android App Bundle (AAB) for Google Play Store
npx eas-cli build -p android --profile production

# Build iOS IPA for Apple TestFlight / App Store
npx eas-cli build -p ios --profile production
```

---

## 🔒 Ghana Data Protection Act 2012 (Act 843) Compliance
- Student IDs and academic transcripts are stored in encrypted, private cloud storage accessed exclusively via time-limited signed URLs.
- Sensitive payment credentials (MoMo PINs, card numbers) are never stored locally; payments utilize tokenized Paystack checkout.
- Off-platform contact masking safeguards student privacy and financial security.

---

## 📜 License & Ownership
Independent Commercial Tutoring Marketplace — Built for Cape Coast Technical University (CCTU) Beachhead Launch.
