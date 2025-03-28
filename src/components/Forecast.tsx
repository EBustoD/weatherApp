// Archivo: src/components/Forecast.tsx
// Este componente muestra la previsión: en dispositivos móviles se visualiza en una cuadrícula 2x2,
// y en PC se muestra en una sola línea horizontal con scroll si es necesario.

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ForecastDay } from '../App';

interface ForecastProps {
  forecast: ForecastDay[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const { t } = useTranslation();

  // Función para obtener el nombre del día a partir de la fecha
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-ES', { weekday: 'long' });
  };

  if (forecast.length === 0) return null;

  // Para este ejemplo, mostramos solo 4 días (puedes ajustar según tus necesidades)
  const forecastToDisplay = forecast.slice(0, 4);

  return (
    <div className="forecast" style={{ textAlign: 'center', marginTop: '1rem' }}>
      <h3>{t('forecast')}</h3>
      <div className="forecast-grid">
        {forecastToDisplay.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>{getDayName(day.dt)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              style={{ width: '50px', height: '50px' }}
            />
            <p>
              {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
            </p>
            <p style={{ fontSize: '0.8rem' }}>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
