// frontend/src/components/hotel/HotelList.jsx
// ESTE COMPONENTE AHORA SOLO MUESTRA HOTELES (no destinos)

import React from 'react';

// Datos de hoteles organizados por destino
const HOTELES_POR_DESTINO = [
    // --- Hoteles de Aruba ---
    { id: 101, nombre: 'Aruba Breeze Hotel', destino: 'Aruba', habitaciones_disponibles: 15, imagen: 'aruba_breeze.jpg' },
    { id: 102, nombre: 'The Palm Paradise', destino: 'Aruba', habitaciones_disponibles: 5, imagen: 'palm_paradise.jpg' },
    
    // --- Hoteles de Cancún ---
    { id: 301, nombre: 'Sunrise Resort Cancún', destino: 'Cancún', habitaciones_disponibles: 30, imagen: 'cancun_sunrise.jpg' },
    { id: 302, nombre: 'Mayan Luxury', destino: 'Cancún', habitaciones_disponibles: 0, imagen: 'cancun_mayan.jpg' }, // Ejemplo sin habitaciones
    
    // --- Hoteles de Madrid ---
    { id: 601, nombre: 'Central Suites Madrid', destino: 'Madrid', habitaciones_disponibles: 8, imagen: 'madrid_suites.jpg' },
    { id: 602, nombre: 'Hostal Puerta del Sol', destino: 'Madrid', habitaciones_disponibles: 22, imagen: 'madrid_hostal.jpg' },
    
    // Agrega más hoteles para el resto de tus destinos según los necesites...
];

const HotelList = ({ destinoSeleccionado, onSelectHotel }) => {
  
  // Filtramos la lista de hoteles solo para el destino que el usuario seleccionó
  const hotelesFiltrados = HOTELES_POR_DESTINO.filter(h => h.destino === destinoSeleccionado);

  return (
    <div className="list-container">
      <div className="hotel-list">
        {hotelesFiltrados.length === 0 ? (
          <p>Aún no hay hoteles cargados para el destino: {destinoSeleccionado}</p>
        ) : (
          hotelesFiltrados.map(hotel => (
            <div 
              key={hotel.id} 
              className="hotel-card" 
              onClick={() => onSelectHotel(hotel)}
            >
              <img 
                src={`/images/static/${hotel.imagen}`} 
                alt={hotel.nombre} 
                className="hotel-image" 
              />
              <div className="hotel-card-info">
                <h3>{hotel.nombre}</h3>
                
                {/* Habitaciones Disponibles */}
                <p className="rooms-info">
                  <i className="bi bi-door-open-fill"></i> Habitaciones disponibles: 
                  <span className={hotel.habitaciones_disponibles > 0 ? 'available' : 'unavailable'}>
                    {hotel.habitaciones_disponibles}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelList;