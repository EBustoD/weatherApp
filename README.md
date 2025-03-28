# Weather App - Aplicación del Clima

Una **aplicación del clima** construida con React y Vite, optimizada para dispositivos móviles y con diseño responsivo para PC. La aplicación utiliza la API de OpenWeatherMap para obtener el clima actual y la previsión, y la API de GeoDB Cities para sugerir ciudades basadas en la ubicación del usuario. También incluye soporte para internacionalización (i18n) y un footer con enlaces a LinkedIn y GitHub.

## Características

- **Clima Actual:**  
  Muestra la ciudad, temperatura, descripción y un ícono representativo del clima actual.

- **Previsión:**  
  Muestra una previsión de 5 días. En móviles se visualiza en una cuadrícula 2×2 y en PC se muestra en una fila horizontal que se adapta al ancho de la pantalla.

- **Búsqueda de Ciudades:**  
  Permite buscar el clima de una ciudad con sugerencias ordenadas por proximidad (usando geolocalización y la API de GeoDB Cities).

- **Footer:**  
  Incluye íconos de LinkedIn y GitHub con animaciones de hover, extendiéndose a lo ancho del viewport.

- **Internacionalización:**  
  Soporte para múltiples idiomas mediante *react-i18next*.

- **Diseño Responsivo:**  
  Optimizado para móviles y escritorios con CSS Grid y Flexbox.

## Tecnologías Utilizadas

- **React** y **TypeScript**
- **Vite**
- **react-i18next** para internacionalización
- **OpenWeatherMap API** para datos del clima
- **GeoDB Cities API** para sugerencias de ciudades
- **CSS Flexbox & Grid** para diseño responsivo

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes líneas (reemplaza los valores con tus claves reales):

   ```env
   VITE_OPENWEATHERMAP_API_KEY=tu_clave_de_openweathermap
   VITE_RAPIDAPI_KEY=tu_clave_de_rapidapi
   VITE_RAPIDAPI_HOST=wft-geo-db.p.rapidapi.com
   ```

4. **Iniciar la aplicación en modo desarrollo:**

   ```bash
   npm run dev
   ```

   La aplicación se abrirá, por ejemplo, en [http://localhost:5173](http://localhost:5173).

## Uso

- **Clima Actual:**  
  Al cargar la aplicación, se muestra el clima basado en la geolocalización del usuario.

- **Búsqueda:**  
  Usa la barra de búsqueda para consultar el clima en otra ciudad. A medida que escribes, aparecerán sugerencias basadas en la proximidad si la geolocalización está habilitada.

- **Previsión:**  
  La previsión de 5 días se muestra debajo del clima actual, adaptándose a la pantalla (cuadrícula en móviles y fila horizontal en PC).


