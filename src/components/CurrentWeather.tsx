// Archivo: src/components/CurrentWeather.tsx
// Este componente muestra el clima actual en un contenedor ampliado, con los grados mostrados en tamaño muy grande.

import React from 'react';
import { useTranslation } from 'react-i18next';

interface CurrentWeatherProps {
  weather: {
    name: string;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  } | null;
  error: string | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, error }) => {
  const { t } = useTranslation();

  return (
    <div
      className="current-weather"
      style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#3a3a3a', borderRadius: '8px', marginBottom: '1rem' }}
    >
      <h2>{t('currentWeather')}</h2>
      {error && <p>{error}</p>}
      {weather ? (
        <div>
          {/* Nombre de la ciudad en tamaño grande */}
          <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{weather.name}</h3>
          {/* Temperatura en tamaño super grande */}
          <p style={{ fontSize: '4rem', margin: '0.5rem 0', fontWeight: 'bold' }}>
            {Math.round(weather.main.temp)}°C
          </p>
          {/* Descripción del clima */}
          <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
            {weather.weather[0].description}
          </p>
          {/* Icono del clima, ampliado */}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: '120px', height: '120px' }}
          />
        </div>
      ) : (
        !error && <p>Cargando...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
