import { create } from 'zustand';

export interface UIStore {
  isAddEventModalVisible: boolean;
  setAddEventModalVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAddEventModalVisible: false,
  setAddEventModalVisible: (visible) => set({ isAddEventModalVisible: visible }),
})); 