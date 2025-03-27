import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BORDER_RADIUS, COLORS, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { Event } from '../../domain/entities/Event';

const ICON_OPTIONS = [
  { name: 'calendar-outline', label: 'Calendar' },
  { name: 'gift-outline', label: 'Gift' },
  { name: 'airplane-outline', label: 'Travel' },
  { name: 'school-outline', label: 'Education' },
  { name: 'heart-outline', label: 'Love' },
  { name: 'star-outline', label: 'Star' },
  { name: 'trophy-outline', label: 'Trophy' },
];

const COLOR_OPTIONS = [
  '#4F46E5', // Indigo
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

interface EventFormProps {
  event?: Event;
  onSubmit: (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
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
  const [category, setCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICON_OPTIONS[0].name);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(new Date(event.date));
      setDescription(event.description || '');
      setCategory(event.category || '');
      setSelectedColor(event.color || COLOR_OPTIONS[0]);
      setSelectedIcon(event.icon || ICON_OPTIONS[0].name);
      setImageUri(event.imageUri || null);
    }
  }, [event]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      date,
      description: description.trim() || undefined,
      category: category.trim() || undefined,
      color: selectedColor,
      icon: selectedIcon,
      imageUri: imageUri || undefined,
    });
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };

  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onCancel}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.background,
            marginTop: 60,
            borderTopLeftRadius: BORDER_RADIUS.xl,
            borderTopRightRadius: BORDER_RADIUS.xl,
            ...SHADOWS.medium,
          }}
        >
          <ScrollView>
            <View style={{ padding: 24 }}>
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <Text style={{ ...TYPOGRAPHY.heading.h2, color: COLORS.text.primary }}>
                  {event ? 'Edit Event' : 'New Event'}
                </Text>
                <Pressable
                  onPress={onCancel}
                  style={{
                    padding: 8,
                    borderRadius: BORDER_RADIUS.round,
                    backgroundColor: COLORS.surface,
                  }}
                >
                  <Ionicons name="close" size={24} color={COLORS.text.secondary} />
                </Pressable>
              </View>

              {/* Form Fields */}
              <View style={{ gap: 20 }}>
                {/* Image Picker */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Event Image (Optional)
                  </Text>
                  <Pressable
                    onPress={pickImage}
                    style={{
                      height: 200,
                      borderRadius: BORDER_RADIUS.lg,
                      backgroundColor: COLORS.surface,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                      borderStyle: 'dashed',
                      overflow: 'hidden',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ alignItems: 'center' }}>
                        <Ionicons name="image-outline" size={32} color={COLORS.text.secondary} />
                        <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.secondary, marginTop: 8 }}>
                          Tap to add image
                        </Text>
                      </View>
                    )}
                  </Pressable>
                </View>

                {/* Event Name */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Event Name
                  </Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter event name"
                    placeholderTextColor={COLORS.text.secondary}
                    style={{
                      ...TYPOGRAPHY.body.large,
                      color: COLORS.text.primary,
                      backgroundColor: COLORS.surface,
                      borderRadius: BORDER_RADIUS.lg,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                    }}
                  />
                </View>

                {/* Date Picker */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Date and Time
                  </Text>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: COLORS.surface,
                      borderRadius: BORDER_RADIUS.lg,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                    }}
                  >
                    <Text style={{ ...TYPOGRAPHY.body.large, color: COLORS.text.primary }}>
                      {formatDateTime(date)}
                    </Text>
                    <Ionicons name="calendar-outline" size={20} color={COLORS.text.secondary} />
                  </Pressable>
                </View>

                <DateTimePickerModal
                  isVisible={showDatePicker}
                  mode="datetime"
                  onConfirm={handleConfirmDate}
                  onCancel={handleCancelDate}
                  date={date}
                  minimumDate={new Date()}
                />

                {/* Description */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Description (Optional)
                  </Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Add a description"
                    placeholderTextColor={COLORS.text.secondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={{
                      ...TYPOGRAPHY.body.large,
                      color: COLORS.text.primary,
                      backgroundColor: COLORS.surface,
                      borderRadius: BORDER_RADIUS.lg,
                      padding: 16,
                      height: 120,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                    }}
                  />
                </View>

                {/* Category */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Category (Optional)
                  </Text>
                  <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Add a category"
                    placeholderTextColor={COLORS.text.secondary}
                    style={{
                      ...TYPOGRAPHY.body.large,
                      color: COLORS.text.primary,
                      backgroundColor: COLORS.surface,
                      borderRadius: BORDER_RADIUS.lg,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                    }}
                  />
                </View>

                {/* Color Selection */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Background Color
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                    {COLOR_OPTIONS.map((color) => (
                      <Pressable
                        key={color}
                        onPress={() => setSelectedColor(color)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: BORDER_RADIUS.round,
                          backgroundColor: color,
                          borderWidth: selectedColor === color ? 3 : 0,
                          borderColor: COLORS.background,
                          ...SHADOWS.small,
                        }}
                      />
                    ))}
                  </View>
                </View>

                {/* Icon Selection */}
                <View>
                  <Text style={{ ...TYPOGRAPHY.body.medium, color: COLORS.text.primary, marginBottom: 8 }}>
                    Icon
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                    {ICON_OPTIONS.map((icon) => (
                      <Pressable
                        key={icon.name}
                        onPress={() => setSelectedIcon(icon.name)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: BORDER_RADIUS.round,
                          backgroundColor: selectedIcon === icon.name ? selectedColor : COLORS.surface,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: COLORS.border,
                        }}
                      >
                        <Ionicons
                          name={icon.name as any}
                          size={24}
                          color={selectedIcon === icon.name ? COLORS.text.light : COLORS.text.secondary}
                        />
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: 12,
                  marginTop: 32,
                }}
              >
                <Pressable
                  onPress={onCancel}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: BORDER_RADIUS.round,
                    backgroundColor: COLORS.surface,
                  }}
                >
                  <Text style={{ ...TYPOGRAPHY.body.large, color: COLORS.text.primary }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSubmit}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: BORDER_RADIUS.round,
                    backgroundColor: selectedColor,
                  }}
                >
                  <Text style={{ ...TYPOGRAPHY.body.large, color: COLORS.text.light }}>
                    {event ? 'Save Changes' : 'Create Event'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}; 