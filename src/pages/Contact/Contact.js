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
      <div className="contact-info">
        <h2>Información de Contacto</h2>
        <p>Dirección: Calle Falsa 123, Ciudad, País</p>
        <p>Teléfono: +1234567890</p>
        <p>Email: <a href="mailto:contacto@perfume-catalogo.com">contacto@perfume-catalogo.com</a></p>
      </div>
    </div>
  );
};

export default Contact;
