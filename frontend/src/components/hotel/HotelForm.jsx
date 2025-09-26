// frontend/src/components/hotel/HotelForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
// Como usas App.css globalmente, este import de CSS local no es necesario,
// pero lo dejo si decides crear un archivo específico más tarde.
// import './HotelForm.css'; 

const HotelForm = ({ onHotelAdded }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    ubicacion_geografica: '', // Este campo se usa como DESTINO
    descripcion_servicios: '',
    imagen_url: '', // NUEVO CAMPO: URL de la imagen
    habitaciones_disponibles: 0, // NUEVO CAMPO: Conteo de habitaciones
  });

  const handleChange = (e) => {
    // Maneja números: convierte a entero si es 'habitaciones_disponibles'
    const value = e.target.name === 'habitaciones_disponibles' 
      ? parseInt(e.target.value) || 0 
      : e.target.value;
      
    setFormData({ ...formData, [e.target.name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple para el campo de Destino
    if (!formData.ubicacion_geografica.trim()) {
        alert("El campo 'Destino (Ubicación Geográfica)' es obligatorio.");
        return;
    }

    axios.post('http://127.0.0.1:5000/hoteles', formData)
      .then(() => {
        onHotelAdded();
        // Restablecer el formulario después de la adición
        setFormData({ 
            nombre: '', 
            direccion: '', 
            telefono: '', 
            correo: '', 
            ubicacion_geografica: '', 
            descripcion_servicios: '',
            imagen_url: '', 
            habitaciones_disponibles: 0
        });
        alert("Hotel agregado exitosamente.");
      })
      .catch(error => {
        console.error("Error al agregar hotel:", error);
        alert("Hubo un error al crear el hotel. Verifique la conexión al servidor.");
      });
  };

  return (
    <div className="form-wrapper">
      <h3>Crear Nuevo Hotel / Destino</h3>
      <form onSubmit={handleSubmit} className="form-container">
        
        {/* Campos Existentes */}
        <div className="form-group">
          <label>Nombre del Hotel:</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input 
            type="text" 
            name="direccion" 
            value={formData.direccion} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input 
            type="text" 
            name="telefono" 
            value={formData.telefono} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input 
            type="email" 
            name="correo" 
            value={formData.correo} 
            onChange={handleChange} 
          />
        </div>
        
        {/* CAMPO DESTINO (Ubicación Geográfica) */}
        <div className="form-group">
          <label>Destino (Ubicación Geográfica):</label>
          <input 
            type="text" 
            name="ubicacion_geografica" 
            value={formData.ubicacion_geografica} 
            onChange={handleChange} 
            placeholder="Ej: Aruba, Cancún, etc."
            required 
          />
        </div>

        {/* NUEVO CAMPO: Imagen URL */}
        <div className="form-group">
          <label>Imagen URL:</label>
          <input 
            type="text" 
            name="imagen_url" 
            value={formData.imagen_url} 
            onChange={handleChange} 
            placeholder="http://..."
          />
        </div>

        {/* NUEVO CAMPO: Habitaciones Disponibles */}
        <div className="form-group">
          <label>Habitaciones Disponibles:</label>
          <input 
            type="number" 
            name="habitaciones_disponibles" 
            value={formData.habitaciones_disponibles} 
            onChange={handleChange} 
            min="0"
            required 
          />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}> 
            {/* Ocupa el ancho completo */}
          <label>Descripción de Servicios:</label>
          <textarea 
            name="descripcion_servicios" 
            value={formData.descripcion_servicios} 
            onChange={handleChange} 
          />
        </div>
        
        <button type="submit" style={{ gridColumn: '1 / -1' }}>Crear Hotel</button>
      </form>
    </div>
  );
};

export default HotelForm;