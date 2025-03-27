import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../core/hooks/useTheme';
import { eventColors, eventIcons } from '../../shared/types/theme';

interface EventCustomizationProps {
  selectedColor: string;
  selectedIcon: string;
  onColorSelect: (color: string) => void;
  onIconSelect: (icon: string) => void;
}

export const EventCustomization: React.FC<EventCustomizationProps> = ({
  selectedColor,
  selectedIcon,
  onColorSelect,
  onIconSelect,
}) => {
  const { theme } = useTheme();

  return (
    <View className="space-y-4">
      {/* Seção de Cores */}
      <View>
        <Text
          className="text-base font-medium mb-2"
          style={{ color: theme.colors.text }}
        >
          Cor do Evento
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row space-x-2"
        >
          {eventColors.map((color) => (
            <Pressable
              key={color}
              onPress={() => onColorSelect(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? 'border-primary' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </ScrollView>
      </View>

      {/* Seção de Ícones */}
      <View>
        <Text
          className="text-base font-medium mb-2"
          style={{ color: theme.colors.text }}
        >
          Ícone do Evento
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row space-x-2"
        >
          {eventIcons.map((icon) => (
            <Pressable
              key={icon}
              onPress={() => onIconSelect(icon)}
              className={`w-10 h-10 rounded-lg items-center justify-center ${
                selectedIcon === icon
                  ? 'bg-primary'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <Ionicons
                name={icon as any}
                size={20}
                color={selectedIcon === icon ? '#FFFFFF' : theme.colors.text}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}; 