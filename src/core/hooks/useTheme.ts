import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textLight: string;
  border: string;
  notification: string;
}

interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  setTheme: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  initialize: () => Promise<void>;
}

// Cores padrão
const DEFAULT_PRIMARY_COLOR = '#3498db';
const DEFAULT_SECONDARY_COLOR = '#f1c40f';

// Definição de cores por tema
const getThemeColors = (mode: ThemeMode, primaryColor: string, secondaryColor: string): ThemeColors => {
  return {
    primary: primaryColor,
    secondary: secondaryColor,
    background: mode === 'dark' ? '#121212' : '#FFFFFF',
    card: mode === 'dark' ? '#1E1E1E' : '#F5F5F5',
    text: mode === 'dark' ? '#FFFFFF' : '#000000',
    textLight: '#FFFFFF',
    border: mode === 'dark' ? '#333333' : '#DDDDDD',
    notification: mode === 'dark' ? '#FF453A' : '#FF3B30',
  };
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light' as ThemeMode,
  colors: getThemeColors('light', DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR),
  
  setTheme: async (mode) => {
    const { colors } = get();
    await AsyncStorage.setItem('theme_mode', mode);
    set({ 
      mode, 
      colors: getThemeColors(mode, colors.primary, colors.secondary)
    });
  },
  
  setPrimaryColor: async (color) => {
    const { mode, colors } = get();
    await AsyncStorage.setItem('theme_primary_color', color);
    set({ 
      colors: {
        ...colors,
        primary: color
      }
    });
  },
  
  setSecondaryColor: async (color) => {
    const { mode, colors } = get();
    await AsyncStorage.setItem('theme_secondary_color', color);
    set({ 
      colors: {
        ...colors,
        secondary: color
      }
    });
  },
  
  initialize: async () => {
    try {
      const storedMode = await AsyncStorage.getItem('theme_mode');
      const storedPrimaryColor = await AsyncStorage.getItem('theme_primary_color');
      const storedSecondaryColor = await AsyncStorage.getItem('theme_secondary_color');
      
      const mode = (storedMode as ThemeMode) || 'light';
      const primaryColor = storedPrimaryColor || DEFAULT_PRIMARY_COLOR;
      const secondaryColor = storedSecondaryColor || DEFAULT_SECONDARY_COLOR;
      
      set({
        mode,
        colors: getThemeColors(mode, primaryColor, secondaryColor)
      });
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }
}));

// Hook de conveniência que combina o estado e inicialização
export const useTheme = () => {
  const theme = useThemeStore();
  
  useEffect(() => {
    theme.initialize();
  }, []);
  
  return theme;
}; 