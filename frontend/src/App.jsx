// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from './components/hotel/HotelForm';
import HotelList from './components/hotel/HotelList';
import HotelDetail from './components/hotel/HotelDetail'; // Nuevo componente
// ... (otros imports de clientes, reservas, etc.) ...
import './App.css';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // Nuevo estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lógica para cargar hoteles
  const fetchHoteles = () => {
    // ... (la misma lógica de fetch que ya tenías) ...
    setLoading(true);
    axios.get('http://127.0.0.1:5000/hoteles')
      .then(response => {
        setHoteles(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Hubo un error al cargar los hoteles.");
        setLoading(false);
        console.error("Error al cargar hoteles:", err);
      });
  };

  useEffect(() => {
    fetchHoteles();
  }, []);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleHotelUpdate = () => {
    fetchHoteles();
    setSelectedHotel(null);
  };

  const handleHotelDelete = () => {
    fetchHoteles();
    setSelectedHotel(null);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Hoteles</h1>
      </header>
      <main>
        {selectedHotel ? (
          <HotelDetail 
            hotel={selectedHotel} 
            onUpdate={handleHotelUpdate} 
            onDelete={handleHotelDelete}
            onBack={() => setSelectedHotel(null)}
          />
        ) : (
          <>
            <HotelForm onHotelAdded={fetchHoteles} />
            <HotelList hoteles={hoteles} onSelectHotel={handleSelectHotel} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;