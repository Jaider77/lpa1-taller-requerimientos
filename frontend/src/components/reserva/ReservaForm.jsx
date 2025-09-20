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
  const [hoteles, setHoteles] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const clientesRes = await axios.get('http://127.0.0.1:5000/clientes');
        const hotelesRes = await axios.get('http://127.0.0.1:5000/hoteles');
        setClientes(clientesRes.data);
        setHoteles(hotelesRes.data);
      } catch (err) {
        setError('Error al cargar clientes y hoteles.');
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  const fetchHabitacionesPorHotel = async (hotelId) => {
    try {
      if (hotelId) {
        const habitacionesRes = await axios.get(`http://127.0.0.1:5000/hoteles/${hotelId}/habitaciones`);
        setHabitaciones(habitacionesRes.data);
      } else {
        setHabitaciones([]); // Limpiar la lista si no hay hotel seleccionado
      }
    } catch (err) {
      setError('Error al cargar las habitaciones del hotel seleccionado.');
      console.error(err);
    }
  };

  const handleHotelChange = (e) => {
    const hotelId = e.target.value;
    setSelectedHotelId(hotelId);
    setFormData({ ...formData, habitacion_id: '' }); // Limpiar la habitación al cambiar de hotel
    fetchHabitacionesPorHotel(hotelId);
  };

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
      setSelectedHotelId('');
      setHabitaciones([]);
      onReservaAdded();
    } catch (err) {
      setError('Error al crear la reserva. Asegúrate de que los datos sean correctos.');
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
          <label>Hotel:</label>
          <select name="hotel" value={selectedHotelId} onChange={handleHotelChange} required>
            <option value="">Selecciona un hotel</option>
            {hoteles.map(hotel => (
              <option key={hotel.id} value={hotel.id}>{hotel.nombre}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Habitación:</label>
          <select name="habitacion_id" value={formData.habitacion_id} onChange={handleChange} required disabled={!selectedHotelId}>
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