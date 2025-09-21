// frontend/src/components/cliente/ClienteList.jsx

import React from 'react';

const ClienteList = ({ clientes, onSelectCliente }) => {
  if (!clientes || clientes.length === 0) {
    return (
      <div className="list-container">
        <h2>Lista de Clientes</h2>
        <p>No hay clientes registrados en este momento. Intenta crear uno.</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>Lista de Clientes</h2>
      <div className="client-list">
        {clientes.map(cliente => (
          <div key={cliente.id} className="client-card" onClick={() => onSelectCliente(cliente)}>
            <h3>{cliente.nombre_completo}</h3>
            <p>Email: {cliente.email}</p>
            <p>Teléfono: {cliente.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClienteList;