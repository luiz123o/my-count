import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import 'react-native-reanimated';
import { useThemeStore } from '../core/hooks/useTheme';
import { useColorScheme } from '../hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StyledView = styled(View);

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const themeState = useThemeStore();
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Initialize theme
  useEffect(() => {
    themeState.initialize();
  }, []);

  // Uso de StatusBar API diretamente para Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Aqui podemos usar alguma biblioteca específica para Android se necessário
      // Mas evitaremos Navigation que está causando erros
    }
  }, [themeState.mode]);

  if (!loaded) {
    return null;
  }

  // Use theme from themeState
  const appTheme = themeState.mode === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={appTheme}>
      <StyledView className={`flex-1 ${themeState.mode === 'dark' ? 'bg-gray-900' : 'bg-white'} pt-16`}>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              title: 'Countdown Tracker'
            }} 
          />
        </Stack>
        <StatusBar 
          style={themeState.mode === 'dark' ? 'light' : 'dark'} 
          backgroundColor={themeState.colors.background} 
        />
      </StyledView>
    </ThemeProvider>
  );
}
