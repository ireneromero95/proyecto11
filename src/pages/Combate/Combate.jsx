import React, { useState } from 'react';
import Peticion from '../../components/Peticion/Peticion';
import Button from '../../components/Button/Button';
import './Combate.css';

const Combate = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [winner, setWinner] = useState('');

  const tipoTraducido = {
    fire: 'fuego',
    water: 'agua',
    grass: 'planta'
  };

  const comparar = () => {
    if (pokemon1.type === pokemon2.type) {
      setWinner('¡Empate!');
    } else if (
      (pokemon1.type === 'fire' && pokemon2.type === 'grass') ||
      (pokemon1.type === 'grass' && pokemon2.type === 'water') ||
      (pokemon1.type === 'water' && pokemon2.type === 'fire')
    ) {
      setWinner(
        `¡Eso es!, ${tipoTraducido[pokemon1.type]} gana a ${
          tipoTraducido[pokemon2.type]
        }!`
      );
    } else {
      setWinner(
        `¡Eso es!, ${tipoTraducido[pokemon2.type]} gana a ${
          tipoTraducido[pokemon1.type]
        }!`
      );
    }

    setTimeout(() => {
      setWinner('');
    }, 1000);
  };

  return (
    <main className='areaJuego'>
      <h1>Combate</h1>
      <p className='combate-descripcion'>
        Juega al conocido piedra, papel o tijeras pero con los tipos de Pokémon:
        fuego, agua y planta.
      </p>
      <section className='combate'>
        <Peticion setPokemonData={setPokemon1} />
        <Peticion setPokemonData={setPokemon2} />
      </section>
      <section className='resultados'>
        <Button name='Combatir' action={comparar} />
        {winner && <h2 className='winnerText'>{winner}</h2>}
      </section>
    </main>
  );
};

export default Combate;
