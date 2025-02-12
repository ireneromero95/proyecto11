import React from 'react';
import { useState, useEffect } from 'react';

const Peticion = () => {
  const [filter, setFilter] = useState('charmander');
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemonFiltered = async () => {
      const pokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${filter}`
      );
      const pokemonJson = await pokemon.json();

      return {
        ...pokemonJson,
        name: pokemonJson.name,
        id: pokemonJson.id,
        image: pokemonJson.sprites.front_default,
        type: pokemonJson.types[0].type.name
      };
    };

    getPokemonFiltered().then((pokemon) => setPokemon([pokemon]));
  }, [filter]);

  return (
    <div className='areaJugador'>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value='charmander'>Charmander</option>
        <option value='squirtle'>Squirtle</option>
        <option value='bulbasaur'>Bulbasaur</option>
      </select>
      <div>
        {pokemon.map((p) => (
          <div key={p.id}>
            <img src={p.image} alt={p.name} />
            <h2>{p.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peticion;
