// Archivo: src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      currentWeather: "Current Weather",
      searchPlace: "Search for a place",
      search: "Search",
      button1: "Button 1",
      button2: "Button 2",
      button3: "Button 3",
      forecast: "Forecast"
    }
  },
  es: {
    translation: {
      currentWeather: "Clima Actual",
      searchPlace: "Buscar un lugar",
      search: "Buscar",
      button1: "Botón 1",
      button2: "Botón 2",
      button3: "Botón 3",
      forecast: "Previsión"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", // Idioma por defecto
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
