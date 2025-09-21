// frontend/src/components/hotel/HotelList.jsx

import React from 'react';

const HotelList = ({ onSelectHotel }) => {
  // Datos de hoteles con la ruta de la imagen
   const hoteles = [
    { id: 1, nombre: 'Hotel El Paraíso de Aruba', direccion: 'Palm Beach, Aruba', imagen: 'aruba.png' },
    { id: 2, nombre: 'Resort de las Bahamas', direccion: 'Paradise Island, Bahamas', imagen: 'bahamas.png' },
    { id: 3, nombre: 'Cancún Sol', direccion: 'Avenida Sol Naciente, Cancún, México', imagen: 'cancun.png' },
    { id: 4, nombre: 'Paraíso Hawaiano', direccion: 'Oahu, Hawái, Estados Unidos', imagen: 'hawaii.png' },
    { id: 5, nombre: 'Jamaica Dreams', direccion: 'Negril, Jamaica', imagen: 'jamaica.png' },
    { id: 6, nombre: 'Hotel Madrid Real', direccion: 'Calle Mayor, 10, Madrid, España', imagen: 'madrid.png' },
    { id: 7, nombre: 'Resort Miami', direccion: 'Ocean Drive, Miami Beach, Florida', imagen: 'miami.png' },
    { id: 8, nombre: 'Hotel Moscu', direccion: 'Plaza Roja, Moscu, Rusia', imagen: 'moscu.png' },
    { id: 9, nombre: 'New York Skyline View', direccion: 'Manhattan, Nueva York, Estados Unidos', imagen: 'newyork.png' },
    { id: 10, nombre: 'Hotel Panamá', direccion: 'Panamá, Panamá', imagen: 'panama.png' },
    { id: 11, nombre: 'Hotel La Vie en París', direccion: '10 Rue de la Paix, París, Francia', imagen: 'paris.png' },
    { id: 12, nombre: 'El Coliseo Romano', direccion: 'Piazza del Colosseo, 1, Roma, Italia', imagen: 'rome.png' },
    { id: 13, nombre: 'Seoul Dream', direccion: 'Gangnam-gu, Seúl, Corea del Sur', imagen: 'seul.png' },
    { id: 14, nombre: 'Hotel de Sidney', direccion: 'Circular Quay, Sídney, Australia', imagen: 'sidney.png' },
    { id: 15, nombre: 'Tokyo Skyline View', direccion: 'Shinjuku, Tokio, Japón', imagen: 'tokio.png' },
    { id: 16, nombre: 'Taipei Nights', direccion: 'Distrito de Xinyi, Taipéi, Taiwán', imagen: 'taipei.png' },
  ];

  return (
    <div className="list-container">
      <h2>Lista de Hoteles</h2>
      <div className="hotel-list">
        {hoteles.map(hotel => (
          <div key={hotel.id} className="hotel-card" onClick={() => onSelectHotel(hotel)}>
            <img src={`/images/static/${hotel.imagen}`} alt={hotel.nombre} />
            <div className="hotel-card-info">
              <h3>{hotel.nombre}</h3>
              <p>{hotel.direccion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;