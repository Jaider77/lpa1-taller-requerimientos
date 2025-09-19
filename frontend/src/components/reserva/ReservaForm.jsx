// frontend/src/components/reserva/ReservaForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservaForm = ({ onReservaAdded }) => {
  const [formData, setFormData] = useState({
    cliente_id: '',
    habitacion_id: '',
    fecha_entrada: '',
    fecha_salida: '',
    precio_total: ''
  });
  const [clientes, setClientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const clientesRes = await axios.get('http://127.0.0.1:5000/clientes');
        const habitacionesRes = await axios.get('http://127.0.0.1:5000/habitaciones');
        setClientes(clientesRes.data);
        setHabitaciones(habitacionesRes.data);
      } catch (err) {
        setError('Error al cargar clientes y habitaciones.');
        console.error(err);
      }
    };
    fetchDependencies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/reserva', formData);
      setMessage(response.data.mensaje);
      setError('');
      setFormData({
        cliente_id: '',
        habitacion_id: '',
        fecha_entrada: '',
        fecha_salida: '',
        precio_total: ''
      });
      onReservaAdded();
    } catch (err) {
      setError('Error al crear la reserva. Asegúrate de que los IDs existan.');
      setMessage('');
      console.error('Error en la petición:', err.response.data.error || err);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nueva Reserva</h2>
      <form onSubmit={handleSubmit}>
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
                Tipo: {habitacion.tipo} - Precio: ${habitacion.precio_base}
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
        <button type="submit">Crear Reserva</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ReservaForm;