import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { Event } from '../../domain/entities/Event';
import { IEventRepository } from '../../domain/repositories/IEventRepository';

const STORAGE_KEY = '@events';

export class EventRepository implements IEventRepository {
  private async getEventsFromStorage(): Promise<Event[]> {
    try {
      const eventsJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (eventsJson) {
        const events = JSON.parse(eventsJson);
        return events.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  }

  private async saveEventsToStorage(events: Event[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events:', error);
    }
  }

  async getAllEvents(): Promise<Event[]> {
    return this.getEventsFromStorage();
  }

  async getEventById(id: string): Promise<Event | null> {
    const events = await this.getEventsFromStorage();
    return events.find(event => event.id === id) || null;
  }

  async createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const events = await this.getEventsFromStorage();
    const newEvent: Event = {
      ...event,
      id: Crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    events.push(newEvent);
    await this.saveEventsToStorage(events);
    return newEvent;
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const events = await this.getEventsFromStorage();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Event not found');

    const updatedEvent: Event = {
      ...events[index],
      ...event,
      updatedAt: new Date(),
    };
    events[index] = updatedEvent;
    await this.saveEventsToStorage(events);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    const events = await this.getEventsFromStorage();
    const filteredEvents = events.filter(event => event.id !== id);
    await this.saveEventsToStorage(filteredEvents);
  }

  calculateCountdown(eventDate: Date) {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    const isOverdue = diff < 0;

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
  }
} 