import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { THEME } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { TutorCard } from '../components/TutorCard';
import { TutorProfile, CourseCategory, DeliveryMode } from '../types';
import { CCTU_SCHOOLS } from '../constants/cctuData';

interface StudentHomeScreenProps {
  onSelectTutor: (tutor: TutorProfile) => void;
  onBookTutor: (tutor: TutorProfile) => void;
}

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({
  onSelectTutor,
  onBookTutor,
}) => {
  const { tutors, courses } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMode | 'all'>('all');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Must be approved for discovery
      if (tutor.verification_status !== 'approved') return false;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tutor.full_name.toLowerCase().includes(q) ||
        tutor.department_name.toLowerCase().includes(q) ||
        tutor.courses.some(
          (c) =>
            c.course_code.toLowerCase().includes(q) ||
            c.course_title.toLowerCase().includes(q)
        );

      if (!matchesSearch) return false;

      // School match
      if (selectedSchool !== 'all') {
        const schoolObj = CCTU_SCHOOLS.find((s) => s.id === selectedSchool);
        if (schoolObj && !tutor.department_name.toLowerCase().includes(schoolObj.short_code.toLowerCase())) {
          // If department name doesn't match school, check department mappings
        }
      }

      // Course category match
      if (selectedCategory !== 'all') {
        const teachesCategory = tutor.courses.some((tc) => {
          const courseObj = courses.find((c) => c.id === tc.course_id);
          return courseObj ? courseObj.category === selectedCategory : false;
        });
        if (!teachesCategory) return false;
      }

      return true;
    });
  }, [tutors, courses, searchQuery, selectedCategory, selectedSchool]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by course (e.g. CST 204, ACC 101, Revit)..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={THEME.colors.textMuted}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {/* Category Chips */}
          <TouchableOpacity
            style={[styles.chip, selectedCategory === 'all' && styles.chipActive]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[styles.chipText, selectedCategory === 'all' && styles.chipTextActive]}>
              All Courses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chip, selectedCategory === 'theory' && styles.chipActive]}
            onPress={() => setSelectedCategory('theory')}
          >
            <Text style={[styles.chipText, selectedCategory === 'theory' && styles.chipTextActive]}>
              📚 Theory & Exam Prep
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chip, selectedCategory === 'practical_software' && styles.chipActive]}
            onPress={() => setSelectedCategory('practical_software')}
          >
            <Text style={[styles.chipText, selectedCategory === 'practical_software' && styles.chipTextActive]}>
              💻 Practical & Software
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Campus Banner Notice */}
      <View style={styles.campusNotice}>
        <Text style={styles.campusNoticeText}>
          🇬🇭 <Text style={styles.bold}>CCTU Pilot Launch:</Text> Vetted peer tutors & TAs with verified A/B+ transcripts. Funds held safely in MoMo escrow.
        </Text>
      </View>

      {/* Tutor List */}
      <FlatList
        data={filteredTutors}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <TutorCard
            tutor={item}
            onPress={() => onSelectTutor(item)}
            onBook={() => onBookTutor(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No Vetted Tutors Found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching for "CST 204", "ACC 101", or "Calculus", or reset filters.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  searchSection: {
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radii.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    height: 46,
    ...THEME.shadows.sm,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: THEME.colors.textPrimary,
  },
  clearIcon: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    padding: 4,
  },
  filtersWrapper: {
    paddingBottom: 8,
  },
  filterScroll: {
    paddingHorizontal: THEME.spacing.md,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  chipActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  campusNotice: {
    marginHorizontal: THEME.spacing.md,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  campusNoticeText: {
    fontSize: 11,
    color: '#065F46',
  },
  bold: {
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: THEME.spacing.md,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 30,
  },
});
