import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from './HotelForm'; // Importa el nuevo componente
import './App.css';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHoteles = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/hoteles')
      .then(response => {
        setHoteles(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Hubo un error al cargar los hoteles.");
        setLoading(false);
        console.error("Error en la petición:", err);
      });
  };

  useEffect(() => {
    fetchHoteles(); // Llama a la función de carga inicial
  }, []);

  if (loading) {
    return <div>Cargando hoteles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Hoteles</h1>
      </header>
      <main>
        {/* Renderiza el formulario */}
        <HotelForm onHotelAdded={fetchHoteles} />
        
        {/* Renderiza la lista de hoteles */}
        <h2>Lista de Hoteles</h2>
        {hoteles.length === 0 ? (
          <p>No se encontraron hoteles.</p>
        ) : (
          <ul className="hotel-list">
            {hoteles.map(hotel => (
              <li key={hotel.id} className="hotel-item">
                <h2>{hotel.nombre}</h2>
                <p>Dirección: {hotel.direccion}</p>
                <p>Teléfono: {hotel.telefono}</p>
                <p>Correo: {hotel.correo}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;