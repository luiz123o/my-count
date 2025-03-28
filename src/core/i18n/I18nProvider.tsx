import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { getI18n } from './config';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return <I18nextProvider i18n={getI18n()}>{children}</I18nextProvider>;
}; 