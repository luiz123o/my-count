import { BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '@constants/theme';
import { Event } from '@domain/entities/Event';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CountdownCardProps {
  event: Event;
  variant: 'featured' | 'trending';
  onDelete: (id: string) => void;
  onEdit: (event: Event) => void;
  themeColors: any; // Receber as cores do tema
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ 
  event, 
  variant,
  onDelete,
  onEdit,
  themeColors // Usar as cores do tema passadas como prop
}) => {
  // Lógica de countdown
  const calculateTimeLeft = () => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };
  
  const timeLeft = calculateTimeLeft();
  
  const isFeatured = variant === 'featured';
  
  return (
    <View
      style={{
        backgroundColor: isFeatured ? themeColors.primary : themeColors.card,
        borderRadius: BORDER_RADIUS.lg,
        padding: 20,
        marginBottom: 16,
        ...SHADOWS.medium,
      }}
    >
      {/* Header com título e botões */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text
          style={{
            ...TYPOGRAPHY.heading.h3,
            color: isFeatured ? themeColors.textLight : themeColors.text,
            flex: 1,
          }}
          numberOfLines={1}
        >
          {event.name}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            onPress={() => onEdit(event)}
            style={{
              padding: 8,
              borderRadius: BORDER_RADIUS.md,
              backgroundColor: isFeatured 
                ? 'rgba(255, 255, 255, 0.2)' 
                : themeColors.border,
            }}
          >
            <Ionicons 
              name="pencil" 
              size={16} 
              color={isFeatured ? themeColors.textLight : themeColors.text} 
            />
          </Pressable>
          <Pressable
            onPress={() => onDelete(event.id)}
            style={{
              padding: 8,
              borderRadius: BORDER_RADIUS.md,
              backgroundColor: isFeatured 
                ? 'rgba(255, 255, 255, 0.2)' 
                : themeColors.border,
            }}
          >
            <Ionicons 
              name="trash" 
              size={16} 
              color={isFeatured ? themeColors.textLight : themeColors.text} 
            />
          </Pressable>
        </View>
      </View>
      
      {/* Countdown display */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CountdownUnit 
          value={timeLeft.days} 
          label="Days" 
          isFeatured={isFeatured}
          themeColors={themeColors}
        />
        <CountdownUnit 
          value={timeLeft.hours} 
          label="Hours" 
          isFeatured={isFeatured}
          themeColors={themeColors}
        />
        <CountdownUnit 
          value={timeLeft.minutes} 
          label="Mins" 
          isFeatured={isFeatured}
          themeColors={themeColors}
        />
      </View>
      
      {/* Data do evento */}
      <Text
        style={{
          ...TYPOGRAPHY.body.small,
          color: isFeatured ? 'rgba(255, 255, 255, 0.7)' : themeColors.text,
          marginTop: 16,
        }}
      >
        {new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};

interface CountdownUnitProps {
  value: number;
  label: string;
  isFeatured: boolean;
  themeColors: any;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ 
  value, 
  label, 
  isFeatured,
  themeColors 
}) => (
  <View style={{ alignItems: 'center' }}>
    <View
      style={{
        backgroundColor: isFeatured 
          ? 'rgba(255, 255, 255, 0.2)' 
          : themeColors.background,
        borderRadius: BORDER_RADIUS.md,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          ...TYPOGRAPHY.heading.h1,
          color: isFeatured ? themeColors.textLight : themeColors.secondary,
        }}
      >
        {value}
      </Text>
    </View>
    <Text
      style={{
        ...TYPOGRAPHY.body.medium,
        color: isFeatured ? themeColors.textLight : themeColors.text,
      }}
    >
      {label}
    </Text>
  </View>
); 