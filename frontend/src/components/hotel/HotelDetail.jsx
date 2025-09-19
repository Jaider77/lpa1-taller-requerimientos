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
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Correo:</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Ubicación:</label>
            <input type="text" name="ubicacion_geografica" value={formData.ubicacion_geografica} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea name="descripcion_servicios" value={formData.descripcion_servicios} onChange={handleChange} />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default HotelDetail;