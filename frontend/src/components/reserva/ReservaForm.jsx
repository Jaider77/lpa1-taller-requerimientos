// frontend/src/components/reservation/ReservationForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = ({ onReservationAdded }) => {
  // Estado para controlar la visibilidad del formulario
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    cliente: '',
    hotel: '',
    habitacion: '',
    fecha_entrada: '',
    fecha_salida: '',
    precio: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/reservas', formData);
      // Lógica para mostrar mensaje de éxito y limpiar formulario
      setFormData({
        cliente: '', hotel: '', habitacion: '', fecha_entrada: '', fecha_salida: '', precio: ''
      });
      onReservationAdded();
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-toggle-container">
      {/* Botón para alternar la visibilidad del formulario */}
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Formulario' : 'Crear Nueva Reserva'}
      </button>

      {/* El formulario solo se renderiza si 'isOpen' es verdadero */}
      {isOpen && (
        <div className="form-container compact-form">
          <h2>Crear Nueva Reserva</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Cliente:</label>
              <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Hotel:</label>
              <input type="text" name="hotel" value={formData.hotel} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Habitación:</label>
              <input type="text" name="habitacion" value={formData.habitacion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Fecha de Entrada:</label>
              <input type="date" name="fecha_entrada" value={formData.fecha_entrada} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Fecha de Salida:</label>
              <input type="date" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Precio Total:</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange} />
            </div>
            <button type="submit">Crear Reserva</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;