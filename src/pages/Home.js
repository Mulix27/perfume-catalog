import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import perfumeBanner from '../assets/images/perfumes-banner.png';

function Home() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products');
  };

  return (
    <div className="home-container" style={{ backgroundColor: 'black', color: 'white' }}>
      {
        <div className="overlay">
          <div className="home-content">
            <h1>SMASHES STORE</h1>
            <h2>EXCLUSIVIDAD Y ELEGANCIA</h2>
            <p>DESCUBRE LA ELEGANCIA EN CADA FRAGANCIA. <br /> <br /> VIVE EL LUJO Y LA AUTENTICIDAD DE PERFUMES EXCLUSIVOS.</p>
            <img src={perfumeBanner} alt="Perfume Banner" />
            <div className="button-group">
              <button className="gradient-button" onClick={handleExploreClick}>
                Descubre la Colección
              </button>
            </div>
          </div>
        </div>}
    </div>
  );
}

export default Home;
