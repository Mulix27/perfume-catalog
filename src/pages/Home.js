// src/pages/Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/dior_home.jpg';

function Home() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products');
  };

  return (
    <div className="home-container">
      <div className="home-banner">
        <h1>Bienvenido a Nuestro Catalogo</h1>
        <p>
          Ofrecemos una amplia selección de perfumes 100% originales para dama y caballero.
          Nuestros productos son seleccionados con cuidado para garantizar la más alta calidad
          y autenticidad. ¡Descubre fragancias que te encantarán y harán que te sientas especial
          todos los días!
        </p>
        <button className="explore-button" onClick={handleExploreClick}>
          Explorar Productos
        </button>
      </div>
      <img 
        src={Logo}
        alt="Perfume" 
        className="home-image"
      />

    </div>
  );
}

export default Home;
