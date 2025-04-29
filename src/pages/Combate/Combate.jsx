import React, { useState } from 'react';
import Peticion from '../../components/Peticion/Peticion';
import Button from '../../components/Button/Button';
import './Combate.css';

const Combate = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [winner, setWinner] = useState('');

  const comparar = () => {
    if (pokemon1.type === pokemon2.type) {
      setWinner('¡Empate!');
    } else if (
      (pokemon1.type === 'fire' && pokemon2.type === 'grass') ||
      (pokemon1.type === 'grass' && pokemon2.type === 'water') ||
      (pokemon1.type === 'water' && pokemon2.type === 'fire')
    ) {
      setWinner(`¡Ganó ${pokemon1.name}!`);
    } else {
      setWinner(`¡Ganó ${pokemon2.name}!`);
    }

    setTimeout(() => {
      setWinner('');
    }, 1000);
  };

  return (
    <div className='areaJuego'>
      <h1>Combate</h1>
      <div className='combate'>
        <Peticion setPokemonData={setPokemon1} />
        <Peticion setPokemonData={setPokemon2} />
      </div>
      <div className='resultados'>
        <Button name='Combatir' action={comparar} />
        {winner && <h2 className='winnerText'>{winner}</h2>}
      </div>
    </div>
  );
};

export default Combate;
