export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  overlay: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#4F46E5',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#6366F1',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    error: '#DC2626',
    success: '#059669',
    warning: '#D97706',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export const eventColors = [
  '#4F46E5', // Indigo
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#6366F1', // Indigo
  '#84CC16', // Lime
];

export const eventIcons = [
  'calendar',
  'gift',
  'airplane',
  'school',
  'heart',
  'star',
  'trophy',
  'musical-notes',
  'game-controller',
  'pizza',
  'football',
  'book',
  'home',
  'briefcase',
  'camera',
]; 