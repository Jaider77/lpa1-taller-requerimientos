import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from './components/hotel/HotelForm'; // Nueva ruta
import HotelList from './components/hotel/HotelList'; // Nueva ruta
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
    fetchHoteles();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
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
        <HotelForm onHotelAdded={fetchHoteles} />
        <HotelList hoteles={hoteles} />
      </main>
    </div>
  );
}

export default App;