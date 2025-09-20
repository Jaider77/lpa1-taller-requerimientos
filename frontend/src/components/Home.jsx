// frontend/src/components/Home.jsx

import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h2>¡Bienvenido a la Gestión de Hoteles!</h2>
      <p>
        Esta aplicación te permite gestionar de forma eficiente la información de tus hoteles, clientes y reservas.
        Utiliza la barra de navegación en la parte superior para acceder a las diferentes secciones.
      </p>
      {/* Puedes cambiar esta imagen por una de tu elección. */}
      <img src="https://images.unsplash.com/photo-1549488344-934d40212e33?q=80&w=1740&auto=format&fit=crop" alt="Habitación de hotel" className="home-image" />
    </div>
  );
};

export default Home;