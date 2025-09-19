// frontend/src/components/hotel/HotelDetail.jsx
import React, { useState } from 'react';
import axios from 'axios';

const HotelDetail = ({ hotel, onUpdate, onDelete, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(hotel);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/hotel/${hotel.id}`, formData);
      setMessage('Hotel actualizado con exito!');
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      setMessage('Error al actualizar el hotel.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estas seguro de que quieres eliminar este hotel?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/hotel/${hotel.id}`);
        setMessage('Hotel eliminado con exito!');
        onDelete();
      } catch (err) {
        setMessage('Error al eliminar el hotel.');
        console.error(err);
      }
    }
  };

  return (
    <div className="detail-container">
      <button onClick={onBack}>Volver a la lista</button>
      <h2>Detalles de {hotel.nombre}</h2>
      
      {message && <p className="status-message">{message}</p>}

      {!isEditing ? (
        <div>
          <p><strong>Direccion:</strong> {hotel.direccion}</p>
          <p><strong>Teléfono:</strong> {hotel.telefono}</p>
          <p><strong>Correo:</strong> {hotel.correo}</p>
          <p><strong>Ubicación Geográfica:</strong> {hotel.ubicacion_geografica}</p>
          <p><strong>Descripción de Servicios:</strong> {hotel.descripcion_servicios}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <h3>Editar Hotel</h3>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
          {/* ... (agrega los otros campos de input aquí) ... */}
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default HotelDetail;