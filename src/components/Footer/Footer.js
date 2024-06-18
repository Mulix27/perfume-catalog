// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>Contacto: contacto@perfume-catalogo.com</p>
      <div className="social-media">
        <a href="https://www.facebook.com/profile.php?id=61560818762830">Facebook</a> |
        <a href="#">Twitter</a> |
        <a href="#">Instagram</a>
      </div>
    </div>
  );
};

export default Footer;
