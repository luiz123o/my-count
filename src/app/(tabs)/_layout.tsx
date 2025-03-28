import { BORDER_RADIUS, COLORS } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import type { UIStore } from '@stores/ui.store';
import { useUIStore } from '@stores/ui.store';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

export default function TabLayout() {
  const setAddEventModalVisible = useUIStore((state: UIStore) => state.setAddEventModalVisible);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingHorizontal: 16,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4,
            }}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.text.secondary} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => (
            <Pressable
              style={({ pressed }) => ({
                width: 60,
                height: 60,
                backgroundColor: pressed ? COLORS.primaryDark : COLORS.primary,
                borderRadius: BORDER_RADIUS.round,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ translateY: -20 }],
                borderWidth: 4,
                borderColor: COLORS.background,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 3,
              })}
              onPress={() => setAddEventModalVisible(true)}
            >
              <Ionicons name="add" size={32} color={COLORS.text.light} />
            </Pressable>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2,
            }}>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.text.secondary} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
