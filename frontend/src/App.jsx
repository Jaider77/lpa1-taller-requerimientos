// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from './components/hotel/HotelForm';
import HotelList from './components/hotel/HotelList';
import HotelDetail from './components/hotel/HotelDetail';
import ClienteForm from './components/cliente/ClienteForm';
import ClienteList from './components/cliente/ClienteList';
import ReservaForm from './components/reserva/ReservaForm';
import ReservaList from './components/reserva/ReservaList';
import './App.css';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
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
        console.error("Error al cargar hoteles:", err);
      });
  };

  const fetchClientes = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/clientes')
      .then(response => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Hubo un error al cargar los clientes.");
        setLoading(false);
        console.error("Error al cargar clientes:", err);
      });
  };

  const fetchReservas = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/reservas')
      .then(response => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Hubo un error al cargar las reservas.");
        setLoading(false);
        console.error("Error al cargar reservas:", err);
      });
  };

  useEffect(() => {
    fetchHoteles();
    fetchClientes();
    fetchReservas();
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
        <h1>Gestión de Hoteles y Clientes</h1>
      </header>
      <main>
        <div className="section">
          <HotelForm onHotelAdded={fetchHoteles} />
          {selectedHotel ? (
            <HotelDetail
              hotel={selectedHotel}
              onUpdate={handleHotelUpdate}
              onDelete={handleHotelDelete}
              onBack={() => setSelectedHotel(null)}
            />
          ) : (
            <HotelList hoteles={hoteles} onSelectHotel={handleSelectHotel} />
          )}
        </div>
        <div className="section">
          <ClienteForm onClienteAdded={fetchClientes} />
          <ClienteList clientes={clientes} />
        </div>
        <div className="section">
          <ReservaForm onReservaAdded={fetchReservas} />
          <ReservaList reservas={reservas} />
        </div>
      </main>
    </div>
  );
}

export default App;