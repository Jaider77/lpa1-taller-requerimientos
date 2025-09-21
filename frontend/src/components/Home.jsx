// frontend/src/components/Home.jsx

import React from 'react';

const Home = ({ hoteles, onSelectHotel }) => {
  return (
    <div className="home-container">
      <h2>¡Bienvenido a la Gestión de Hoteles de Clase Mundial!</h2>
      <p>
        Optimiza la administración de tus propiedades, clientes y reservas con nuestra plataforma intuitiva y poderosa. 
        Explora nuestros hoteles exclusivos a continuación:
      </p>

      {/* Imagen de bienvenida animada */}
      <img 
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop" 
        alt="Lobby de hotel moderno" 
        className="home-main-image" 
      />
      
      {/* Sección para mostrar los hoteles en el inicio */}
      <div className="hotel-list-home">
        {hoteles.map(hotel => (
          <div key={hotel.id} className="hotel-card" onClick={() => onSelectHotel(hotel)}>
            {/* Si el hotel tiene una propiedad de imagen, la muestra */}
            {hotel.imagen && <img src={`/images/static/${hotel.imagen}`} alt={hotel.nombre} />}
            <div className="hotel-card-info">
              <h3>{hotel.nombre}</h3>
              <p>{hotel.direccion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;