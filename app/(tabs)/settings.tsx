import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../src/constants/theme';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary, marginBottom: 24 }}>
            Settings
          </Text>
          {/* Adicionar opções de configuração aqui */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 