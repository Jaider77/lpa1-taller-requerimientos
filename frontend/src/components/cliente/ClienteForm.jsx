// frontend/src/components/cliente/ClienteForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ClienteForm = ({ onClienteAdded }) => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    telefono: '',
    correo: '',
    direccion: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/cliente', formData);
      setMessage(response.data.mensaje);
      setError('');
      setFormData({
        nombre_completo: '',
        telefono: '',
        correo: '',
        direccion: ''
      });
      onClienteAdded();
    } catch (err) {
      setError('Error al crear el cliente. Verifica que el correo sea único.');
      setMessage('');
      console.error('Error en la petición:', err);
    }
  };

  return (
    <div className="form-container">
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
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>
        <button type="submit">Crear Cliente</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ClienteForm;