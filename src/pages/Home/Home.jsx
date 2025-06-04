import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

import './Home.css';

const Home = () => {
  const [selectedRegion, setSelectedRegion] = useState('kanto');
  const [pokemonList, setPokemonList] = useState([]);
  const [backgroundSprites, setBackgroundSprites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRegion) return;

    const regiones = {
      kanto: [1, 151],
      johto: [152, 251],
      hoenn: [252, 386]
    };

    const [start, end] = regiones[selectedRegion];
    const urls = [];
    for (let i = start; i <= end; i++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    setLoading(true);
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((data) => {
        const lista = data.map((p) => ({ name: p.name, id: p.id }));
        setPokemonList(lista);
      })
      .finally(() => {
        console.log('Cambio');
        setLoading(false);
      });
  }, [selectedRegion]);

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
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className='pokemon-grid'>
            {pokemonList.map((pokemon) => (
              <Link
                key={pokemon.id}
                to={`/pokemon/${pokemon.id}`}
                className='pokemon-card'
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
