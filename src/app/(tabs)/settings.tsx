import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { useLanguage } from '../../shared/hooks/use-language';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary, marginBottom: 24 }}>
            {t('settings.title')}
          </Text>

          {/* Language Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 12 }}>
              {t('settings.language')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {availableLanguages.map((lang) => (
                <Pressable
                  key={lang}
                  onPress={() => changeLanguage(lang)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: currentLanguage === lang ? COLORS.primary : COLORS.surface,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                >
                  <Text
                    style={{
                      ...TYPOGRAPHY.body.medium,
                      color: currentLanguage === lang ? COLORS.text.light : COLORS.text.primary,
                      textTransform: 'uppercase',
                    }}
                  >
                    {lang}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 