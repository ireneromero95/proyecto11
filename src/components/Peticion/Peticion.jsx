import React, { useState, useEffect } from 'react';

const Peticion = ({ setPokemonData }) => {
  const [filter, setFilter] = useState('charmander');
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemonFiltered = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${filter}`
      );
      const pokemonJson = await response.json();

      const pokemonData = {
        name: pokemonJson.name,
        id: pokemonJson.id,
        image: pokemonJson.sprites.front_default,
        type: pokemonJson.types[0].type.name
      };

      setPokemon(pokemonData); //Aqui para tener el pokemon aqui y sacalre la imagne
      setPokemonData(pokemonData); // Esto es lo que utilizo para comparar los tipos
    };

    getPokemonFiltered();
  }, [filter, setPokemonData]);

  return (
    <div className='areaJugador'>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value='charmander'>Charmander</option>
        <option value='squirtle'>Squirtle</option>
        <option value='bulbasaur'>Bulbasaur</option>
      </select>
      {pokemon && (
        <div>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
};

export default Peticion;
