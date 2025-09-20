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
import ReservaDetail from './components/reserva/ReservaDetail';
import Navigation from './components/Navigation'; // Importa el componente de navegación
import './App.css';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [currentView, setCurrentView] = useState('hoteles'); // Nuevo estado para la vista
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHoteles = () => { /* ... (mantén la función sin cambios) ... */ };
  const fetchClientes = () => { /* ... (mantén la función sin cambios) ... */ };
  const fetchReservas = () => { /* ... (mantén la función sin cambios) ... */ };
  
  useEffect(() => {
    fetchHoteles();
    fetchClientes();
    fetchReservas();
  }, []);

  const handleSelectHotel = (hotel) => setSelectedHotel(hotel);
  const handleHotelUpdate = () => { fetchHoteles(); setSelectedHotel(null); };
  const handleHotelDelete = () => { fetchHoteles(); setSelectedHotel(null); };

  const handleSelectCliente = (cliente) => setSelectedCliente(cliente);
  const handleClienteUpdate = () => { fetchClientes(); setSelectedCliente(null); };
  const handleClienteDelete = () => { fetchClientes(); setSelectedCliente(null); };

  const handleSelectReserva = (reserva) => setSelectedReserva(reserva);
  const handleReservaUpdate = () => { fetchReservas(); setSelectedReserva(null); };
  const handleReservaDelete = () => { fetchReservas(); setSelectedReserva(null); };

  // Función para cambiar de vista
  const handleNavigate = (view) => {
    setCurrentView(view);
    // Reinicia las selecciones al cambiar de vista
    setSelectedHotel(null);
    setSelectedCliente(null);
    setSelectedReserva(null);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const renderView = () => {
    switch (currentView) {
      case 'hoteles':
        return selectedHotel ? (
          <HotelDetail hotel={selectedHotel} onUpdate={handleHotelUpdate} onDelete={handleHotelDelete} onBack={() => setSelectedHotel(null)} />
        ) : (
          <>
            <HotelForm onHotelAdded={fetchHoteles} />
            <HotelList hoteles={hoteles} onSelectHotel={handleSelectHotel} />
          </>
        );
      case 'clientes':
        return selectedCliente ? (
          <ClienteDetail cliente={selectedCliente} onUpdate={handleClienteUpdate} onDelete={handleClienteDelete} onBack={() => setSelectedCliente(null)} />
        ) : (
          <>
            <ClienteForm onClienteAdded={fetchClientes} />
            <ClienteList clientes={clientes} onSelectCliente={handleSelectCliente} />
          </>
        );
      case 'reservas':
        return selectedReserva ? (
          <ReservaDetail reserva={selectedReserva} onUpdate={handleReservaUpdate} onDelete={handleReservaDelete} onBack={() => setSelectedReserva(null)} />
        ) : (
          <>
            <ReservaForm onReservaAdded={fetchReservas} />
            <ReservaList reservas={reservas} onSelectReserva={handleSelectReserva} />
          </>
        );
      default:
        return <div>Selecciona una opción de navegación.</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Hoteles y Clientes</h1>
        <Navigation onNavigate={handleNavigate} />
      </header>
      <main>
        <div className="section">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;