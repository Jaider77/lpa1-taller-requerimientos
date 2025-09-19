import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realiza una petición GET a tu API de Flask
    axios.get('http://127.0.0.1:5000/hoteles')
      .then(response => {
        // Al recibir los datos, los guarda en el estado
        setHoteles(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Hubo un error al cargar los hoteles.");
        setLoading(false);
        console.error("Error en la petición:", err);
      });
  }, []); // El array vacío asegura que se ejecute una sola vez al cargar el componente

  if (loading) {
    return <div>Cargando hoteles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hoteles Disponibles</h1>
      </header>
      <main>
        {hoteles.length === 0 ? (
          <p>No se encontraron hoteles.</p>
        ) : (
          <ul className="hotel-list">
            {hoteles.map(hotel => (
              <li key={hotel.id} className="hotel-item">
                <h2>{hotel.nombre}</h2>
                <p>Dirección: {hotel.direccion}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;