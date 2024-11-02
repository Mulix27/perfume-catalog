// src/pages/Contact/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contacto</h1>
      <div className="contact-info">
        <p>Puedes contactarnos desde nuestra página de Facebook:</p>
        <a 
          href="https://www.facebook.com/profile.php?id=61560818762830" 
          target="_blank" 
          rel="noopener noreferrer"
          className="facebook-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="facebook-icon"
          >
            <path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.325v21.351c0 .733.591 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.462.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.324-.591 1.324-1.324v-21.35c0-.735-.591-1.326-1.325-1.326z"/>
          </svg>
          <span>Smashes Store</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
