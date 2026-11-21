import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { THEME } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

interface ChatScreenProps {
  booking?: Booking;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ booking, onBack }) => {
  const { messages, sendMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');

  const relevantMessages = messages.filter((m) => {
    if (booking) {
      return m.booking_id === booking.id;
    }
    return true;
  });

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(booking?.id, booking ? (currentUser.role === 'student' ? booking.tutor_id : booking.student_id) : 'all', inputText);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {booking ? `${booking.course.code} Tutoring Chat` : 'In-App Messaging'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {booking ? `With ${currentUser.role === 'student' ? booking.tutor_name : booking.student_name}` : 'Topic Confirmation'}
          </Text>
        </View>
      </View>

      {/* Anti-Bypass Escrow Shield Banner */}
      <View style={styles.shieldBanner}>
        <Text style={styles.shieldIcon}>🛡️</Text>
        <Text style={styles.shieldText}>
          <Text style={styles.bold}>Anti-Bypass Shield Active:</Text> For your safety, phone numbers and payment requests outside Course Tutor are automatically masked. Off-platform transactions lose 100% money-back escrow protection.
        </Text>
      </View>

      {/* Messages Feed */}
      <ScrollView
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
      >
        {relevantMessages.map((msg) => {
          const isMe = msg.sender_id === currentUser.id;
          return (
            <View
              key={msg.id}
              style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}
            >
              <Text style={[styles.senderName, isMe ? styles.mySenderName : styles.theirSenderName]}>
                {msg.sender_name} ({msg.sender_role})
              </Text>
              <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>
                {msg.text}
              </Text>
              {msg.is_flagged && (
                <Text style={styles.flaggedWarning}>
                  ⚠️ Notice: Off-platform contact info blocked.
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type message (e.g., discuss syllabus topic)..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 14,
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  shieldBanner: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 8,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  shieldText: {
    fontSize: 11,
    color: '#92400E',
    flex: 1,
    lineHeight: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 10,
  },
  messageBubble: {
    maxWidth: '82%',
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: THEME.colors.primary,
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  senderName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mySenderName: {
    color: '#D1FAE5',
  },
  theirSenderName: {
    color: THEME.colors.textMuted,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: THEME.colors.textPrimary,
  },
  flaggedWarning: {
    fontSize: 10,
    color: '#FEE2E2',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  sendButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
