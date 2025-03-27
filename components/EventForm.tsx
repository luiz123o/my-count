import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Event, EventFormData } from '../types/event';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(new Date(event.date));
      setDescription(event.description || '');
    }
  }, [event]);

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      date,
      description: description.trim() || undefined,
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            {event ? 'Edit Event' : 'New Event'}
          </Text>
          <Pressable
            onPress={onCancel}
            className="p-2 rounded-lg bg-gray-50"
          >
            <Ionicons name="close-outline" size={24} color="#4B5563" />
          </Pressable>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Event Name
            </Text>
            <TextInput
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900"
              value={name}
              onChangeText={setName}
              placeholder="Enter event name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Date
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white flex-row justify-between items-center"
            >
              <Text className="text-gray-900">
                {date.toLocaleDateString()}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#4B5563" />
            </Pressable>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </Text>
            <TextInput
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter event description"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View className="flex-row justify-end space-x-3 mt-6">
          <Pressable
            onPress={onCancel}
            className="px-6 py-3 rounded-lg bg-gray-100"
          >
            <Text className="text-gray-700 font-medium">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit}
            className="px-6 py-3 rounded-lg bg-primary"
          >
            <Text className="text-white font-medium">
              {event ? 'Save Changes' : 'Create Event'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}; 