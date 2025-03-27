import { z } from 'zod';

export const eventFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  date: z.date(),
  description: z.string().optional(),
  category: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>; 