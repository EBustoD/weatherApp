// Archivo: src/components/Loader.tsx
// Este componente muestra una animación de carga (spinner) durante la carga de la página

import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
