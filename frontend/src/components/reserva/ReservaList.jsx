import React from 'react';

const ReservaList = ({ reservas }) => {
  return (
    <div>
      <h2>Lista de Reservas</h2>
      {reservas.length === 0 ? (
        <p>No se encontraron reservas.</p>
      ) : (
        <ul className="reserva-list">
          {reservas.map(reserva => (
            <li key={reserva.id} className="reserva-item">
              <h3>Reserva #{reserva.id}</h3>
              <p>ID Cliente: {reserva.cliente_id}</p>
              <p>ID Habitación: {reserva.habitacion_id}</p>
              <p>Fecha de Entrada: {reserva.fecha_entrada}</p>
              <p>Fecha de Salida: {reserva.fecha_salida}</p>
              <p>Precio Total: ${reserva.precio_total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservaList;