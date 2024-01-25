// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';




i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES },
    },
    lng: 'en', // idioma por defecto
    fallbackLng: 'en', // idioma de respaldo en caso de que el idioma seleccionado no tenga traducciones
    interpolation: {
      escapeValue: false, // no necesitas escapar las cadenas traducidas
    },
  });

export default i18n;