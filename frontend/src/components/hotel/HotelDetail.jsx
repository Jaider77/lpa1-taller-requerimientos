// frontend/src/components/hotel/HotelDetail.jsx

import React from 'react';

const HotelDetail = ({ hotel, onUpdate, onDelete, onBack }) => {
  if (!hotel) {
    return <div>Selecciona un hotel para ver los detalles.</div>;
  }

  // Si tienes más datos en tu backend (teléfono, correo, etc.),
  // puedes agregarlos aquí para mostrarlos.
  const { id, nombre, direccion, imagen } = hotel;

  const handleDelete = async () => {
    // Lógica para eliminar el hotel...
    onDelete();
  };

  return (
    <div className="detail-container">
      <h2>Detalles de {nombre}</h2>
      
      {/* Sección para mostrar la imagen del hotel */}
      {imagen && (
        <img 
          src={`/images/static/${imagen}`} 
          alt={nombre} 
          className="hotel-image-detail"
        />
      )}
      
      <p><strong>Dirección:</strong> {direccion}</p>
      
      {/* Si tu backend o lista de hoteles tuviera más datos,
          los mostrarías aquí, por ejemplo:
      <p><strong>Teléfono:</strong> {hotel.telefono}</p>
      <p><strong>Correo:</strong> {hotel.correo}</p>
      <p><strong>Descripción:</strong> {hotel.descripcion}</p> */}

      <div className="button-group">
        <button onClick={() => onBack()}>Volver a la lista</button>
        <button onClick={() => alert('Función de edición aún no implementada')}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default HotelDetail;