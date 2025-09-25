// frontend/src/components/common/Header.jsx

import React from 'react';
import './Header.css'; // Asegúrate de tener este archivo CSS

const Header = ({ onNavigate }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Gestión de Hoteles y Clientes</h1>
        <nav>
          <button onClick={() => onNavigate('home')}>Inicio</button>
          <button onClick={() => onNavigate('hoteles')}>Hoteles</button>
          <button onClick={() => onNavigate('clientes')}>Clientes</button>
          <button onClick={() => onNavigate('reservas')}>Reservas</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;