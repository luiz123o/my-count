import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../core/hooks/useTheme';

export const ThemeToggle = observer(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View className="relative">
      <Pressable
        onPress={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        style={{ marginRight: 10 }}
      >
        <Ionicons
          name={theme.mode === 'light' ? 'moon' : 'sunny'}
          size={24}
          color={theme.mode === 'light' ? '#1F2937' : '#F59E0B'}
        />
      </Pressable>
    </View>
  );
}); 