/**
 * Interface que representa um evento no sistema
 * Segue o padrão de Model do MVVM
 */
export interface Event {
  id: string;           // Identificador único do evento
  name: string;         // Nome do evento
  date: Date;          // Data do evento
  description?: string; // Descrição opcional do evento
  createdAt: Date;     // Data de criação do registro
  updatedAt: Date;     // Data da última atualização
}

/**
 * Interface que representa o countdown de um evento
 * Usada para exibir o tempo restante em diferentes unidades
 */
export interface Countdown {
  days: number;     // Dias restantes
  hours: number;    // Horas restantes
  minutes: number;  // Minutos restantes
  seconds: number;  // Segundos restantes
  isOverdue: boolean; // Indica se o evento já passou
}

/**
 * Interface para os dados do formulário de evento
 * Usada para criar e atualizar eventos
 * Não inclui campos gerados automaticamente como id e timestamps
 */
export interface EventFormData {
  name: string;         // Nome do evento
  date: Date;          // Data do evento
  description?: string; // Descrição opcional do evento
} 