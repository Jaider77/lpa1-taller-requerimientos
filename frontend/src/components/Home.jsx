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
      {/* Opcional: Puedes añadir una imagen aquí */}
      <img src="https://via.placeholder.com/600x400.png?text=Hoteles+App" alt="Ilustración de un hotel" className="home-image" />
    </div>
  );
};

export default Home;