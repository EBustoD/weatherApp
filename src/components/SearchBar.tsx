// Archivo: src/components/SearchBar.tsx
// Este componente usa la API de GeoDB Cities para sugerir ubicaciones globalmente, ordenadas por proximidad si se obtiene la ubicación del usuario, e incluye un botón para limpiar el input.

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface City {
  city: string;
  region: string;
  country: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  // Retrieve API credentials from .env via Vite's import.meta.env
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

  // Obtener la ubicación del usuario al montar el componente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("No se pudo obtener la ubicación del usuario:", error);
        }
      );
    }
  }, []);

  // Función para obtener sugerencias de ciudades
  const fetchSuggestions = async (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      // URL base con el prefijo de nombre y límite de 5 resultados
      let url = `https://${RAPIDAPI_HOST}/v1/geo/cities?namePrefix=${value}&limit=5`;
      if (userLocation) {
        // Formatear la latitud y longitud en formato ISO 6709 (±DD.DDDD±DDD.DDDD)
        const latStr = (userLocation.lat >= 0 ? '+' : '') + Math.abs(userLocation.lat).toFixed(4);
        const lonStr = (userLocation.lon >= 0 ? '+' : '-') + Math.abs(userLocation.lon).toFixed(4);
        const isoLocation = `${latStr}${lonStr}`; // Ej: "+42.8638-2.6542"
        // Codificar la cadena para evitar problemas con el carácter "+"
        url += `&location=${encodeURIComponent(isoLocation)}&radius=100&distanceUnit=KM`;
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      });
      const data = await response.json();
      if (data && data.data) {
        setSuggestions(data.data);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  // Manejar el cambio en el input y filtrar sugerencias (con debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchSuggestions(query.trim());
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Al seleccionar una sugerencia, actualizamos el input y realizamos la búsqueda
  const handleSelectSuggestion = (city: City) => {
    const cityName = `${city.city}, ${city.region}, ${city.country}`;
    setQuery(cityName);
    setSuggestions([]);
    onSearch(cityName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlace')}
          style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '6px' }}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              marginLeft: '-2rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#e0e0e0',
            }}
          >
            &#10005;
          </button>
        )}
        <button type="submit" className="button" style={{ marginLeft: '0.5rem' }}>
          {t('search')}
        </button>
        {suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#3a3a3a',
              listStyle: 'none',
              padding: '0.5rem',
              margin: 0,
              borderRadius: '0 0 6px 6px',
              zIndex: 10,
            }}
          >
            {isLoading && <li style={{ padding: '0.5rem' }}>Cargando...</li>}
            {suggestions.map((city) => (
              <li
                key={`${city.city}-${city.region}-${city.country}`}
                onClick={() => handleSelectSuggestion(city)}
                style={{ padding: '0.5rem', cursor: 'pointer' }}
              >
                {city.city}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
