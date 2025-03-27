import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useEvents } from '../hooks/useEvents';
import { Countdown, Event } from '../types/event';

/**
 * Props do componente CountdownCard
 * Segue o padrão de props do React com tipos TypeScript
 */
interface CountdownCardProps {
  event: Event;                    // Evento a ser exibido
  onDelete?: (id: string) => void; // Callback para deletar o evento
  onEdit?: (event: Event) => void; // Callback para editar o evento
}

/**
 * Componente CountdownCard
 * Responsável por exibir um evento individual com seu countdown
 * Implementa o padrão de apresentação (View) do MVVM
 */
export const CountdownCard: React.FC<CountdownCardProps> = ({
  event,
  onDelete,
  onEdit,
}) => {
  // Hook personalizado para gerenciar eventos e cálculos
  const { calculateCountdown } = useEvents();
  
  // Estado para armazenar o countdown atual
  // Usa uma função de inicialização para garantir que a data seja convertida corretamente
  const [countdown, setCountdown] = useState<Countdown>(() => {
    const eventDate = new Date(event.date);
    return calculateCountdown(eventDate);
  });

  /**
   * Efeito para atualizar o countdown a cada segundo
   * Usa setInterval para criar um timer contínuo
   * Limpa o timer quando o componente é desmontado
   */
  useEffect(() => {
    const eventDate = new Date(event.date);
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.date]);

  return (
    // Container principal com estilo de card
    <View className="bg-white rounded-xl p-4 mb-4 mx-4 shadow-sm border border-gray-100">
      {/* Cabeçalho do card com nome do evento e ações */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">{event.name}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {new Date(event.date).toLocaleDateString()}
          </Text>
        </View>
        {/* Botões de ação */}
        <View className="flex-row space-x-2">
          {onEdit && (
            <Pressable
              onPress={() => onEdit(event)}
              className="p-2 rounded-lg bg-gray-50"
            >
              <Ionicons name="pencil-outline" size={20} color="#4B5563" />
            </Pressable>
          )}
          {onDelete && (
            <Pressable
              onPress={() => onDelete(event.id)}
              className="p-2 rounded-lg bg-red-50"
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Container do countdown com grid de tempo */}
      <View className="flex-row justify-between items-center bg-gray-50 rounded-lg p-3">
        {/* Bloco de dias */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary">{countdown.days}</Text>
          <Text className="text-xs text-gray-500">Days</Text>
        </View>
        {/* Bloco de horas */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary">{countdown.hours}</Text>
          <Text className="text-xs text-gray-500">Hours</Text>
        </View>
        {/* Bloco de minutos */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary">{countdown.minutes}</Text>
          <Text className="text-xs text-gray-500">Minutes</Text>
        </View>
        {/* Bloco de segundos */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary">{countdown.seconds}</Text>
          <Text className="text-xs text-gray-500">Seconds</Text>
        </View>
      </View>
    </View>
  );
}; 