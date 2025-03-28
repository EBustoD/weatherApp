import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();

  // Funciones placeholder para los botones
  const handleButton1 = () => {
    console.log('Botón 1 presionado');
  };

  const handleButton2 = () => {
    console.log('Botón 2 presionado');
  };

  const handleButton3 = () => {
    console.log('Botón 3 presionado');
  };

  return (
    <div className="header">
      <button className="button" onClick={handleButton1}>{t('button1')}</button>
      <button className="button" onClick={handleButton2}>{t('button2')}</button>
      <button className="button" onClick={handleButton3}>{t('button3')}</button>
    </div>
  );
};

export default Header;