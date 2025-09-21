// frontend/src/components/hotel/HotelList.jsx

import React from 'react';

const HotelList = ({ hoteles, onSelectHotel }) => {
  // Maneja el caso en que la lista de hoteles esté vacía o no se haya cargado.
  // Es una buena práctica de programación defensiva para evitar errores.
  if (!hoteles || hoteles.length === 0) {
    return (
      <div className="list-container">
        <h2>Lista de Hoteles</h2>
        <p>No hay hoteles disponibles en este momento. Intenta crear uno.</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>Lista de Hoteles</h2>
      <div className="hotel-list">
        {hoteles.map(hotel => (
          <div key={hotel.id} className="hotel-card" onClick={() => onSelectHotel(hotel)}>
            {/* Si el objeto hotel tiene una propiedad 'imagen', se muestra la imagen.
                La ruta de la imagen se construye dinámicamente. */}
            {hotel.imagen && (
              <img 
                src={`/images/static/${hotel.imagen}`} 
                alt={hotel.nombre} 
              />
            )}
            <div className="hotel-card-info">
              <h3>{hotel.nombre}</h3>
              <p>Dirección: {hotel.direccion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;