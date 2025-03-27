export const VALIDATION_MESSAGES = {
  required: 'Este campo é obrigatório',
  invalidDate: 'Data inválida',
  pastDate: 'A data não pode ser no passado',
  minLength: (field: string, min: number) => `${field} deve ter pelo menos ${min} caracteres`,
  maxLength: (field: string, max: number) => `${field} deve ter no máximo ${max} caracteres`,
} as const;

export const DATE_FORMATS = {
  display: 'dd/MM/yyyy',
  api: 'yyyy-MM-dd',
  full: 'dd/MM/yyyy HH:mm',
} as const; 