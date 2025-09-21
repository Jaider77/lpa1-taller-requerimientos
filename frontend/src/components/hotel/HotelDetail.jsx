// frontend/src/components/hotel/HotelDetail.jsx

import React from 'react';

const HotelDetail = ({ hotel, onUpdate, onDelete, onBack }) => {
  // Función de manejo de la eliminación
  const handleDelete = () => {
    // Aquí iría la lógica para eliminar el hotel de la base de datos
    onDelete();
  };

  return (
    <div className="detail-container">
      <button onClick={onBack}>Volver a la lista</button>
      
      <h2>Detalles de {hotel.nombre}</h2>
      {/* Muestra la imagen */}
      <img 
        src={`/images/${hotel.imagen}`} 
        alt={hotel.nombre} 
        className="hotel-image-detail"
      />
      
      <p><strong>Dirección:</strong> {hotel.direccion}</p>
      {/* Puedes añadir más detalles aquí si los necesitas en el futuro */}
      
      <div className="detail-actions">
        <button onClick={onUpdate}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default HotelDetail;