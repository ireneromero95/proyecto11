import './Contact.css';
import { useState } from 'react';
import Button from '../../components/Button/Button';

const Contact = () => {
  // estados para los diferentes campos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    pokemonType: 'general'
  });

  // estados para los mensajes
  const [formStatus, setFormStatus] = useState({
    isSubmitted: false,
    isError: false,
    message: ''
  });

  //cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // esto es pa asegurarme de que mete un mail
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormStatus({
        isSubmitted: false,
        isError: true,
        message: 'Por favor, introduce tu nombre'
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormStatus({
        isSubmitted: false,
        isError: true,
        message: 'Por favor, introduce un email válido'
      });
      return;
    }

    if (!formData.message.trim()) {
      setFormStatus({
        isSubmitted: false,
        isError: true,
        message: 'Por favor, escribe un mensaje'
      });
      return;
    }

    setFormStatus({
      isSubmitted: true,
      isError: false,
      message:
        '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      pokemonType: 'general'
    });

    setTimeout(() => {
      setFormStatus((prev) => ({ ...prev, isSubmitted: false }));
    }, 5000);
  };

  return (
    <div className='contact-container'>
      <div className='contact-header'>
        <h2>Centro de Contacto Pokémon</h2>
        <p>¿Tienes alguna pregunta sobre Pokémon?</p>
      </div>

      {formStatus.isSubmitted && (
        <div className='success-message'>{formStatus.message}</div>
      )}

      {formStatus.isError && (
        <div className='error-message'>{formStatus.message}</div>
      )}

      <div className='contact-form-wrapper'>
        <form className='contact-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Tu nombre'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='tu@email.com'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='pokemonType'>Tipo de consulta:</label>
            <select
              id='pokemonType'
              name='pokemonType'
              value={formData.pokemonType}
              onChange={handleChange}
            >
              <option value='general'>Consulta general</option>
              <option value='pokedex'>Información de Pokédex</option>
              <option value='battles'>Batallas Pokémon</option>
              <option value='events'>Eventos especiales</option>
              <option value='other'>Otro</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='subject'>Asunto:</label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              placeholder='Asunto de tu mensaje'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='message'>Mensaje:</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              placeholder='Escribe tu mensaje aquí...'
              rows={5}
            ></textarea>
          </div>

          <div className='form-actions'>
            <Button name='Enviar mensaje' action={handleSubmit} />
          </div>
        </form>

        <div className='contact-info'>
          <h3>Información de contacto</h3>
          <p>
            <strong>Email:</strong> pokemon@ejemplo.com
          </p>
          <p>
            <strong>Teléfono:</strong> +34 123 456 789
          </p>
          <p>
            <strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00
          </p>

          <div className='social-links'>
            <h4>Síguenos en redes sociales</h4>
            <div className='social-icons'>
              <a href='#' aria-label='Twitter'>
                Twitter
              </a>
              <a href='#' aria-label='Instagram'>
                Instagram
              </a>
              <a href='#' aria-label='Facebook'>
                Facebook
              </a>
              <a href='#' aria-label='YouTube'>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
