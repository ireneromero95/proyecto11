import React from 'react';
import './Button.css';

function Button({ name, action }) {
  return <button onClick={action}>{name}</button>;
}

export default Button;
