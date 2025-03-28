import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import './types';

import en from './locales/en.json';
import pt from './locales/pt.json';

export const getI18n = () => {
  // Get device language or default to 'en'
  const deviceLanguage = Localization.locale.split('-')[0];
  const defaultLanguage = deviceLanguage === 'pt' ? 'pt' : 'en';

  // Initialize i18n
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        pt: { translation: pt }
      },
      lng: defaultLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      defaultNS: 'translation',
      ns: ['translation'],
    });

  // Log the current language
  console.log('i18n initialized with language:', i18n.language);

  return i18n;
};

export default getI18n();