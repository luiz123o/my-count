import { Event } from './Event';

describe('Event Entity', () => {
  const mockEvent: Event = {
    id: '1',
    name: 'Test Event',
    date: new Date('2024-12-31'),
    description: 'Test Description',
    category: 'Test Category',
    color: '#000000',
    icon: '🎉',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create an event with all properties', () => {
    expect(mockEvent).toHaveProperty('id');
    expect(mockEvent).toHaveProperty('name');
    expect(mockEvent).toHaveProperty('date');
    expect(mockEvent).toHaveProperty('description');
    expect(mockEvent).toHaveProperty('category');
    expect(mockEvent).toHaveProperty('color');
    expect(mockEvent).toHaveProperty('icon');
    expect(mockEvent).toHaveProperty('createdAt');
    expect(mockEvent).toHaveProperty('updatedAt');
  });

  it('should allow optional properties to be undefined', () => {
    const minimalEvent: Event = {
      id: '2',
      name: 'Minimal Event',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(minimalEvent).toHaveProperty('id');
    expect(minimalEvent).toHaveProperty('name');
    expect(minimalEvent).toHaveProperty('date');
    expect(minimalEvent.description).toBeUndefined();
    expect(minimalEvent.category).toBeUndefined();
    expect(minimalEvent.color).toBeUndefined();
    expect(minimalEvent.icon).toBeUndefined();
  });
}); 