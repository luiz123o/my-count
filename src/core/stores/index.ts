import { ThemeStore } from './themeStore';

// Inicializa o store
export const themeStore = new ThemeStore();

// Hook para usar o store
export const useStore = () => {
  return {
    themeStore,
  };
}; 