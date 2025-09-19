// frontend/src/components/hotel/HotelForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const HotelForm = ({ onHotelAdded }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    ubicacion_geografica: '',
    descripcion_servicios: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/hotel', formData);
      setMessage(response.data.mensaje);
      setError('');
      setFormData({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
        ubicacion_geografica: '',
        descripcion_servicios: ''
      });
      onHotelAdded();
    } catch (err) {
      setError('Error al crear el hotel. Verifica que los datos sean correctos.');
      setMessage('');
      console.error('Error en la petición:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Hotel</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Ubicación Geográfica:</label>
          <input type="text" name="ubicacion_geografica" value={formData.ubicacion_geografica} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Descripción de Servicios:</label>
          <textarea name="descripcion_servicios" value={formData.descripcion_servicios} onChange={handleChange} />
        </div>
        <button type="submit">Crear Hotel</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default HotelForm;