import React from 'react';

const HotelList = ({ hoteles }) => {
  return (
    <div>
      <h2>Lista de Hoteles</h2>
      {hoteles.length === 0 ? (
        <p>No se encontraron hoteles.</p>
      ) : (
        <ul className="hotel-list">
          {hoteles.map(hotel => (
            <li key={hotel.id} className="hotel-item">
              <h3>{hotel.nombre}</h3>
              <p>Dirección: {hotel.direccion}</p>
              <p>Teléfono: {hotel.telefono}</p>
              <p>Correo: {hotel.correo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelList;