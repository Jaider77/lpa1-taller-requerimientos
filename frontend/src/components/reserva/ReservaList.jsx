// frontend/src/components/reserva/ReservaList.jsx

import React from 'react';

const ReservaList = ({ reservas, onSelectReserva }) => {
  if (!reservas || reservas.length === 0) {
    return (
      <div className="list-container">
        <h2>Lista de Reservas</h2>
        <p>No hay reservas registradas en este momento. Intenta crear una.</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>Lista de Reservas</h2>
      <div className="reserva-list">
        {reservas.map(reserva => (
          <div key={reserva.id} className="reserva-card" onClick={() => onSelectReserva(reserva)}>
            <h3>Reserva #{reserva.id}</h3>
            <p><strong>ID Cliente:</strong> {reserva.cliente_id}</p>
            <p><strong>ID Habitación:</strong> {reserva.habitacion_id}</p>
            <p><strong>Entrada:</strong> {reserva.fecha_entrada}</p>
            <p><strong>Salida:</strong> {reserva.fecha_salida}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservaList;