import { CountdownCard } from '@components/CountdownCard';
import { EventForm } from '@components/EventForm';
import { BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '@constants/theme';
import { homeViewModel } from '@core/config/di';
import { useThemeStore } from '@core/hooks/useTheme';
import { Event } from '@domain/entities/Event';
import { Ionicons } from '@expo/vector-icons';
import { useUIStore } from '@stores/ui.store';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

const HomeScreen = observer(() => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const { isAddEventModalVisible, setAddEventModalVisible } = useUIStore();
  const { colors, mode } = useThemeStore();

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
    setAddEventModalVisible(false);
  };

  const handleEditEvent = async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      await homeViewModel.updateEvent(editingEvent.id, event);
      loadEvents();
      setAddEventModalVisible(false);
      setEditingEvent(undefined);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    await homeViewModel.deleteEvent(id);
    loadEvents();
  };

  const handleEditPress = (event: Event) => {
    setEditingEvent(event);
    setAddEventModalVisible(true);
  };

  // Ordenar eventos por data e filtrar por busca
  const { nextEvent, otherEvents } = useMemo(() => {
    const filteredEvents = events
      .filter(event => {
        const searchLower = searchQuery.toLowerCase();
        return (
          event.name.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower) ||
          event.category?.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      nextEvent: filteredEvents[0],
      otherEvents: filteredEvents.slice(1)
    };
  }, [events, searchQuery]);

  const renderHeader = () => (
    <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
      {/* Top Bar */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24,
        marginTop: 12,
      }}>
        <Text style={{ 
          ...TYPOGRAPHY.heading.h2, 
          color: colors.text,
        }}>
          My Events
        </Text>
        <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: BORDER_RADIUS.round,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons 
            name="notifications-outline" 
            size={24} 
            color={colors.text}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          borderRadius: BORDER_RADIUS.lg,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 32,
          ...SHADOWS.small,
        }}
      >
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={colors.text}
        />
        <TextInput
          placeholder="Search events"
          placeholderTextColor={colors.border}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            flex: 1,
            marginLeft: 12,
            ...TYPOGRAPHY.body.medium,
            color: colors.text,
          }}
        />
      </View>

      {/* Next Event Section */}
      {nextEvent && (
        <>
          <Text style={{ 
            ...TYPOGRAPHY.heading.h2, 
            color: colors.primary,
            marginBottom: 16,
            marginLeft: 4,
          }}>
            Next Event
          </Text>
          <CountdownCard
            key={nextEvent.id}
            event={nextEvent}
            variant="featured"
            onDelete={handleDeleteEvent}
            onEdit={handleEditPress}
            themeColors={colors}
          />
        </>
      )}

      {/* Other Events Section Title */}
      {otherEvents.length > 0 && (
        <Text style={{ 
          ...TYPOGRAPHY.heading.h2, 
          color: colors.secondary,
          marginTop: 32,
          marginBottom: 16,
          marginLeft: 4,
        }}>
          Other Events
        </Text>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 32 
    }}>
      <View style={{ 
        backgroundColor: colors.card,
        borderRadius: BORDER_RADIUS.round,
        padding: 24,
        marginBottom: 16,
      }}>
        <Ionicons 
          name="calendar-outline" 
          size={64} 
          color={colors.primary}
        />
      </View>
      <Text style={{ 
        ...TYPOGRAPHY.heading.h3, 
        color: colors.primary,
        textAlign: 'center' 
      }}>
        No events yet
      </Text>
      <Text style={{ 
        ...TYPOGRAPHY.body.medium, 
        color: colors.text,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 24,
      }}>
        Create your first event to get started
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: colors.background
    }}>
      <FlatList
        data={otherEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <CountdownCard
              event={item}
              variant="trending"
              onDelete={handleDeleteEvent}
              onEdit={handleEditPress}
              themeColors={colors}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={events.length === 0 ? renderEmptyState : null}
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        overScrollMode="never"
      />

      {/* Event Form Modal */}
      {isAddEventModalVisible && (
        <EventForm
          event={editingEvent}
          onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
          onCancel={() => {
            setAddEventModalVisible(false);
            setEditingEvent(undefined);
          }}
          themeColors={colors}
        />
      )}
    </SafeAreaView>
  );
});

export default HomeScreen; 