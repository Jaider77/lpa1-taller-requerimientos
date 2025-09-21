// frontend/src/components/client/ClientForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ClientForm = ({ onClientAdded }) => {
  // Estado para controlar la visibilidad del formulario
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    ubicacion: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/clientes', formData);
      setMessage('Cliente agregado con éxito.');
      setFormData({ nombre: '', telefono: '', correo: '', ubicacion: '' });
      onClientAdded(); // Función para refrescar la lista de clientes
    } catch (error) {
      setMessage('Error al agregar el cliente.');
      console.error("Error al agregar cliente:", error);
    }
  };

  return (
    <div className="form-toggle-container">
      {/* Botón para alternar la visibilidad del formulario */}
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Formulario' : 'Crear Nuevo Cliente'}
      </button>

      {/* El formulario solo se renderiza si 'isOpen' es verdadero */}
      {isOpen && (
        <div className="form-container compact-form">
          <h2>Agregar Nuevo Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Correo:</label>
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Ubicación Geográfica:</label>
              <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
            </div>
            <button type="submit">Crear Cliente</button>
          </form>
          {message && <p className="success-message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ClientForm;