// Archivo: src/main.tsx
// Punto de entrada de la aplicación. Se importa la configuración de i18n y se renderiza el componente principal App.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // Inicializa las traducciones
import './App.css'; // Importamos los estilos globales

// Se crea la raíz de React y se renderiza la aplicación
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
