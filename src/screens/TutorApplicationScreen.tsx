import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { THEME } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { MoMoNetwork, TutorCourseGrade } from '../types';
import { CCTU_COURSES, CCTU_DEPARTMENTS } from '../constants/cctuData';

interface TutorApplicationScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const TutorApplicationScreen: React.FC<TutorApplicationScreenProps> = ({
  onBack,
  onSuccess,
}) => {
  const { applyAsTutor, currentUser } = useApp();

  const [fullName, setFullName] = useState(currentUser.full_name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [level, setLevel] = useState('400');
  const [deptName, setDeptName] = useState(CCTU_DEPARTMENTS[0].name);
  const [bio, setBio] = useState('');
  const [soloRate, setSoloRate] = useState('45');
  const [groupRate, setGroupRate] = useState('20');
  const [momoNumber, setMomoNumber] = useState('0244123456');
  const [momoNetwork, setMomoNetwork] = useState<MoMoNetwork>('MTN');
  const [idUploaded, setIdUploaded] = useState(true);
  const [transcriptUploaded, setTranscriptUploaded] = useState(true);

  // Selected courses
  const [selectedCourses, setSelectedCourses] = useState<TutorCourseGrade[]>([
    {
      course_id: CCTU_COURSES[0].id,
      course_code: CCTU_COURSES[0].code,
      course_title: CCTU_COURSES[0].title,
      grade_achieved: 'A',
    },
  ]);

  const handleSubmit = () => {
    if (!bio.trim()) {
      Alert.alert('Required', 'Please write a brief tutor introduction bio.');
      return;
    }

    if (!idUploaded || !transcriptUploaded) {
      Alert.alert('Verification Required', 'Please upload your Student/Staff ID and Transcript.');
      return;
    }

    applyAsTutor({
      full_name: fullName,
      email,
      phone,
      bio,
      level: parseInt(level, 10) || 400,
      department_name: deptName,
      hourly_rate_solo: parseFloat(soloRate) || 40,
      hourly_rate_group: parseFloat(groupRate) || 20,
      id_card_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
      transcript_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
      momo_number: momoNumber,
      momo_network: momoNetwork,
      courses: selectedCourses,
      available_days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    });

    Alert.alert(
      'Application Submitted! 📋',
      'Your tutor credentials and transcript have been submitted to CCTU Campus Operations for vetting. You will be notified via SMS upon approval.',
      [{ text: 'OK', onPress: onSuccess }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Tutor Application & Vetting Portal</Text>
      <Text style={styles.subtitle}>
        Join the network of verified peer tutors, TAs, and National Service Personnel (NSP) at Cape Coast Technical University.
      </Text>

      {/* Personal Info */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>1. Personal & Academic Profile</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Academic Level (300, 400, M.Tech, NSP)</Text>
        <TextInput style={styles.input} value={level} onChangeText={setLevel} keyboardType="numeric" />

        <Text style={styles.label}>Department</Text>
        <TextInput style={styles.input} value={deptName} onChangeText={setDeptName} />

        <Text style={styles.label}>Tutor Bio & Experience</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={setBio}
          placeholder="Describe your tutoring experience, approach to past questions, and focus areas..."
        />
      </View>

      {/* Proof of Competence Vetting */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>2. Mandatory Proof of Competence (Act 843 Protected)</Text>
        <Text style={styles.helpText}>
          Per Section 1.2 of the specification, tutors must upload a valid Student/Staff ID and semester transcript demonstrating an A or B+ in nominated courses.
        </Text>

        <View style={styles.docUploadRow}>
          <View style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>🪪</Text>
            <Text style={styles.uploadTitle}>Student / Staff ID</Text>
            <Text style={styles.uploadStatus}>✓ Attached (cctu_id.jpg)</Text>
          </View>

          <View style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>📄</Text>
            <Text style={styles.uploadTitle}>Official Transcript</Text>
            <Text style={styles.uploadStatus}>✓ Attached (grades.pdf)</Text>
          </View>
        </View>
      </View>

      {/* Rates & MoMo Wallet */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>3. Rates & Mobile Money Payout Wallet</Text>

        <View style={styles.rateRow}>
          <View style={styles.rateCol}>
            <Text style={styles.label}>Solo Rate (GHS/hr)</Text>
            <TextInput style={styles.input} value={soloRate} onChangeText={setSoloRate} keyboardType="numeric" />
          </View>
          <View style={styles.rateCol}>
            <Text style={styles.label}>Group Rate (GHS/head)</Text>
            <TextInput style={styles.input} value={groupRate} onChangeText={setGroupRate} keyboardType="numeric" />
          </View>
        </View>

        <Text style={styles.label}>Payout MoMo Network</Text>
        <View style={styles.networkToggleRow}>
          {(['MTN', 'Telecel', 'AT'] as MoMoNetwork[]).map((net) => (
            <TouchableOpacity
              key={net}
              style={[styles.networkBtn, momoNetwork === net && styles.networkBtnActive]}
              onPress={() => setMomoNetwork(net)}
            >
              <Text style={[styles.networkBtnText, momoNetwork === net && styles.networkBtnTextActive]}>
                {net}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>MoMo Wallet Number</Text>
        <TextInput style={styles.input} value={momoNumber} onChangeText={setMomoNumber} keyboardType="phone-pad" />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Application for Campus Review</Text>
      </TouchableOpacity>
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
    paddingBottom: 50,
  },
  backBtn: {
    marginBottom: 10,
  },
  backBtnText: {
    fontSize: 14,
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
    marginBottom: 10,
  },
  helpText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#F8FAFC',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  docUploadRow: {
    flexDirection: 'row',
    gap: 10,
  },
  uploadBox: {
    flex: 1,
    backgroundColor: THEME.colors.primarySoft,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.colors.primaryDark,
  },
  uploadStatus: {
    fontSize: 10,
    color: THEME.colors.primary,
    marginTop: 2,
    fontWeight: '600',
  },
  rateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  rateCol: {
    flex: 1,
  },
  networkToggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 6,
  },
  networkBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  networkBtnActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  networkBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  networkBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    ...THEME.shadows.sm,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
