// frontend/src/components/reserva/ReservaDetail.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservaDetail = ({ reserva, onUpdate, onDelete, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(reserva);
  const [message, setMessage] = useState('');
  const [clientes, setClientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const clientesRes = await axios.get('http://127.0.0.1:5000/clientes');
        const habitacionesRes = await axios.get('http://127.0.0.1:5000/habitaciones');
        setClientes(clientesRes.data);
        setHabitaciones(habitacionesRes.data);
      } catch (err) {
        setMessage('Error al cargar clientes y habitaciones para la edición.');
        console.error(err);
      }
    };
    fetchDependencies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/reserva/${reserva.id}`, formData);
      setMessage('Reserva actualizada con éxito!');
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      setMessage('Error al actualizar la reserva.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta reserva?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/reserva/${reserva.id}`);
        setMessage('Reserva eliminada con éxito!');
        onDelete();
      } catch (err) {
        setMessage('Error al eliminar la reserva.');
        console.error(err);
      }
    }
  };

  return (
    <div className="detail-container">
      <button onClick={onBack}>Volver a la lista</button>
      <h2>Detalles de la Reserva #{reserva.id}</h2>
      
      {message && <p className="status-message">{message}</p>}

      {!isEditing ? (
        <div>
          <p><strong>ID Cliente:</strong> {reserva.cliente_id}</p>
          <p><strong>ID Habitación:</strong> {reserva.habitacion_id}</p>
          <p><strong>Fecha de Entrada:</strong> {reserva.fecha_entrada}</p>
          <p><strong>Fecha de Salida:</strong> {reserva.fecha_salida}</p>
          <p><strong>Precio Total:</strong> ${reserva.precio_total}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <h3>Editar Reserva</h3>
          <div className="form-group">
            <label>Cliente:</label>
            <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
              <option value="">Selecciona un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nombre_completo}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Habitación:</label>
            <select name="habitacion_id" value={formData.habitacion_id} onChange={handleChange} required>
              <option value="">Selecciona una habitación</option>
              {habitaciones.map(habitacion => (
                <option key={habitacion.id} value={habitacion.id}>
                  ID: {habitacion.id} - Tipo: {habitacion.tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de Entrada:</label>
            <input type="date" name="fecha_entrada" value={formData.fecha_entrada} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fecha de Salida:</label>
            <input type="date" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Precio Total:</label>
            <input type="number" name="precio_total" value={formData.precio_total} onChange={handleChange} required />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default ReservaDetail;