import Peticion from '../../components/Peticion/Peticion';
import Button from '../../components/Button/Button';
import './Combate.css';

import React from 'react';

const Combate = () => {
  const comparar = () => {
    console.log('Bien hecho el boton');
    // if (pokemon1Type === pokemon2Type) {
    //   setWinner('Empate');
    // } else if (pokemon1Type === 'fire' && pokemon2Type === 'grass') {
    //   setWinner('Ganó Pokemon 1');
    // } else if (pokemon1Type === 'grass' && pokemon2Type === 'water') {
    //   setWinner('Ganó Pokemon 1');
    // } else {
    //   setWinner('Ganó Pokemon 2');
    // }
  };

  return (
    <div className='combate'>
      <Peticion />
      <Peticion />
      <Button name='Combatir' action={() => comparar()} />
    </div>
  );
};

export default Combate;
