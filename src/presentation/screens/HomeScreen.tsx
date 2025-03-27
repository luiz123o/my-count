import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { homeViewModel } from '../../core/config/di';
import { useTheme } from '../../core/hooks/useTheme';
import { Event } from '../../domain/entities/Event';
import { CountdownCard } from '../components/CountdownCard';
import { EventForm } from '../components/EventForm';
import { ThemeToggle } from '../components/ThemeToggle';

const HomeScreen = observer(() => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const loadedEvents = await homeViewModel.loadEvents();
    setEvents(loadedEvents);
  };

  const handleAddEvent = async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    await homeViewModel.createEvent(event);
    loadEvents();
    setIsFormVisible(false);
  };

  const handleEditEvent = async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      await homeViewModel.updateEvent(editingEvent.id, event);
      loadEvents();
      setIsFormVisible(false);
      setEditingEvent(undefined);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    await homeViewModel.deleteEvent(id);
    loadEvents();
  };

  const handleEditPress = (event: Event) => {
    setEditingEvent(event);
    setIsFormVisible(true);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <View className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <View className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            Countdowns
          </Text>
        </View>
        <View className="p-4">
          <Pressable 
            onPress={() => setIsFormVisible(true)}
            className="flex-row items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg"
          >
            <Ionicons name="add" size={20} color="white" />
            <Text className="text-white font-medium">New Event</Text>
          </Pressable>
        </View>
        <View className="px-4">
          <View className="flex-row items-center space-x-2 py-2">
            <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={{ color: theme.colors.textSecondary }}>Upcoming</Text>
          </View>
          <View className="flex-row items-center space-x-2 py-2">
            <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={{ color: theme.colors.textSecondary }}>Calendar</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <View className="flex-row items-center space-x-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Events
            </Text>
            <View className="ml-2">
              <ThemeToggle />
            </View>
          </View>
        </View>

        {/* Lista de Eventos */}
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CountdownCard
              event={item}
              onDelete={handleDeleteEvent}
              onEdit={handleEditPress}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center p-8">
              <View className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
                <Ionicons
                  name="calendar-outline"
                  size={64}
                  color={theme.colors.textSecondary}
                />
              </View>
              <Text
                className="text-xl font-semibold mt-4 text-center"
                style={{ color: theme.colors.text }}
              >
                No events yet
              </Text>
              <Text
                className="text-base text-center mt-2"
                style={{ color: theme.colors.textSecondary }}
              >
                Create your first event to get started
              </Text>
            </View>
          }
        />
      </View>

      {/* Modal do Formulário */}
      {isFormVisible && (
        <EventForm
          event={editingEvent}
          onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
          onCancel={() => {
            setIsFormVisible(false);
            setEditingEvent(undefined);
          }}
        />
      )}
    </View>
  );
});

export default HomeScreen; 