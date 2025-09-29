// frontend/src/components/cliente/ClienteList.jsx (Corregido)

import React from 'react';

const ClienteList = ({ clientes, onSelectCliente }) => {
    
    // ... (Manejo de estados de carga y vacíos)
    if (!clientes) {
        return (
            <div className="list-container">
                <h2>Lista de Clientes</h2>
                <p>Cargando clientes...</p>
            </div>
        );
    }
    
    if (clientes.length === 0) {
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
            <div 
                key={cliente.id} 
                className="client-card" 
                onClick={() => onSelectCliente(cliente)}
            >
                {/* CORRECCIÓN CLAVE: Usamos nombre_completo, como lo devuelve el API */}
              <h3>{cliente.nombre_completo}</h3> 
              <p>Email: {cliente.correo}</p>
              <p>Teléfono: {cliente.telefono}</p>
                {/* Opcional: Mostrar el ID si es útil para el usuario o la gestión */}
                <p>ID: {cliente.id}</p> 
            </div>
          ))}
        </div>
      </div>
    );
};

export default ClienteList;