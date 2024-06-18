// src/components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Smashes Store</Link>
      </div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/contact">Contacto</Link>
      </nav>
    </header>
  );
};

export default Header;
