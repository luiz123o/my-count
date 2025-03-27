import { makeAutoObservable } from 'mobx';
import { Event } from '../../domain/entities/Event';
import { EventUseCases } from '../../domain/usecases/EventUseCases';

export class HomeViewModel {
  events: Event[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private eventUseCases: EventUseCases) {
    makeAutoObservable(this);
  }

  async createEvent(event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const newEvent = await this.eventUseCases.createEvent(event);
      this.events.push(newEvent);
    } catch (error) {
      this.error = 'Failed to create event';
      console.error('Error creating event:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async updateEvent(id: string, event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const updatedEvent = await this.eventUseCases.updateEvent(id, event);
      const index = this.events.findIndex(e => e.id === id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
      }
    } catch (error) {
      this.error = 'Failed to update event';
      console.error('Error updating event:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadEvents(): Promise<Event[]> {
    try {
      this.isLoading = true;
      this.error = null;
      this.events = await this.eventUseCases.getAllEvents();
      return this.events;
    } catch (error) {
      this.error = 'Failed to load events';
      console.error('Error loading events:', error);
      return [];
    } finally {
      this.isLoading = false;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      await this.eventUseCases.deleteEvent(id);
      this.events = this.events.filter(event => event.id !== id);
    } catch (error) {
      this.error = 'Failed to delete event';
      console.error('Error deleting event:', error);
    } finally {
      this.isLoading = false;
    }
  }

  calculateCountdown(eventDate: Date) {
    return this.eventUseCases.calculateCountdown(eventDate);
  }
} 