import './Contact.css';
import { useState } from 'react';
import Button from '../../components/Button/Button'; // Importación de Button

import React from 'react';

const Contact = () => {
  // Estado para el mensaje
  const [message, setMessage] = useState('');

  // Maneja el cambio en el textarea
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto de recargar la página
    alert('Mensaje enviado correctamente');
    setMessage(''); // Limpia el mensaje
  };

  return (
    <div className='contact'>
      <h3>Contactar por correo</h3>
      <form className='contact-form' onSubmit={handleSubmit}>
        <label>
          Mensaje:
          <textarea
            name='message'
            value={message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <Button name='Enviar' action={handleSubmit} />
      </form>
    </div>
  );
};

export default Contact;
