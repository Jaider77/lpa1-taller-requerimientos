// frontend/src/common/Header.jsx

import React from 'react';
import './Header.css';

const Header = ({ onNavigate }) => {
  return (
    <header className="App-header">
      <h1>Gestión de Hoteles y Clientes</h1>
      <nav>
        {/* Inicio */}
        <button onClick={() => onNavigate('home')}>
          <i className="bi bi-house-fill"></i>
          <span>Inicio</span>
        </button>

        {/* Hoteles */}
        <button onClick={() => onNavigate('hoteles')}>
          <i className="bi bi-building-fill"></i>
          <span>Hoteles</span>
        </button>

        {/* Clientes */}
        <button onClick={() => onNavigate('clientes')}>
          <i className="bi bi-person-fill"></i>
          <span>Clientes</span>
        </button>

        {/* Reservas */}
        <button onClick={() => onNavigate('reservas')}>
          <i className="bi bi-calendar-check-fill"></i>
          <span>Reservas</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;