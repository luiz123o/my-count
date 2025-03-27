import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import { Theme, ThemeMode, darkTheme, lightTheme } from '../../shared/types/theme';

const THEME_STORAGE_KEY = '@theme_mode';

export class ThemeStore {
  theme: Theme = lightTheme;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  private async loadTheme() {
    try {
      this.isLoading = true;
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        this.setTheme(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async saveTheme(mode: ThemeMode) {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  setTheme(mode: ThemeMode) {
    this.theme = mode === 'dark' ? darkTheme : lightTheme;
    this.saveTheme(mode);
  }

  toggleTheme() {
    this.setTheme(this.theme.mode === 'dark' ? 'light' : 'dark');
  }
} 