import { TextStyle, ViewStyle } from 'react-native';

export const COLORS = {
  // Cores principais
  primary: '#4F46E5', // Indigo
  primaryDark: '#4338CA', // Indigo escuro
  primaryLight: '#2C4EA0',
  
  // Gradientes
  gradientPrimary: ['#1E3D8F', '#2C4EA0'],
  gradientCard: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)'],
  
  // UI
  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    light: '#FFFFFF',
  },
  border: '#E5E7EB',
  
  // Status
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const TYPOGRAPHY = {
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    } as TextStyle,
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    } as TextStyle,
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    } as TextStyle,
  },
  body: {
    large: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    } as TextStyle,
    medium: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    } as TextStyle,
    small: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    } as TextStyle,
  },
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  } as ViewStyle,
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  } as ViewStyle,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  lg: 8,
  xl: 12,
  round: 9999,
} as const; 