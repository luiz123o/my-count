import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Countdown, Event, EventFormData } from '../types/event';

// Chave única para armazenar os eventos no AsyncStorage
const STORAGE_KEY = '@events';

/**
 * Hook personalizado para gerenciar eventos e countdowns
 * Implementa o padrão MVVM (Model-View-ViewModel) onde:
 * - Model: Event e EventFormData (tipos)
 * - View: Componentes que consomem este hook
 * - ViewModel: Esta implementação do hook
 */
export const useEvents = () => {
  // Estado para armazenar a lista de eventos
  const [events, setEvents] = useState<Event[]>([]);
  // Estado para controlar o loading inicial
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os eventos do AsyncStorage quando o hook é montado
  useEffect(() => {
    loadEvents();
  }, []);

  /**
   * Carrega os eventos do AsyncStorage
   * Converte as datas de string para objetos Date
   * Isso é necessário porque o AsyncStorage só armazena strings
   */
  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents).map((event: Event) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt),
        }));
        setEvents(parsedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Salva os eventos no AsyncStorage
   * Usa JSON.stringify para converter os objetos em string
   */
  const saveEvents = async (newEvents: Event[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  /**
   * Adiciona um novo evento
   * Gera um ID único baseado no timestamp
   * Cria novas instâncias de Date para garantir consistência
   */
  const addEvent = async (eventData: EventFormData) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      date: new Date(eventData.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await saveEvents([...events, newEvent]);
  };

  /**
   * Remove um evento pelo ID
   * Usa filter para criar uma nova lista sem o evento removido
   */
  const deleteEvent = async (id: string) => {
    await saveEvents(events.filter(event => event.id !== id));
  };

  /**
   * Atualiza um evento existente
   * Mantém os dados originais e atualiza apenas os campos modificados
   * Atualiza o timestamp de updatedAt
   */
  const updateEvent = async (id: string, eventData: EventFormData) => {
    const updatedEvents = events.map(event =>
      event.id === id
        ? {
            ...event,
            ...eventData,
            date: new Date(eventData.date),
            updatedAt: new Date(),
          }
        : event
    );
    await saveEvents(updatedEvents);
  };

  /**
   * Calcula o countdown para uma data específica
   * Retorna dias, horas, minutos e segundos restantes
   * Inclui flag isOverdue para eventos que já passaram
   */
  const calculateCountdown = (eventDate: Date): Countdown => {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    const isOverdue = diff < 0;

    // Cálculos usando Math.abs para lidar com eventos passados
    const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((Math.abs(diff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((Math.abs(diff) % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isOverdue,
    };
  };

  // Retorna um objeto com todas as funções e estados necessários
  return {
    events,
    isLoading,
    addEvent,
    deleteEvent,
    updateEvent,
    calculateCountdown,
  };
}; 