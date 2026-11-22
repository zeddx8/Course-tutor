import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import { Header } from './src/components/Header';
import { THEME } from './src/constants/theme';
import { StudentHomeScreen } from './src/screens/StudentHomeScreen';
import { TutorDetailScreen } from './src/screens/TutorDetailScreen';
import { StudentSessionsScreen } from './src/screens/StudentSessionsScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { TutorDashboardScreen } from './src/screens/TutorDashboardScreen';
import { TutorApplicationScreen } from './src/screens/TutorApplicationScreen';
import { AdminDashboardScreen } from './src/screens/AdminDashboardScreen';
import { StudentProfileScreen } from './src/screens/StudentProfileScreen';
import { PaystackCheckoutModal } from './src/components/PaystackCheckoutModal';
import { TutorProfile, Course, SessionType, DeliveryMode, Booking } from './src/types';

const MainNavigator = () => {
  const { currentRole, createBooking, bookings } = useApp();

  // Student bottom tab state
  const [studentTab, setStudentTab] = useState<'discover' | 'sessions' | 'profile'>('discover');

  // Screen stack state
  const [selectedTutor, setSelectedTutor] = useState<TutorProfile | null>(null);
  const [activeChatBooking, setActiveChatBooking] = useState<Booking | undefined>(undefined);
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [showTutorApply, setShowTutorApply] = useState(false);

  // Paystack checkout modal state
  const [checkoutParams, setCheckoutParams] = useState<{
    visible: boolean;
    tutor: TutorProfile | null;
    course: Course | null;
    sessionType: SessionType;
    deliveryMode: DeliveryMode;
    locationOrLink: string;
    date: string;
    time: string;
    durationMinutes: number;
  }>({
    visible: false,
    tutor: null,
    course: null,
    sessionType: 'solo',
    deliveryMode: 'on_campus',
    locationOrLink: '',
    date: '',
    time: '',
    durationMinutes: 60,
  });

  const handleInitiateBooking = (params: {
    tutor: TutorProfile;
    course: Course;
    sessionType: SessionType;
    deliveryMode: DeliveryMode;
    locationOrLink: string;
    date: string;
    time: string;
    durationMinutes: number;
  }) => {
    setCheckoutParams({
      visible: true,
      ...params,
    });
  };

  const handleCheckoutSuccess = async (momoNetwork: any, momoNumber: string) => {
    if (!checkoutParams.tutor || !checkoutParams.course) return;

    await createBooking({
      tutorId: checkoutParams.tutor.user_id,
      courseId: checkoutParams.course.id,
      sessionType: checkoutParams.sessionType,
      deliveryMode: checkoutParams.deliveryMode,
      locationOrLink: checkoutParams.locationOrLink,
      date: checkoutParams.date,
      time: checkoutParams.time,
      durationMinutes: checkoutParams.durationMinutes,
      momoNetwork,
      momoNumber,
    });

    setCheckoutParams((prev) => ({ ...prev, visible: false }));
    setSelectedTutor(null);
    setStudentTab('sessions');
  };

  // Render view depending on screen state
  const renderContent = () => {
    if (showChatScreen) {
      return (
        <ChatScreen
          booking={activeChatBooking}
          onBack={() => {
            setShowChatScreen(false);
            setActiveChatBooking(undefined);
          }}
        />
      );
    }

    if (showTutorApply) {
      return (
        <TutorApplicationScreen
          onBack={() => setShowTutorApply(false)}
          onSuccess={() => setShowTutorApply(false)}
        />
      );
    }

    if (currentRole === 'admin') {
      return <AdminDashboardScreen />;
    }

    if (currentRole === 'tutor') {
      return (
        <TutorDashboardScreen
          onOpenChat={(bk) => {
            setActiveChatBooking(bk);
            setShowChatScreen(true);
          }}
          onApplyTutor={() => setShowTutorApply(true)}
        />
      );
    }

    // Role === 'student'
    if (selectedTutor) {
      return (
        <TutorDetailScreen
          tutor={selectedTutor}
          onBack={() => setSelectedTutor(null)}
          onInitiateBooking={handleInitiateBooking}
          onOpenDirectChat={() => {
            setActiveChatBooking(undefined);
            setShowChatScreen(true);
          }}
        />
      );
    }

    if (studentTab === 'sessions') {
      return (
        <StudentSessionsScreen
          onOpenChat={(bk) => {
            setActiveChatBooking(bk);
            setShowChatScreen(true);
          }}
        />
      );
    }

    if (studentTab === 'profile') {
      return (
        <StudentProfileScreen
          onApplyTutor={() => setShowTutorApply(true)}
        />
      );
    }

    // Default student tab: 'discover'
    return (
      <StudentHomeScreen
        onSelectTutor={(tutor) => setSelectedTutor(tutor)}
        onBookTutor={(tutor) => setSelectedTutor(tutor)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.colors.primary} />
      <View style={styles.webFrame}>
        <Header />
        <View style={styles.contentArea}>{renderContent()}</View>

        {/* Student Bottom Navigation Bar */}
        {currentRole === 'student' && !selectedTutor && !showChatScreen && !showTutorApply && (
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={[styles.navItem, studentTab === 'discover' && styles.navItemActive]}
              onPress={() => setStudentTab('discover')}
            >
              <Text style={styles.navIcon}>🔍</Text>
              <Text style={[styles.navLabel, studentTab === 'discover' && styles.navLabelActive]}>
                Discover
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, studentTab === 'sessions' && styles.navItemActive]}
              onPress={() => setStudentTab('sessions')}
            >
              <View>
                <Text style={styles.navIcon}>📅</Text>
                {bookings.length > 0 && (
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{bookings.length}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.navLabel, studentTab === 'sessions' && styles.navLabelActive]}>
                Sessions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, studentTab === 'profile' && styles.navItemActive]}
              onPress={() => setStudentTab('profile')}
            >
              <Text style={styles.navIcon}>👤</Text>
              <Text style={[styles.navLabel, studentTab === 'profile' && styles.navLabelActive]}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Paystack Checkout Modal */}
        {checkoutParams.tutor && checkoutParams.course && (
          <PaystackCheckoutModal
            visible={checkoutParams.visible}
            onClose={() => setCheckoutParams((prev) => ({ ...prev, visible: false }))}
            tutor={checkoutParams.tutor}
            course={checkoutParams.course}
            sessionType={checkoutParams.sessionType}
            deliveryMode={checkoutParams.deliveryMode}
            locationOrLink={checkoutParams.locationOrLink}
            date={checkoutParams.date}
            time={checkoutParams.time}
            durationMinutes={checkoutParams.durationMinutes}
            onSuccess={handleCheckoutSuccess}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#034d38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 640,
    backgroundColor: THEME.colors.background,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        height: '100vh',
      },
      default: {},
    }),
  },
  contentArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    ...THEME.shadows.md,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navItemActive: {},
  navIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  navLabelActive: {
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: -8,
    backgroundColor: THEME.colors.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
