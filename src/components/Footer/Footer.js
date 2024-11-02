// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';
import Logo from '../../../src/assets/images/smashes-logo.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={Logo} alt="Logo de Smashes Store" />
      </div>
      <p>Contacto:</p>
      <div className="social-media">
        <a href="https://www.facebook.com/profile.php?id=61560818762830">Facebook</a>
      </div>
    </div>
  );
};

export default Footer;
