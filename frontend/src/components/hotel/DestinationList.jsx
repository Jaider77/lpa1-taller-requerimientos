// frontend/src/components/hotel/DestinationList.jsx

import React from 'react';
// La lista de destinos ahora está cableada aquí, representando los destinos principales.
const DESTINOS = [
  { id: 1, nombre: 'Aruba', imagen: 'aruba.png', descripcion: 'Palm Beach, Aruba' },
  { id: 2, nombre: 'Bahamas', imagen: 'bahamas.png', descripcion: 'Paradise Island, Bahamas' },
  { id: 3, nombre: 'Cancún', imagen: 'cancun.png', descripcion: 'Avenida Sol Naciente, Cancún, México' },
  { id: 4, nombre: 'Hawái', imagen: 'hawaii.png', descripcion: 'Oahu, Hawái, Estados Unidos' },
  { id: 5, nombre: 'Jamaica', imagen: 'jamaica.png', descripcion: 'Negril, Jamaica' },
  { id: 6, nombre: 'Madrid', imagen: 'madrid.png', descripcion: 'Calle Mayor, Madrid, España' },
  { id: 7, nombre: 'Miami', imagen: 'miami.png', descripcion: 'Ocean Drive, Miami Beach, Florida' },
  { id: 8, nombre: 'Moscú', imagen: 'moscu.png', descripcion: 'Plaza Roja, Moscú, Rusia' },
  { id: 9, nombre: 'Nueva York', imagen: 'newyork.png', descripcion: 'Manhattan, Nueva York, Estados Unidos' },
  { id: 10, nombre: 'Panamá', imagen: 'panama.png', descripcion: 'Ciudad de Panamá, Panamá' },
  { id: 11, nombre: 'París', imagen: 'paris.png', descripcion: '10 Rue de la Paix, París, Francia' },
  { id: 12, nombre: 'Roma', imagen: 'rome.png', descripcion: 'Piazza del Colosseo, Roma, Italia' },
  { id: 13, nombre: 'Seúl', imagen: 'seul.png', descripcion: 'Gangnam-gu, Seúl, Corea del Sur' },
  { id: 14, nombre: 'Sídney', imagen: 'sidney.png', descripcion: 'Circular Quay, Sídney, Australia' },
  { id: 15, nombre: 'Tokio', imagen: 'tokio.png', descripcion: 'Shinjuku, Tokio, Japón' },
  { id: 16, nombre: 'Taipéi', imagen: 'taipei.png', descripcion: 'Distrito de Xinyi, Taipéi, Taiwán' },
];

// Recibe la nueva función para seleccionar el destino
const DestinationList = ({ onSelectDestination }) => {
  return (
    <div className="list-container destination-list-view">
      <h2> Elige tu Destino </h2>
      <div className="destination-grid-container">
        {DESTINOS.map(destino => (
          // Al hacer clic, enviamos el nombre del destino
          <div 
            key={destino.id} 
            className="destination-card" 
            onClick={() => onSelectDestination(destino.nombre)}
          >
            {/* Reutilizamos los estilos de imagen de la tarjeta */}
            <img src={`/images/static/${destino.imagen}`} alt={destino.nombre} className="hotel-image"/>
            <div className="hotel-card-info">
              <h3>{destino.nombre}</h3>
              <p>{destino.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exportamos la lista de destinos para usarla en App.jsx
export { DESTINOS };
export default DestinationList;