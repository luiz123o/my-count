import { Event } from '../entities/Event';
import { IEventRepository } from '../repositories/IEventRepository';

export class EventUseCases {
  constructor(private eventRepository: IEventRepository) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.getAllEvents();
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.eventRepository.getEventById(id);
  }

  async createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    return this.eventRepository.createEvent(event);
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    return this.eventRepository.updateEvent(id, event);
  }

  async deleteEvent(id: string): Promise<void> {
    return this.eventRepository.deleteEvent(id);
  }

  calculateCountdown(eventDate: Date) {
    return this.eventRepository.calculateCountdown(eventDate);
  }
} 