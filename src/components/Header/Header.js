// src/components/Header/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">Smashes Store</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/products" onClick={toggleMenu}>Productos</Link>
          <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
