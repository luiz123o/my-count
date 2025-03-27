import { makeAutoObservable } from 'mobx';
import { Event } from '../../domain/entities/Event';
import { EventRepository } from '../../domain/repositories/EventRepository';

export class HomeViewModel {
  constructor(private eventRepository: EventRepository) {
    makeAutoObservable(this);
  }

  async loadEvents(): Promise<Event[]> {
    return await this.eventRepository.getAllEvents();
  }

  async createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await this.eventRepository.createEvent(event);
  }

  async updateEvent(id: string, event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await this.eventRepository.updateEvent(id, event);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.eventRepository.deleteEvent(id);
  }
} 