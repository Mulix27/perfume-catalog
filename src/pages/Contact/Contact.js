// src/pages/Contact/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    
    <div className="contact-page">
      <h1>Contacto</h1>
      <div className="contact-form">
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Correo Electrónico" />
        <textarea placeholder="Mensaje" rows="5"></textarea>
        <button type="submit">Enviar</button>
      </div>
    </div>
  );
};

export default Contact;
