import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from 'nativewind';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { z } from 'zod';
import { useTheme } from '../../core/hooks/useTheme';
import { Event } from '../../domain/entities/Event';
import { eventColors, eventIcons } from '../../shared/types/theme';
import { EventCustomization } from './EventCustomization';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

interface EventFormProps {
  event?: Event;
  onSubmit: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

// Schema de validação com Zod
const eventSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  date: z.date().refine(date => date > new Date(), {
    message: 'A data deve ser no futuro',
  }),
  description: z.string().optional(),
  category: z.string().optional(),
  color: z.string(),
  icon: z.string(),
});

// Tipo inferido do schema
type EventFormData = z.infer<typeof eventSchema>;

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
}) => {
  const { theme } = useTheme();
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);

  // Configurar React Hook Form com Zod
  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name || '',
      date: event?.date || new Date(),
      description: event?.description || '',
      category: event?.category || '',
      color: event?.color || eventColors[0],
      icon: event?.icon || eventIcons[0],
    },
  });

  // Observar mudanças no color e icon para atualização
  const selectedColor = watch('color');
  const selectedIcon = watch('icon');

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setValue('date', selectedDate);
    hideDatePicker();
  };

  const onFormSubmit = (data: EventFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onCancel}
    >
      <StyledView
        className="flex-1 p-6"
        style={{ backgroundColor: theme.colors.background }}
      >
        <StyledView className="flex-row justify-between items-center mb-6">
          <StyledText
            className="text-2xl font-bold"
            style={{ color: theme.colors.text }}
          >
            {event ? 'Editar Evento' : 'Novo Evento'}
          </StyledText>
          <StyledPressable onPress={onCancel}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.text}
            />
          </StyledPressable>
        </StyledView>

        <StyledView className="space-y-4">
          <StyledView>
            <StyledText
              className="text-sm font-medium mb-1"
              style={{ color: theme.colors.text }}
            >
              Nome do Evento
            </StyledText>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Digite o nome do evento"
                  className={`p-3 rounded-lg border ${errors.name ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: theme.colors.card,
                    borderColor: errors.name ? theme.colors.error : theme.colors.border,
                    color: theme.colors.text,
                  }}
                  placeholderTextColor={theme.colors.textSecondary}
                />
              )}
            />
            {errors.name && (
              <StyledText className="text-xs mt-1" style={{ color: theme.colors.error }}>
                {errors.name.message}
              </StyledText>
            )}
          </StyledView>

          <StyledView>
            <StyledText
              className="text-sm font-medium mb-1"
              style={{ color: theme.colors.text }}
            >
              Data e Hora
            </StyledText>
            <Controller
              control={control}
              name="date"
              render={({ field: { value } }) => (
                <>
                  <StyledPressable
                    onPress={showDatePicker}
                    className={`p-3 rounded-lg border flex-row justify-between items-center ${errors.date ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: theme.colors.card,
                      borderColor: errors.date ? theme.colors.error : theme.colors.border,
                    }}
                  >
                    <StyledText style={{ color: theme.colors.text }}>
                      {value.toLocaleString()}
                    </StyledText>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={theme.colors.text}
                    />
                  </StyledPressable>
                  
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={value}
                    minimumDate={new Date()}
                    buttonTextColorIOS={theme.colors.primary}
                    confirmTextIOS="Confirmar"
                    cancelTextIOS="Cancelar"
                  />
                </>
              )}
            />
            {errors.date && (
              <StyledText className="text-xs mt-1" style={{ color: theme.colors.error }}>
                {errors.date.message}
              </StyledText>
            )}
          </StyledView>

          <StyledView>
            <StyledText
              className="text-sm font-medium mb-1"
              style={{ color: theme.colors.text }}
            >
              Descrição
            </StyledText>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Adicione uma descrição (opcional)"
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline
                  numberOfLines={3}
                />
              )}
            />
          </StyledView>

          <StyledView>
            <StyledText
              className="text-sm font-medium mb-1"
              style={{ color: theme.colors.text }}
            >
              Categoria
            </StyledText>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Adicione uma categoria (opcional)"
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                  placeholderTextColor={theme.colors.textSecondary}
                />
              )}
            />
          </StyledView>

          <EventCustomization
            selectedColor={selectedColor}
            selectedIcon={selectedIcon}
            onColorSelect={(color) => setValue('color', color)}
            onIconSelect={(icon) => setValue('icon', icon)}
          />

          <StyledPressable
            onPress={handleSubmit(onFormSubmit)}
            className="bg-primary p-4 rounded-lg mt-4"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <StyledText className="text-white text-center font-medium">
              {event ? 'Salvar Alterações' : 'Criar Evento'}
            </StyledText>
          </StyledPressable>
        </StyledView>
      </StyledView>
    </Modal>
  );
}; 