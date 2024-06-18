// src/components/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías la información del formulario a un servidor o API
    console.log(form);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={form.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Mensaje"
        value={form.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;
