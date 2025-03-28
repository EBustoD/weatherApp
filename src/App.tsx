// Archivo: src/App.tsx
// Componente principal que administra el estado del clima actual, la previsión de 5 días y la animación de carga

import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import Footer from './components/Footer'; 

export interface ForecastDay {
  dt: number;
  temp: { min: number; max: number };
  weather: { description: string; icon: string }[];
}

interface WeatherData {
  coord: { lat: number; lon: number };
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '275e041f1c238dba5192bcb889638a41'; // Reemplaza con tu API Key

  // Procesa los datos del pronóstico agrupados en intervalos de 3 horas
  const processForecastData = (list: any[]): ForecastDay[] => {
    const groups: { [date: string]: any[] } = {};
    list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toISOString().split('T')[0];
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(item);
    });

    const dailyForecast: ForecastDay[] = [];
    for (const date in groups) {
      const items = groups[date];
      const minTemp = Math.min(...items.map(i => i.main.temp_min));
      const maxTemp = Math.max(...items.map(i => i.main.temp_max));
      const targetHour = 12;
      let selected = items[0];
      let minDiff = Infinity;
      items.forEach(item => {
        const hour = new Date(item.dt * 1000).getHours();
        const diff = Math.abs(hour - targetHour);
        if (diff < minDiff) {
          minDiff = diff;
          selected = item;
        }
      });
      dailyForecast.push({
        dt: selected.dt,
        temp: { min: minTemp, max: maxTemp },
        weather: selected.weather,
      });
    }
    dailyForecast.sort((a, b) => a.dt - b.dt);
    return dailyForecast;
  };

  // Obtiene el pronóstico de 5 días (3h intervalos)
  const fetchForecast = async (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener la previsión');
      }
      const data = await response.json();
      const processedForecast = processForecastData(data.list);
      // Elimina el pronóstico del día actual y muestra los siguientes 5 días
      setForecast(processedForecast.slice(1, 6));
    } catch (err) {
      console.error(err);
    }
  };

  // Busca el clima por ciudad
  const handleSearch = async (query: string) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=es&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener el clima');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
      if (data.coord) {
        fetchForecast(data.coord.lat, data.coord.lon);
      }
      setLoading(false);
    } catch (err) {
      setError('No se pudo obtener el clima para la ciudad');
      setWeather(null);
      setLoading(false);
      console.error(err);
    }
  };

  // Obtiene el clima actual mediante geolocalización al cargar la app
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener el clima');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
      if (data.coord) {
        fetchForecast(data.coord.lat, data.coord.lon);
      }
      setLoading(false);
    } catch (err) {
      setError('No se pudo obtener el clima');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('No se pudo obtener la ubicación');
          setLoading(false);
          console.error(err);
        }
      );
    } else {
      setError('La geolocalización no es soportada por este navegador');
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      {/* Muestra el loader hasta que se complete la carga */}
      {loading && <Loader />}
      {/* Ubicamos la barra de búsqueda en la parte superior */}
      <SearchBar onSearch={handleSearch} />
      <CurrentWeather weather={weather} error={error} />
      {forecast.length > 0 && <Forecast forecast={forecast} />}
      <Footer /> 
    </div>
  );
};

export default App;
