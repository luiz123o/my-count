import { useTranslation } from 'react-i18next';
import i18n from '../../core/i18n/config';

export const useLanguage = () => {
  const { i18n: i18nInstance } = useTranslation();

  const changeLanguage = (language: string) => {
    i18nInstance.changeLanguage(language);
  };

  const getCurrentLanguage = () => {
    return i18nInstance.language;
  };

  const getAvailableLanguages = () => {
    return Object.keys(i18n.options.resources || {});
  };

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    availableLanguages: getAvailableLanguages(),
  };
}; 