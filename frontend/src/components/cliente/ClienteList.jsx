// frontend/src/components/cliente/ClienteList.jsx

import React from 'react';

const ClienteList = ({ clientes }) => {
  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>No se encontraron clientes.</p>
      ) : (
        <ul className="client-list">
          {clientes.map(cliente => (
            <li key={cliente.id} className="client-item">
              <h3>{cliente.nombre_completo}</h3>
              <p>Correo: {cliente.correo}</p>
              <p>Teléfono: {cliente.telefono}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteList;