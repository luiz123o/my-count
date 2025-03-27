export interface Event {
  id: string;
  name: string;
  date: Date;
  description?: string;
  category?: string;
  color?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
} 