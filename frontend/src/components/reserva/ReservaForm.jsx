// frontend/src/components/reserva/ReservaForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = ({ onReservationAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [hoteles, setHoteles] = useState([]); 
  // NUEVO ESTADO: Lista de habitaciones disponibles para el hotel seleccionado
  const [habitaciones, setHabitaciones] = useState([]); 
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoadingHabitaciones, setIsLoadingHabitaciones] = useState(false);


  const [formData, setFormData] = useState({
    cliente_id: '', 
    hotel_id: '', // Se usa para filtrar las habitaciones
    habitacion_id: '', // Es lo que el backend realmente necesita
    fecha_entrada: '',
    fecha_salida: '',
    precio_total: '', 
  });

  // 1. CARGA INICIAL DE CLIENTES Y HOTELES
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Cargar Clientes
        const clientesRes = await axios.get('http://127.0.0.1:5000/clientes'); 
        setClientes(clientesRes.data);
        // Cargar Hoteles
        const hotelesRes = await axios.get('http://127.0.0.1:5000/hoteles'); 
        setHoteles(hotelesRes.data);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        setMessage("Error al cargar clientes u hoteles disponibles.");
        setIsError(true);
      }
    };
    fetchInitialData();
  }, []);


  // 2. EFECTO PARA CARGAR HABITACIONES CUANDO CAMBIA EL HOTEL
  useEffect(() => {
    if (!formData.hotel_id) {
      setHabitaciones([]); // Limpiar habitaciones si no hay hotel seleccionado
      return;
    }
    
    const fetchHabitaciones = async () => {
      setIsLoadingHabitaciones(true);
      setHabitaciones([]); // Limpiar la lista antes de cargar la nueva
      
      try {
        // Endpoint que trae todas las habitaciones
        const response = await axios.get('http://127.0.0.1:5000/habitaciones');
        
        // FILTRO: Filtrar las habitaciones por el hotel_id seleccionado
        const habitacionesFiltradas = response.data.filter(
          (h) => h.hotel_id === parseInt(formData.hotel_id)
        );
        
        setHabitaciones(habitacionesFiltradas);
      } catch (error) {
        console.error("Error al cargar las habitaciones:", error);
        setMessage("Error al cargar las habitaciones para el hotel seleccionado.");
        setIsError(true);
      } finally {
        setIsLoadingHabitaciones(false);
      }
    };

    fetchHabitaciones();
    
  }, [formData.hotel_id]); // Dependencia: se ejecuta CADA VEZ que hotel_id cambia


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    
    // Verificación de datos críticos (Añadimos habitacion_id a la verificación)
    if (!formData.cliente_id || !formData.hotel_id || !formData.habitacion_id || !formData.fecha_entrada || !formData.fecha_salida) {
        setMessage("Faltan datos obligatorios (Cliente, Hotel, Habitación, Fechas).");
        setIsError(true);
        return;
    }

    try {
      const dataToSend = {
          cliente_id: parseInt(formData.cliente_id), 
          habitacion_id: parseInt(formData.habitacion_id), // Enviamos el ID de la habitación
          fecha_entrada: formData.fecha_entrada, 
          fecha_salida: formData.fecha_salida, 
          precio_total: parseFloat(formData.precio_total) 
      }

      await axios.post('http://127.0.0.1:5000/reserva', dataToSend);
      
      setMessage("Reserva creada exitosamente.");
      setIsError(false);
    
      // Limpiar formulario
      setFormData({
        cliente_id: '', hotel_id: '', habitacion_id: '', fecha_entrada: '', fecha_salida: '', precio_total: ''
      });
      setHabitaciones([]); // También limpiamos las habitaciones cargadas
      
      onReservationAdded(); 
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      const errorMsg = error.response?.data?.error || "Error desconocido al crear la reserva. Revise el servidor.";
      setMessage(errorMsg);
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
        
      // LÓGICA DE RESETEO: Si el hotel cambia, resetea la habitación seleccionada
      if (name === 'hotel_id') {
        newData.habitacion_id = '';
      }
      return newData;
    });
  };


  return (
    <div className="form-toggle-container">
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Formulario' : 'Crear Nueva Reserva'}
      </button>

      {message && (
        <p className={isError ? 'error-message' : 'success-message'}>
          {message}
        </p>
      )}
      
      {isOpen && (
        <div className="form-container compact-form">
          <h2>Crear Nueva Reserva</h2>
          <form onSubmit={handleSubmit}>
              {/* 1. SELECCIÓN DE CLIENTE */}
            <div className="form-group">
              <label>Cliente:</label>
              <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
                <option value="">-- Seleccione un Cliente --</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>{cliente.nombre_completo}</option>
                ))}
              </select>
            </div>
            
              {/* 2. SELECCIÓN DE HOTEL */}
            <div className="form-group">
              <label>Hotel:</label>
              <select name="hotel_id" value={formData.hotel_id} onChange={handleChange} required>
                <option value="">-- Seleccione un Hotel --</option>
                {hoteles.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>{hotel.nombre}</option>
                ))}
              </select>
            </div>
            
              {/* 3. SELECCIÓN DE HABITACIÓN (DEPENDIENTE DEL HOTEL) */}
            <div className="form-group">
              <label>Habitación:</label>
              <select 
                  name="habitacion_id" 
                  value={formData.habitacion_id} 
                  onChange={handleChange} 
                  required
                  disabled={!formData.hotel_id || isLoadingHabitaciones} // Desactivado si no hay hotel o está cargando
              >
                <option value="">
                  {isLoadingHabitaciones 
                      ? 'Cargando habitaciones...' 
                      : formData.hotel_id 
                      ? '-- Seleccione Habitación --' 
                      : 'Seleccione un Hotel primero'
                  }
                </option>
                {habitaciones.map((habitacion) => (
                  <option key={habitacion.id} value={habitacion.id}>
                    {`ID: ${habitacion.id} | Tipo: ${habitacion.tipo} | Precio: ${habitacion.precio_base}`}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Campos de Fechas y Precio Total */}
            <div className="form-group">
              <label>Fecha de Entrada:</label>
              <input type="date" name="fecha_entrada" value={formData.fecha_entrada} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label>Fecha de Salida:</label>
              <input type="date" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label>Precio Total:</label>
              <input type="number" name="precio_total" value={formData.precio_total} onChange={handleChange} required/>
            </div>
            
            <button type="submit">Crear Reserva</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;