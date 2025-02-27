import { useState } from 'react';
import './Contact.css';
import Button from '../../components/Button/Button';

import React from 'react';

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    alert('Mensaje enviado correctamente');
    setMessage('');
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
