import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../core/hooks/useTheme';
import { Countdown, Event } from '../../domain/entities/Event';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface CountdownCardProps {
  event: Event;
  onDelete?: (id: string) => void;
  onEdit?: (event: Event) => void;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({
  event,
  onDelete,
  onEdit,
}) => {
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState<Countdown>(() => {
    const eventDate = new Date(event.date);
    return calculateCountdown(eventDate);
  });
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const eventDate = new Date(event.date);
    
    // Limpa o timer anterior se existir
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Atualiza o countdown imediatamente
    setCountdown(calculateCountdown(eventDate));

    // Cria um novo timer
    timerRef.current = setInterval(() => {
      setCountdown(calculateCountdown(eventDate));
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [event.date]);

  const calculateCountdown = (eventDate: Date): Countdown => {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    const isOverdue = diff < 0;

    const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((Math.abs(diff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((Math.abs(diff) % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isOverdue,
    };
  };

  return (
    <StyledView className="rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <StyledView className="flex-row justify-between items-start">
        <StyledView className="flex-1 flex-row items-start space-x-3">
          <StyledView 
            className="p-2 rounded-lg mt-1"
            style={{ backgroundColor: `${event.color || theme.colors.primary}10` }}
          >
            <Ionicons
              name={event.icon as any}
              size={18}
              color={event.color || theme.colors.primary}
            />
          </StyledView>
          <StyledView className="flex-1">
            <StyledText
              className="text-base font-medium"
              style={{ color: theme.colors.text }}
            >
              {event.name}
            </StyledText>
            <StyledText
              className="text-sm mt-1"
              style={{ color: theme.colors.textSecondary }}
            >
              {new Date(event.date).toLocaleDateString()}
            </StyledText>
            {event.description && (
              <StyledText
                className="text-sm mt-2"
                style={{ color: theme.colors.textSecondary }}
                numberOfLines={2}
              >
                {event.description}
              </StyledText>
            )}
          </StyledView>
        </StyledView>
        <StyledView className="flex-row space-x-2">
          {onEdit && (
            <StyledPressable
              onPress={() => onEdit(event)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Ionicons
                name="pencil-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
            </StyledPressable>
          )}
          {onDelete && (
            <StyledPressable
              onPress={() => onDelete(event.id)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Ionicons
                name="trash-outline"
                size={16}
                color={theme.colors.error}
              />
            </StyledPressable>
          )}
        </StyledView>
      </StyledView>

      <StyledView className="flex-row items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <StyledView className="flex-row items-center space-x-4">
          <StyledView className="items-center">
            <StyledText
              className="text-lg font-semibold"
              style={{ color: event.color || theme.colors.primary }}
            >
              {countdown.days}
            </StyledText>
            <StyledText
              className="text-xs"
              style={{ color: theme.colors.textSecondary }}
            >
              Days
            </StyledText>
          </StyledView>
          <StyledView className="items-center">
            <StyledText
              className="text-lg font-semibold"
              style={{ color: event.color || theme.colors.primary }}
            >
              {countdown.hours}
            </StyledText>
            <StyledText
              className="text-xs"
              style={{ color: theme.colors.textSecondary }}
            >
              Hours
            </StyledText>
          </StyledView>
          <StyledView className="items-center">
            <StyledText
              className="text-lg font-semibold"
              style={{ color: event.color || theme.colors.primary }}
            >
              {countdown.minutes}
            </StyledText>
            <StyledText
              className="text-xs"
              style={{ color: theme.colors.textSecondary }}
            >
              Minutes
            </StyledText>
          </StyledView>
          <StyledView className="items-center">
            <StyledText
              className="text-lg font-semibold"
              style={{ color: event.color || theme.colors.primary }}
            >
              {countdown.seconds}
            </StyledText>
            <StyledText
              className="text-xs"
              style={{ color: theme.colors.textSecondary }}
            >
              Seconds
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}; 