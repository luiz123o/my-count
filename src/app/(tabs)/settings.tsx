import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { TYPOGRAPHY } from '../../constants/theme';
import { ThemeMode, useThemeStore } from '../../core/hooks/useTheme';
import { useLanguage } from '../../shared/hooks/use-language';

// Definição de cores disponíveis
const AVAILABLE_COLORS = {
  primary: [
    { name: 'Blue', value: '#3498db' },
    { name: 'Purple', value: '#9b59b6' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Red', value: '#e74c3c' },
    { name: 'Orange', value: '#e67e22' },
  ],
  secondary: [
    { name: 'Yellow', value: '#f1c40f' },
    { name: 'Cyan', value: '#1abc9c' },
    { name: 'Pink', value: '#fd79a8' },
    { name: 'Lime', value: '#7bed9f' },
    { name: 'Lavender', value: '#a29bfe' },
  ]
};

const SettingsScreen = observer(() => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { mode, colors, setTheme, setPrimaryColor, setSecondaryColor } = useThemeStore();

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView>
        <View style={{ padding: 16, paddingTop: 40 }}>
          <Text style={{ ...TYPOGRAPHY.heading.h2, color: colors.text, marginBottom: 24 }}>
            {t('settings.title')}
          </Text>

          {/* Language Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ ...TYPOGRAPHY.body.medium, color: colors.text, marginBottom: 12 }}>
              {t('settings.language')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {availableLanguages.map((lang) => (
                <Pressable
                  key={lang}
                  onPress={() => handleLanguageChange(lang)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: currentLanguage === lang ? colors.primary : colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      ...TYPOGRAPHY.body.medium,
                      color: currentLanguage === lang ? colors.textLight : colors.text,
                      textTransform: 'uppercase',
                    }}
                  >
                    {lang}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Theme Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ ...TYPOGRAPHY.body.medium, color: colors.text, marginBottom: 12 }}>
              {t('settings.theme')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {(['light', 'dark'] as ThemeMode[]).map((themeMode) => (
                <Pressable
                  key={themeMode}
                  onPress={() => handleThemeChange(themeMode)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: mode === themeMode ? colors.primary : colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      ...TYPOGRAPHY.body.medium,
                      color: mode === themeMode ? colors.textLight : colors.text,
                      textTransform: 'capitalize',
                    }}
                  >
                    {themeMode}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          {/* Primary Color Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ ...TYPOGRAPHY.body.medium, color: colors.text, marginBottom: 12 }}>
              {t('settings.primaryColor', 'Primary Color')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {AVAILABLE_COLORS.primary.map((color) => (
                <Pressable
                  key={color.value}
                  onPress={() => handlePrimaryColorChange(color.value)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color.value,
                    borderWidth: colors.primary === color.value ? 3 : 1,
                    borderColor: colors.border,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {colors.primary === color.value && (
                    <Text style={{ color: '#fff', fontSize: 16 }}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
          
          {/* Secondary Color Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ ...TYPOGRAPHY.body.medium, color: colors.text, marginBottom: 12 }}>
              {t('settings.secondaryColor', 'Secondary Color')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {AVAILABLE_COLORS.secondary.map((color) => (
                <Pressable
                  key={color.value}
                  onPress={() => handleSecondaryColorChange(color.value)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color.value,
                    borderWidth: colors.secondary === color.value ? 3 : 1,
                    borderColor: colors.border,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {colors.secondary === color.value && (
                    <Text style={{ color: '#000', fontSize: 16 }}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default SettingsScreen; 