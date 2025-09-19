// frontend/src/components/cliente/ClienteDetail.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ClienteDetail = ({ cliente, onUpdate, onDelete, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cliente);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/cliente/${cliente.id}`, formData);
      setMessage('Cliente actualizado con éxito!');
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      setMessage('Error al actualizar el cliente.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este cliente?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/cliente/${cliente.id}`);
        setMessage('Cliente eliminado con éxito!');
        onDelete();
      } catch (err) {
        setMessage('Error al eliminar el cliente.');
        console.error(err);
      }
    }
  };

  return (
    <div className="detail-container">
      <button onClick={onBack}>Volver a la lista</button>
      <h2>Detalles de {cliente.nombre_completo}</h2>
      
      {message && <p className="status-message">{message}</p>}

      {!isEditing ? (
        <div>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <p><strong>Correo:</strong> {cliente.correo}</p>
          <p><strong>Dirección:</strong> {cliente.direccion}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <h3>Editar Cliente</h3>
          <div className="form-group">
            <label>Nombre:</label>
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
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default ClienteDetail;