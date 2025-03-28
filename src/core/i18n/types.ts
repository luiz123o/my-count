import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        common: {
          save: string;
          cancel: string;
          delete: string;
          edit: string;
          loading: string;
          error: string;
          success: string;
        };
        events: {
          title: string;
          addEvent: string;
          editEvent: string;
          deleteEvent: string;
          eventName: string;
          eventDate: string;
          eventTime: string;
          eventImage: string;
          tapToAddImage: string;
          enterEventName: string;
          dateAndTime: string;
          description: string;
          addDescription: string;
          category: string;
          addCategory: string;
          backgroundColor: string;
          icon: string;
          createEvent: string;
          daysLeft: string;
          hoursLeft: string;
          minutesLeft: string;
          noEvents: string;
          confirmDelete: string;
        };
        errors: {
          requiredField: string;
          invalidDate: string;
          invalidTime: string;
          genericError: string;
        };
        settings: {
          title: string;
          language: string;
          theme: string;
          notifications: string;
        };
      };
    };
  }
} 