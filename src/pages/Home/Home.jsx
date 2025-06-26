import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

import './Home.css';

const getImagenUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const Home = () => {
  const [selectedRegion, setSelectedRegion] = useState('kanto');
  const [pokemonList, setPokemonList] = useState([]);
  const [backgroundSprites, setBackgroundSprites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRegion) return;

    const regionToPokedex = {
      kanto: 'kanto',
      johto: 'original-johto',
      hoenn: 'hoenn'
    };

    setLoading(true);

    const fetchPokemonByRegion = async () => {
      try {
        const apiRegion = regionToPokedex[selectedRegion];
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokedex/${apiRegion}`
        );
        const data = await res.json();

        const lista = data.pokemon_entries.map((entry) => {
          const id = entry.pokemon_species.url.split('/').filter(Boolean).pop();
          return {
            name: entry.pokemon_species.name,
            id: Number(id)
          };
        });

        setPokemonList(lista);
      } catch (error) {
        console.error('Error al cargar Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonByRegion();
  }, [selectedRegion]);

  //Este es el useEffect del fondo
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

      <main className='pokemon-container'>
        <section className='pokemon-title'>
          <h1>Pokédex nacional</h1>
        </section>

        <section id='selector-container'>
          <label htmlFor='region-select'>Selecciona una región Pokémon:</label>
          <select
            id='region-select'
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value='kanto'>Kanto (1ª gen)</option>
            <option value='johto'>Johto (2ª gen)</option>
            <option value='hoenn'>Hoenn (3ª gen)</option>
          </select>
        </section>

        <section className='pokemon-grid'>
          {loading ? (
            <Loading />
          ) : (
            pokemonList.map((pokemon) => (
              <article key={pokemon.id} className='pokemon-card'>
                {/* Esto presuntamente pasa la info  */}
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  state={{ pokemon: pokemon }}
                >
                  <img src={getImagenUrl(pokemon.id)} alt={pokemon.name} />
                </Link>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
