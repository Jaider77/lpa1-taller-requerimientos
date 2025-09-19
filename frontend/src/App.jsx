// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from './components/hotel/HotelForm';
import HotelList from './components/hotel/HotelList';
import HotelDetail from './components/hotel/HotelDetail';
import ClienteForm from './components/cliente/ClienteForm';
import ClienteList from './components/cliente/ClienteList';
import ClienteDetail from './components/cliente/ClienteDetail';
import ReservaForm from './components/reserva/ReservaForm';
import ReservaList from './components/reserva/ReservaList';
import ReservaDetail from './components/reserva/ReservaDetail'; // Importa el nuevo componente
import './App.css';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null); // Nuevo estado
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

  // Handlers para hoteles
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

  // Handlers para clientes
  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
  };
  const handleClienteUpdate = () => {
    fetchClientes();
    setSelectedCliente(null);
  };
  const handleClienteDelete = () => {
    fetchClientes();
    setSelectedCliente(null);
  };

  // Handlers para reservas
  const handleSelectReserva = (reserva) => {
    setSelectedReserva(reserva);
  };
  const handleReservaUpdate = () => {
    fetchReservas();
    setSelectedReserva(null);
  };
  const handleReservaDelete = () => {
    fetchReservas();
    setSelectedReserva(null);
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
        </div>
        <div className="section">
          {selectedCliente ? (
            <ClienteDetail
              cliente={selectedCliente}
              onUpdate={handleClienteUpdate}
              onDelete={handleClienteDelete}
              onBack={() => setSelectedCliente(null)}
            />
          ) : (
            <>
              <ClienteForm onClienteAdded={fetchClientes} />
              <ClienteList clientes={clientes} onSelectCliente={handleSelectCliente} />
            </>
          )}
        </div>
        <div className="section">
          {selectedReserva ? (
            <ReservaDetail
              reserva={selectedReserva}
              onUpdate={handleReservaUpdate}
              onDelete={handleReservaDelete}
              onBack={() => setSelectedReserva(null)}
            />
          ) : (
            <>
              <ReservaForm onReservaAdded={fetchReservas} />
              <ReservaList reservas={reservas} onSelectReserva={handleSelectReserva} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;