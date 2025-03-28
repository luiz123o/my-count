import { BORDER_RADIUS, TYPOGRAPHY } from '@constants/theme';
import { Event } from '@domain/entities/Event';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

interface EventFormProps {
  event?: Event;
  onSubmit: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  themeColors: any; // Receber as cores do tema
}

export const EventForm: React.FC<EventFormProps> = ({ 
  event, 
  onSubmit, 
  onCancel,
  themeColors 
}) => {
  const [name, setName] = useState(event?.name || '');
  const [description, setDescription] = useState(event?.description || '');
  const [category, setCategory] = useState(event?.category || '');
  const [date, setDate] = useState(new Date(event?.date || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleSubmit = () => {
    if (!name.trim()) return;
    
    onSubmit({
      name,
      description,
      category,
      date: date.toISOString(),
    });
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: themeColors.background,
            borderTopLeftRadius: BORDER_RADIUS.xl,
            borderTopRightRadius: BORDER_RADIUS.xl,
            padding: 24,
            maxHeight: '90%',
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <Text style={{ ...TYPOGRAPHY.heading.h2, color: themeColors.text }}>
                {event ? 'Edit Event' : 'New Event'}
              </Text>
              <Pressable onPress={onCancel}>
                <Ionicons name="close" size={24} color={themeColors.text} />
              </Pressable>
            </View>
            
            {/* Nome do evento */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.text, marginBottom: 8 }}>
                Event Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter event name"
                placeholderTextColor={themeColors.border}
                style={{
                  ...TYPOGRAPHY.body.medium,
                  color: themeColors.text,
                  backgroundColor: themeColors.card,
                  padding: 16,
                  borderRadius: BORDER_RADIUS.md,
                }}
              />
            </View>
            
            {/* Descrição do evento */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.text, marginBottom: 8 }}>
                Description (optional)
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Enter event description"
                placeholderTextColor={themeColors.border}
                multiline
                numberOfLines={3}
                style={{
                  ...TYPOGRAPHY.body.medium,
                  color: themeColors.text,
                  backgroundColor: themeColors.card,
                  padding: 16,
                  borderRadius: BORDER_RADIUS.md,
                  height: 100,
                  textAlignVertical: 'top',
                }}
              />
            </View>
            
            {/* Categoria do evento */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.text, marginBottom: 8 }}>
                Category (optional)
              </Text>
              <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="E.g. Birthday, Holiday, Work"
                placeholderTextColor={themeColors.border}
                style={{
                  ...TYPOGRAPHY.body.medium,
                  color: themeColors.text,
                  backgroundColor: themeColors.card,
                  padding: 16,
                  borderRadius: BORDER_RADIUS.md,
                }}
              />
            </View>
            
            {/* Data e hora */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.text, marginBottom: 8 }}>
                Date and Time
              </Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: themeColors.card,
                  padding: 16,
                  borderRadius: BORDER_RADIUS.md,
                }}
              >
                <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.text }}>
                  {date.toLocaleString()}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={themeColors.text} />
              </Pressable>
            </View>
            
            {/* Botões de ação */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={onCancel}
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: BORDER_RADIUS.md,
                  backgroundColor: themeColors.card,
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.text }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit}
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: BORDER_RADIUS.md,
                  backgroundColor: themeColors.primary,
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...TYPOGRAPHY.body.medium, color: themeColors.textLight }}>
                  {event ? 'Update' : 'Create'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
              themeVariant={themeColors.mode === 'dark' ? 'dark' : 'light'}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}; 