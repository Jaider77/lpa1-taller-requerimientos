// frontend/src/components/hotel/HotelList.jsx

import React from 'react';

const HotelList = ({ hoteles, onSelectHotel }) => {
  return (
    <div>
      <h2>Lista de Hoteles</h2>
      {hoteles.length === 0 ? (
        <p>No se encontraron hoteles.</p>
      ) : (
        <ul className="hotel-list">
          {hoteles.map(hotel => (
            <li key={hotel.id} className="hotel-item">
              <button onClick={() => onSelectHotel(hotel)}>
                <h3>{hotel.nombre}</h3>
                <p>Dirección: {hotel.direccion}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelList;