// src/components/Header/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../../src/assets/images/smashes-logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/"><img className='img-logo' src={Logo} alt="Logo de Smashes Store" /></Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/products" onClick={toggleMenu}>Perfumes</Link>
          <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
