// frontend/src/components/Navigation.jsx

import React from 'react';

const Navigation = ({ onNavigate }) => {
  return (
    <nav className="navigation-bar">
      <button onClick={() => onNavigate('hoteles')}>Hoteles</button>
      <button onClick={() => onNavigate('clientes')}>Clientes</button>
      <button onClick={() => onNavigate('reservas')}>Reservas</button>
    </nav>
  );
};

export default Navigation;