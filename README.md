# Veterinaria ESIS

Veterinaria ESIS es una aplicación de gestión para clínicas veterinarias, que permite administrar la información de los pacientes, el inventario de productos, y el control de las citas médicas. Está diseñada para facilitar la atención de los clientes y optimizar los procesos de una clínica veterinaria.

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tuusuario/veterinaria-esis-main.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd veterinaria-esis-main
   ```

3. Instala las dependencias para el backend y frontend:
   ```bash
   # Para instalar dependencias de backend
   cd backend
   npm install

   # Para instalar dependencias de frontend
   cd ../frontend
   npm install
   ```

4. Configura las variables de entorno necesarias:
   Crea un archivo `.env` en la raíz del proyecto y agrega las variables requeridas.

   **Ejemplo de `.env`:**
   ```bash
   DATABASE_URL=tu_url_de_base_de_datos
   API_KEY=tu_clave_api
   ```

5. Ejecuta el proyecto en modo desarrollo:
   ```bash
   # Para ejecutar el backend
   cd backend
   npm start

   # Para ejecutar el frontend
   cd ../frontend
   npm start
   ```

El servidor estará ejecutándose en `http://localhost:3000` para el frontend y en `http://localhost:5000` para el backend.

## Uso

Una vez que el proyecto esté en ejecución, abre tu navegador y accede a la siguiente URL:
[http://localhost:3000](http://localhost:3000)

**Características principales:**
- Gestión de pacientes veterinarios
- Control de inventario de medicamentos y productos
- Gestión de citas médicas y seguimiento de tratamientos

Para crear una cita, ve al menú "Citas", selecciona un paciente, elige el veterinario y la fecha, y haz clic en "Crear Cita".

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: el **backend** y el **frontend**. A continuación, se describe la estructura de cada parte:

- `backend/` - Código del servidor y la API
  - `src/` - Archivos fuente del backend
  - `controllers/` - Controladores para manejar las solicitudes HTTP
  - `models/` - Modelos de datos y lógica de la base de datos
  - `config/` - Archivos de configuración y variables de entorno

- `frontend/` - Código del cliente (interfaz de usuario)
  - `src/` - Archivos fuente del frontend
  - `components/` - Componentes reutilizables de la UI
  - `pages/` - Páginas principales de la aplicación
  - `assets/` - Imágenes y archivos estáticos


## Contribuir

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b nueva-rama
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Descripción de los cambios.
   ```
4. Envía tus cambios a tu repositorio remoto:
   ```bash
   git push origin nueva-rama
   ```
5. Crea un **pull request** en GitHub para que podamos revisar tus cambios y fusionarlos con la rama principal.