export interface Event {
  id: string;
  name: string;
  date: string | Date;
  description?: string;
  category?: string;
  color: string;
  imageUri?: string;
  icon?: string;
  imageUrl?: string;
  location?: string;
  price?: number;
  attendees?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
} 