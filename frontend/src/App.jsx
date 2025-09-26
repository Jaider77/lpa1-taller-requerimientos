// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes del Hotel
import HotelForm from './components/hotel/HotelForm'; 
import HotelList from './components/hotel/HotelList'; 
import HotelDetail from './components/hotel/HotelDetail';
import DestinationList, { DESTINOS } from './components/hotel/DestinationList'; 

// Componentes de Cliente
import ClienteForm from './components/cliente/ClienteForm';
import ClienteList from './components/cliente/ClienteList';
import ClienteDetail from './components/cliente/ClienteDetail';

// Componentes de Reserva
import ReservaForm from './components/reserva/ReservaForm';
import ReservaList from './components/reserva/ReservaList';
import ReservaDetail from './components/reserva/ReservaDetail';

// Comunes y otros
import Header from './common/Header.jsx';
import Home from './components/Home';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [hoteles, setHoteles] = useState([]); 
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  
  // Estados de selección
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null);
  
  // Estado para la navegación anidada de Hoteles
  const [selectedDestination, setSelectedDestination] = useState(null); 
  
  // === ESTADOS NUEVOS PARA FORMULARIOS DESPLEGABLES ===
  const [isHotelFormOpen, setIsHotelFormOpen] = useState(false);
  const [isClienteFormOpen, setIsClienteFormOpen] = useState(false);
  const [isReservaFormOpen, setIsReservaFormOpen] = useState(false);
  
  // Estados de la aplicación
  const [currentView, setCurrentView] = useState('home');
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

  // Handlers para Hotel
  const handleSelectHotel = (hotel) => setSelectedHotel(hotel);
  const handleHotelUpdate = () => {
    fetchHoteles();
    setSelectedHotel(null);
    setIsHotelFormOpen(false); // Cerramos el formulario al completar una acción
  };
  const handleHotelDelete = () => {
    fetchHoteles();
    setSelectedHotel(null);
  };

  // Handlers para Cliente
  const handleSelectCliente = (cliente) => setSelectedCliente(cliente);
  const handleClienteUpdate = () => {
    fetchClientes();
    setSelectedCliente(null);
    setIsClienteFormOpen(false); // Cerramos el formulario al completar una acción
  };
  const handleClienteDelete = () => {
    fetchClientes();
    setSelectedCliente(null);
  };

  // Handlers para Reserva
  const handleSelectReserva = (reserva) => setSelectedReserva(reserva);
  const handleReservaUpdate = () => {
    fetchReservas();
    setSelectedReserva(null);
    setIsReservaFormOpen(false); // Cerramos el formulario al completar una acción
  };
  const handleReservaDelete = () => {
    fetchReservas();
    setSelectedReserva(null);
  };
  
  // Handler para Destino
  const handleSelectDestination = (destinationName) => {
    setSelectedDestination(destinationName);
    setIsHotelFormOpen(false); // Cierra el formulario al cambiar de destino
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedHotel(null);
    setSelectedCliente(null);
    setSelectedReserva(null);
    setSelectedDestination(null); 
    // Resetear estados de formularios al cambiar de vista principal
    setIsHotelFormOpen(false); 
    setIsClienteFormOpen(false);
    setIsReservaFormOpen(false);
  };
  
  // Handlers para alternar formularios
  const toggleHotelForm = () => setIsHotelFormOpen(!isHotelFormOpen);
  const toggleClienteForm = () => setIsClienteFormOpen(!isClienteFormOpen);
  const toggleReservaForm = () => setIsReservaFormOpen(!isReservaFormOpen);


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home hoteles={hoteles} onSelectHotel={handleSelectHotel} />;

      case 'hoteles':
        if (selectedHotel) {
          // Vista 3: Detalle de Hotel
          return (
            <HotelDetail hotel={selectedHotel} onUpdate={handleHotelUpdate} onDelete={handleHotelDelete} onBack={() => setSelectedHotel(null)} />
          );
        } else if (selectedDestination) {
          // Vista 2: Hoteles Filtrados por Destino (CON DESPLIEGUE HOTEL)
          return (
            <div className="destination-detail-view">
              <button className="back-button" onClick={() => setSelectedDestination(null)}>
                <i className="bi bi-arrow-left"></i> Volver a Destinos
              </button>
              <h2>Hoteles en: {selectedDestination}</h2>
              
              {/* Lógica y Botón de Despliegue de HOTEL */}
              <div className="form-toggle-container">
                  <button 
                    className="toggle-button" 
                    onClick={toggleHotelForm}
                  >
                    <i className={`bi ${isHotelFormOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`}></i>
                    {isHotelFormOpen ? `Ocultar Formulario` : `+ Agregar Nuevo Hotel en ${selectedDestination}`}
                  </button>

                  <AnimatePresence>
                    {isHotelFormOpen && (
                      <motion.div
                        key="hotel-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="compact-form" 
                      >
                          {/* Pasar el handler de actualización para cerrar el form al agregar */}
                          <HotelForm onHotelAdded={handleHotelUpdate} /> 
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>

              <HotelList 
                destinoSeleccionado={selectedDestination} 
                onSelectHotel={handleSelectHotel} 
              />
            </div>
          );
        } else {
          // Vista 1: Lista de Destinos (sin formulario)
          return (
            <DestinationList 
              onSelectDestination={handleSelectDestination}
            />
          );
        }

      case 'clientes':
        return selectedCliente ? (
          <ClienteDetail cliente={selectedCliente} onUpdate={handleClienteUpdate} onDelete={handleClienteDelete} onBack={() => setSelectedCliente(null)} />
        ) : (
          <div className="clientes-view">
            {/* Lógica y Botón de Despliegue de CLIENTE */}
            <div className="form-toggle-container">
                <button 
                    className="toggle-button" 
                    onClick={toggleClienteForm}
                >
                    <i className={`bi ${isClienteFormOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`}></i>
                    {isClienteFormOpen ? `Ocultar Formulario de Cliente` : `+ Agregar Nuevo Cliente`}
                </button>
                <AnimatePresence>
                    {isClienteFormOpen && (
                        <motion.div
                            key="cliente-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="compact-form" 
                        >
                            {/* Pasar el handler de actualización para cerrar el form al agregar */}
                            <ClienteForm onClienteAdded={handleClienteUpdate} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <ClienteList clientes={clientes} onSelectCliente={handleSelectCliente} />
          </div>
        );

      case 'reservas':
        return selectedReserva ? (
          <ReservaDetail reserva={selectedReserva} onUpdate={handleReservaUpdate} onDelete={handleReservaDelete} onBack={() => setSelectedReserva(null)} />
        ) : (
          <>
            {/* Lógica y Botón de Despliegue de RESERVA */}
            <div className="form-toggle-container">
                <button 
                    className="toggle-button" 
                    onClick={toggleReservaForm}
                >
                    <i className={`bi ${isReservaFormOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`}></i>
                    {isReservaFormOpen ? `Ocultar Formulario de Reserva` : `+ Crear Nueva Reserva`}
                </button>
                <AnimatePresence>
                    {isReservaFormOpen && (
                        <motion.div
                            key="reserva-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="compact-form" 
                        >
                            {/* Pasar el handler de actualización para cerrar el form al agregar */}
                            <ReservaForm onReservaAdded={handleReservaUpdate} hoteles={hoteles} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <ReservaList reservas={reservas} onSelectReserva={handleSelectReserva} />
          </>
        );

      default:
        return <div>Selecciona una opción de navegación.</div>;
    }
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigate} currentView={currentView} />
      <main>
        <div className="section">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView + (selectedDestination || '') + (selectedHotel ? selectedHotel.id : '')} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;