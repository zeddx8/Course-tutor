# Course Tutor — Web App & Cross-Platform Mobile Marketplace

> **Peer Tutoring Marketplace for Ghanaian Universities**  
> Initial Beachhead Launch: **Cape Coast Technical University (CCTU), Ghana** (`cctu.edu.gh`)  
> Full compliance with the Master Software Project Documentation & Ghana Data Protection Act, 2012 (Act 843).

---

## 🌐 Live Web Application & Mobile Support

The platform includes both a **modern, responsive Web Application** built following the **Senior Pro Dev + UI** design system standards and a **cross-platform React Native / Expo mobile app** supporting Android and iOS.

### 🚀 Running the Web Application
```bash
# 1. Build the web bundle (Babel + Tailwind CSS + Lucide Icons)
npm run build:web

# 2. Start the local server
npm run serve:web
```
The web application is live at **`http://localhost:5000`**.

### 📱 Running the Mobile App (Android & iOS)
```bash
# 1. Start Expo development server
npm start

# 2. Run on Android or iOS
npm run android   # Android device / emulator
npm run ios       # iOS simulator
```

---

## 🎨 UI/UX Design System Specifications (`pro-dev-ui`)

- **Color Palette & Semantic Tokens**:
  - Primary: `#0F5C3E` (CCTU Forest Green), Hover: `#0B462F`, Light Surface: `#ECF6F1`
  - Accent / Gold: `#C29B38` (CCTU Academic Seal Gold)
  - Navy: `#0B2545` (Admin / Trust Anchor)
  - Slate Neutrals: `#0F172A` to `#F8FAFC`
  - Semantic Status: Emerald (`#10B981` success), Amber (`#F59E0B` pending/dispute), Red (`#EF4444` danger)
- **Typography**:
  - Primary Font: `Plus Jakarta Sans` for clean, high-legibility UI headings and body copy
  - Monospace Font: `JetBrains Mono` for course codes, check-in PINs, and currency amounts
- **Accessibility & Touch Standards**:
  - Minimum touch targets: 44px by 44px
  - High WCAG AA color contrast ratios across all text
  - Fully responsive layout: mobile-first navigation with sliding drawer and desktop sticky sidebar

---

## 🏛️ CCTU Academic Structure (6 Schools, 18 Departments)

Pre-seeded and fully searchable by School, Department, and Course Code:
1. **School of Engineering (SOE)**
   - Civil Engineering (`CIV 301`)
   - Electrical/Electronic Engineering (`EEE 205`)
   - Mechanical Engineering (`MEC 302`)
   - Renewable Energy Technology (`RET 101`)
2. **School of Business & Management Studies (SBMS)**
   - Accounting and Finance (`ACC 201`)
   - Management and Administration (`MGT 101`)
   - Marketing Studies (`MKT 202`)
   - Procurement and Supply Chain Management (`PSM 301`)
   - Entrepreneurship and Agribusiness (`ENT 102`)
3. **School of Applied Sciences & Technology (SAST)**
   - Computer Science & Technology (`CST 204`, `CST 101`)
   - Statistics & Mathematics (`MAT 101`)
   - Hospitality Management (`HOS 201`)
   - Food Science and Postharvest Technology (`FST 301`)
4. **School of Applied Arts (SAA)**
   - Tourism Management (`TRM 101`)
   - Fashion Design and Textile Studies (`FDT 201`)
   - Liberal Studies (`LBS 101`)
5. **School of Built & Natural Environment (SBNE)**
   - Construction Technology and Management (`BCM 201`)
   - Environmental Management and Technology (`EMT 101`)
6. **School of Graduate Studies (SGS)**
   - M.Tech Civil Engineering (`MTC 601`)
   - M.Tech Construction Technology and Management (`MTB 601`)

---

## ⚡ Core Marketplace Features

1. **Role Switcher**: Seamlessly switch between **Student**, **Tutor**, and **Admin** workspaces.
2. **Paystack Mobile Money Escrow**:
   - Integrates MTN MoMo, Telecel Cash, AT Money, and Cards.
   - 100% upfront payment held safely in escrow.
3. **Check-In PIN Escrow Settlement**:
   - 6-character check-in code generated for each booking.
   - Upon verification by the tutor, escrow releases **88%** to the tutor's MoMo wallet and **12%** to the CCTU platform.
4. **Tutor Vetting & Accreditation**:
   - Admin verification queue reviewing Student ID and academic transcripts (requiring Grade A or B+).
5. **Dispute Resolution & Audit**:
   - 48-hour dispute window allowing students to file disputes and admins to adjudicate (100% student refund vs release to tutor).
6. **Course Catalog Management**:
   - Authorized admins can add new courses dynamically to any CCTU school and department.

---

## 📦 Repository & Project Structure

```
Course tutor App/
├── dist/                      # Static web distribution bundle
│   ├── index.html             # Web entry with Plus Jakarta Sans & Tailwind tokens
│   └── app.bundle.js          # Compiled Course Tutor web application
├── src/
│   ├── CourseTutorApp.tsx     # Full CCTU Peer Tutoring Marketplace Web Application
│   ├── lucide-react.tsx       # Custom SVG icon set (28 Lucide icons)
│   ├── main.tsx               # React 18 DOM mount point
│   ├── index.css              # Tailwind and typography directives
│   ├── context/               # React Native mobile context
│   ├── screens/               # React Native mobile screens
│   ├── navigation/            # React Native navigation
│   └── theme/                 # Mobile design system constants
├── scripts/
│   ├── build-web.js           # Babel compilation and bundling script
│   └── server.js              # Lightweight local HTTP server (port 5000)
├── App.tsx                    # Cross-platform mobile root component
├── app.json                   # Expo application manifest
├── tailwind.config.js         # Tailwind configuration
└── package.json               # Dependencies and scripts
```
