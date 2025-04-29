import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [selectedRegion, setSelectedRegion] = useState('kanto');
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  //para el fondo

  const [backgroundSprites, setBackgroundSprites] = useState([]);

  useEffect(() => {
    if (!selectedRegion) return;

    const regiones = {
      kanto: [1, 151],
      johto: [152, 251],
      hoenn: [252, 386]
    };

    const [start, end] = regiones[selectedRegion];
    const pokemons = [];

    for (let i = start; i <= end; i++) {
      pokemons.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    Promise.all(
      pokemons.map((url) => fetch(url).then((res) => res.json()))
    ).then((data) => {
      const lista = data.map((p) => ({ name: p.name, id: p.id }));
      setPokemonList(lista);
    });
  }, [selectedRegion]);
  //Pa cambio de pokemon
  useEffect(() => {
    if (!selectedPokemon) return;

    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
      );
      const data = await response.json();
      setPokemonDetails(data);
    };

    fetchPokemon();
  }, [selectedPokemon]);

  //Pa la descripcion

  useEffect(() => {
    if (!selectedPokemon) return;

    const fetchPokemonData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
        );
        const data = await res.json();

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const flavorEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === 'es'
        );

        const description = flavorEntry
          ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ')
          : 'Descripción no disponible.';
        //datos y descripcion
        setPokemonDetails({
          ...data,
          description
        });
      } catch (error) {
        console.error('Error al obtener los datos del Pokémon:', error);
      }
    };

    fetchPokemonData();
  }, [selectedPokemon]);

  //para crear el fondo?

  useEffect(() => {
    const total = 70;
    const getRandomPosition = () => ({
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth
    });

    const fetchSprites = async () => {
      const maxId = 386;
      const promises = Array.from({ length: total }, async () => {
        const id = Math.floor(Math.random() * maxId) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        return {
          url: data.sprites.front_default,
          ...getRandomPosition()
        };
      });

      const sprites = await Promise.all(promises);
      setBackgroundSprites(sprites);
    };

    fetchSprites();
  }, []);

  return (
    <>
      <div className='background-sprites'>
        {backgroundSprites.map((sprite, index) => (
          <img
            key={index}
            src={sprite.url || '/placeholder.svg'}
            alt='pokemon fondo'
            className='bg-pokemon'
            style={{ top: `${sprite.top}px`, left: `${sprite.left}px` }}
          />
        ))}
      </div>

      <div className='pokemon-container'>
        <h1>Pokédex nacional</h1>
        <div id='selector-container'>
          <select
            id='region'
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value='kanto'>Kanto</option>
            <option value='johto'>Johto</option>
            <option value='hoenn'>Hoenn</option>
          </select>
          <select
            id='pokemon'
            value={selectedPokemon}
            onChange={(e) => setSelectedPokemon(e.target.value)}
          >
            <option value=''>Selecciona un pokémon</option>
            {pokemonList.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        {pokemonDetails && (
          <div id='pokemonDetailsContainer'>
            <div className='pokemon-sprite-box'>
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
              />
            </div>
            <div className='pokemon-info'>
              <h2>{pokemonDetails.name}</h2>
              <div className='pokemon-types'>
                {pokemonDetails.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`pokemon-type type-${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <p>
                <strong>Descripción:</strong> {pokemonDetails.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
