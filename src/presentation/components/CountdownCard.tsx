import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { Event } from '../../domain/entities/Event';

interface CountdownCardProps {
  event: Event;
  variant: 'featured' | 'trending';
  onDelete: (id: string) => void;
  onEdit: (event: Event) => void;
}

const calculateCountdown = (eventDate: Date | string) => {
  const now = new Date();
  const date = new Date(eventDate);
  const diff = date.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

export const CountdownCard: React.FC<CountdownCardProps> = ({
  event,
  variant,
  onDelete,
  onEdit,
}) => {
  const [countdown, setCountdown] = useState(calculateCountdown(event.date));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(event.date));
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, [event.date]);

  if (variant === 'featured') {
    return (
      <View
        style={{
          borderRadius: BORDER_RADIUS.xl,
          overflow: 'hidden',
          ...SHADOWS.medium,
          marginBottom: 8,
        }}
      >
        {/* Background Color or Image */}
        <View style={{
          height: 200,
          backgroundColor: event.color,
          overflow: 'hidden',
        }}>
          {event.imageUri && (
            <Image
              source={{ uri: event.imageUri }}
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.8, // Deixa a imagem um pouco mais escura para melhor contraste
              }}
              resizeMode="cover"
            />
          )}
          {/* Overlay para garantir contraste */}
          <View style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: event.color,
            opacity: event.imageUri ? 0.3 : 1,
          }} />
        </View>

        {/* Content */}
        <View
          style={{
            backgroundColor: COLORS.surface,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary }}>
              {event.name}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                onPress={() => onEdit(event)}
                style={{
                  padding: 8,
                  borderRadius: BORDER_RADIUS.round,
                  backgroundColor: COLORS.background,
                }}
              >
                <Ionicons name="pencil" size={20} color={COLORS.text.secondary} />
              </Pressable>
              <Pressable
                onPress={() => onDelete(event.id)}
                style={{
                  padding: 8,
                  borderRadius: BORDER_RADIUS.round,
                  backgroundColor: COLORS.background,
                }}
              >
                <Ionicons name="trash" size={20} color={COLORS.text.secondary} />
              </Pressable>
            </View>
          </View>

          {event.description && (
            <Text
              style={{
                ...TYPOGRAPHY.body.medium,
                color: COLORS.text.secondary,
                marginBottom: 16,
              }}
              numberOfLines={2}
            >
              {event.description}
            </Text>
          )}

          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary }}>
                {countdown.days}
              </Text>
              <Text style={{ ...TYPOGRAPHY.body.small, color: COLORS.text.secondary }}>
                days
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary }}>
                {countdown.hours}
              </Text>
              <Text style={{ ...TYPOGRAPHY.body.small, color: COLORS.text.secondary }}>
                hours
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary }}>
                {countdown.minutes}
              </Text>
              <Text style={{ ...TYPOGRAPHY.body.small, color: COLORS.text.secondary }}>
                minutes
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        marginBottom: 12,
        height: 100, // Altura fixa para os cards menores
        ...SHADOWS.small,
      }}
    >
      {/* Color Block or Image */}
      <View
        style={{
          width: 100,
          backgroundColor: event.color,
          overflow: 'hidden',
        }}
      >
        {event.imageUri && (
          <Image
            source={{ uri: event.imageUri }}
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.8,
            }}
            resizeMode="cover"
          />
        )}
        {/* Overlay */}
        <View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: event.color,
          opacity: event.imageUri ? 0.3 : 1,
        }} />
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 12, justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ ...TYPOGRAPHY.heading.h3, color: COLORS.text.primary }}>
              {event.name}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable onPress={() => onEdit(event)}>
                <Ionicons name="pencil" size={16} color={COLORS.text.secondary} />
              </Pressable>
              <Pressable onPress={() => onDelete(event.id)}>
                <Ionicons name="trash" size={16} color={COLORS.text.secondary} />
              </Pressable>
            </View>
          </View>

          {event.description && (
            <Text 
              style={{ ...TYPOGRAPHY.body.small, color: COLORS.text.secondary }}
              numberOfLines={1}
            >
              {event.description}
            </Text>
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, fontWeight: '600' }}>
            {countdown.days}d {countdown.hours}h
          </Text>
          {event.category && (
            <Text style={{ ...TYPOGRAPHY.body.small, color: COLORS.text.secondary }}>
              • {event.category}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}; 