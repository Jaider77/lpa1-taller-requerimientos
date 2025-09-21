// frontend/src/components/hotel/HotelForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const HotelForm = ({ onHotelAdded }) => {
  // Estado para controlar la visibilidad del formulario
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/hoteles', formData);
      setMessage('Hotel agregado con éxito.');
      setFormData({ nombre: '', direccion: '' });
      onHotelAdded();
    } catch (error) {
      setMessage('Error al agregar el hotel.');
      console.error("Error al agregar hotel:", error);
    }
  };

  return (
    <div className="form-toggle-container">
      {/* Botón para alternar la visibilidad del formulario */}
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Formulario' : 'Crear Nuevo Hotel'}
      </button>

      {/* El formulario solo se renderiza si 'isOpen' es verdadero */}
      {isOpen && (
        <div className="form-container compact-form">
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
            <button type="submit">Crear Hotel</button>
          </form>
          {message && <p className="success-message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default HotelForm;