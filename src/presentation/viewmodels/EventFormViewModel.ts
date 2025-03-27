import { makeAutoObservable } from 'mobx';
import { Event } from '../../domain/entities/Event';
import { EventUseCases } from '../../domain/usecases/EventUseCases';

export class EventFormViewModel {
  name = '';
  date = new Date();
  description = '';
  category = '';
  color = '#4F46E5';
  icon = 'calendar';
  isLoading = false;
  error: string | null = null;

  constructor(
    private eventUseCases: EventUseCases,
    private editingEvent?: Event
  ) {
    makeAutoObservable(this);
    if (editingEvent) {
      this.name = editingEvent.name;
      this.date = editingEvent.date;
      this.description = editingEvent.description || '';
      this.category = editingEvent.category || '';
      this.color = editingEvent.color || '#4F46E5';
      this.icon = editingEvent.icon || 'calendar';
    }
  }

  setName(name: string) {
    this.name = name;
  }

  setDate(date: Date) {
    this.date = date;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setColor(color: string) {
    this.color = color;
  }

  setIcon(icon: string) {
    this.icon = icon;
  }

  async submit(): Promise<Event | null> {
    if (!this.name.trim()) {
      this.error = 'Event name is required';
      return null;
    }

    try {
      this.isLoading = true;
      this.error = null;

      const eventData = {
        name: this.name.trim(),
        date: this.date,
        description: this.description.trim(),
        category: this.category.trim(),
        color: this.color,
        icon: this.icon,
      };

      if (this.editingEvent) {
        return await this.eventUseCases.updateEvent(this.editingEvent.id, eventData);
      } else {
        return await this.eventUseCases.createEvent(eventData);
      }
    } catch (error) {
      this.error = 'Failed to save event';
      console.error('Error saving event:', error);
      return null;
    } finally {
      this.isLoading = false;
    }
  }
} 