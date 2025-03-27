import { EventRepository } from '../../data/repositories/EventRepository';
import { EventUseCases } from '../../domain/usecases/EventUseCases';
import { EventFormViewModel } from '../../presentation/viewmodels/EventFormViewModel';
import { HomeViewModel } from '../../presentation/viewmodels/HomeViewModel';

// Repository
const eventRepository = new EventRepository();

// Use Cases
const eventUseCases = new EventUseCases(eventRepository);

// ViewModels
export const homeViewModel = new HomeViewModel(eventUseCases);

// Factory function for EventFormViewModel
export const createEventFormViewModel = (editingEvent?: import('../../domain/entities/Event').Event) => {
  return new EventFormViewModel(eventUseCases, editingEvent);
};