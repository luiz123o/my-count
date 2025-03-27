import { themeStore } from '../stores';

export const useTheme = () => {
  return {
    theme: themeStore.theme,
    toggleTheme: () => themeStore.toggleTheme(),
    setTheme: (mode: 'light' | 'dark') => themeStore.setTheme(mode),
  };
}; 