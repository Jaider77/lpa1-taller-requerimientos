# Sistema de Gestión de Reservas de Hotel - Frontend (React)

Este es el frontend de la aplicación de gestión de reservas, construido con React. Su principal función es proporcionar la interfaz de usuario, gestionar la lógica de selección en cascada (Destino > Hotel > Habitación) y comunicar los datos con la API REST de Flask.

🚀 Tecnologías Principales
Tecnología	Rol
React	Biblioteca principal para construir la interfaz de usuario (SPA).
React Hooks	Manejo del estado (useState) y la lógica de efectos secundarios (useEffect).
Axios	Cliente HTTP ligero para realizar peticiones asíncronas a la API de Flask.
Prerrequisitos

Node.js (incluye npm)

Backend de Flask corriendo en http://127.0.0.1:5000 con endpoints de cascada implementados

Pasos de Instalación

## Navegar al directorio del frontend
cd frontend

## Instalar dependencias
npm install

## Ejecución

npm run dev

La aplicación estará disponible en tu navegador en http://localhost:3000.

## Estructura del Proyecto

Tu proyecto sigue una estructura modular clara, organizando los componentes por entidad y una sección para activos y estilos comunes.

frontend/
├── node_modules/           # Módulos instalados por npm
├── public/                 # Archivos estáticos (index.html, favicon, etc.)
├── src/                    # Código fuente de la aplicación
│   ├── assets/             # Activos generales (imágenes, iconos, etc.)
│   ├── common/             # Componentes o estilos compartidos
│   │   ├── Header.css
│   │   └── Header.jsx
│   ├── components/
│   │   ├── cliente/
│   │   │   ├── ClienteDetail.jsx
│   │   │   ├── ClienteForm.jsx
│   │   │   └── ClienteList.jsx
│   │   ├── hotel/
│   │   │   ├── DestinationList.jsx
│   │   │   ├── HotelDetail.jsx
│   │   │   ├── HotelForm.jsx
│   │   │   └── HotelList.jsx
│   │   └── reserva/
│   │       ├── ReservaDetail.jsx
│   │       ├── ReservaForm.jsx   # 🔥 Componente clave con lógica de cascada
│   │       └── ReservaList.jsx
│   ├── Home.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── package.json

# Flujo de Datos y Lógica de Cascada

El componente ReservaForm.jsx es el corazón de la interacción para crear reservas, utilizando useEffect para implementar una selección en cascada que guía al usuario por un flujo lógico dependiente de datos.

Proceso de Selección

| Cliente

| ReservaForm.jsx (Carga inicial) | GET /clientes | | Destino

| ReservaForm.jsx (Carga inicial) | GET /destinos | | Hotel

| Cambio en formData.destino | GET /hoteles/por_destino/<destino> | | Habitación

| Cambio en formData.hotel_id | GET /habitaciones/por_hotel/<hotel_id> | La petición final para crear la reserva se realiza al endpoint:

POST /reserva

Enviando los IDs de Cliente y Habitación seleccionados, junto con las fechas de entrada/salida y el precio total.

🔁 Reseteo en Cascada

El manejador handleChange en ReservaForm.jsx implementa una lógica de reseteo para asegurar coherencia:

Si el usuario selecciona un nuevo Destino, se limpian los campos de Hotel y Habitación.

Si el usuario selecciona un nuevo Hotel, se limpia el campo de Habitación.

Este flujo garantiza una experiencia de usuario fluida, minimizando errores en la selección de datos.