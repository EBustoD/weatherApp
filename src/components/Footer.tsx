// Archivo: src/components/Footer.tsx
// Este componente muestra un footer de ancho completo con íconos de LinkedIn y GitHub.

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a
        href="https://www.linkedin.com/in/ekaitz-busto-ruiz-de-gordoa-138b07234/" // Reemplaza con tu URL de LinkedIn
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <svg className="footer-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>LinkedIn</title>
          <path d="M20.447 20.452H17.4v-5.569c0-1.327-.027-3.036-1.851-3.036-1.853 0-2.137 1.445-2.137 2.939v5.666H10.367V9h2.945v1.561h.042c.41-.775 1.412-1.59 2.903-1.59 3.105 0 3.675 2.043 3.675 4.699v6.782zM5.337 7.433c-.95 0-1.722-.773-1.722-1.724 0-.95.773-1.722 1.722-1.722.95 0 1.723.773 1.723 1.722 0 .951-.773 1.724-1.723 1.724zm1.468 13.019H3.87V9h3.935v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.229.792 24 1.771 24h20.451C23.205 24 24 23.229 24 22.277V1.723C24 .771 23.205 0 22.225 0z" />
        </svg>
      </a>
      <a
        href="https://github.com/EBustoD/" // Reemplaza con tu URL de GitHub
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <svg className="footer-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.38-1.333-1.75-1.333-1.75-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.304 3.495.997.108-.776.418-1.304.762-1.604-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.604-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
