import { Event } from '../entities/Event';

export interface IEventRepository {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | null>;
  createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event>;
  updateEvent(id: string, event: Partial<Event>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  calculateCountdown(eventDate: Date): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOverdue: boolean;
  };
} 