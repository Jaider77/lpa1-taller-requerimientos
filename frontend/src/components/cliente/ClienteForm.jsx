// frontend/src/components/client/ClientForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// Recibe la función 'onClientAdded' como una prop
const ClientForm = ({ onClientAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre_completo: '',
    telefono: '',
    correo: '',
    direccion: '',
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
      setFormData({ nombre_completo: '', telefono: '', correo: '', direccion: '' });
      
      // Llama a la función que se le pasó como prop
      onClientAdded(); 

    } catch (error) {
      setMessage('Error al agregar el cliente.');
      console.error("Error al agregar cliente:", error);
    }
  };

  return (
    <div className="form-toggle-container">
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Formulario' : 'Crear Nuevo Cliente'}
      </button>

      {isOpen && (
        <div className="form-container compact-form">
          <h2>Agregar Nuevo Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre Completo:</label>
              <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />
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
              <label>Dirección:</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
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