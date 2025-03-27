import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface HeaderProps {
  username?: string;
}

export const Header: React.FC<HeaderProps> = ({ username = 'there' }) => {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Pressable>
          <Ionicons name="menu-outline" size={24} color={COLORS.text.primary} />
        </Pressable>
        <Text style={{ ...TYPOGRAPHY.heading.h3, color: COLORS.text.primary }}>
          Hello, {username}
        </Text>
        <Pressable>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text.primary} />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.surface,
          borderRadius: BORDER_RADIUS.lg,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 24,
          ...SHADOWS.small,
        }}
      >
        <Ionicons name="search-outline" size={20} color={COLORS.text.secondary} />
        <TextInput
          placeholder="Find amazing events"
          placeholderTextColor={COLORS.text.secondary}
          style={{
            flex: 1,
            marginLeft: 8,
            ...TYPOGRAPHY.body.medium,
            color: COLORS.text.primary,
          }}
        />
      </View>

      {/* Section Title */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary }}>Featured</Text>
        <Pressable>
          <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.primary }}>See all</Text>
        </Pressable>
      </View>
    </View>
  );
}; 