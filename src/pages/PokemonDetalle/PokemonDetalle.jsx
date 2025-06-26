import { useEffect, useState } from 'react';
import './PokemonDetalle.css';
import { useLocation } from 'react-router-dom';

const PokemonDetalle = () => {
  const location = useLocation();
  const pokemonBuscado = location.state?.pokemon;
  const [pokemonData, setPokemonData] = useState(pokemonBuscado);
  const [loading, setLoading] = useState(true);

  const pathname = window.location.pathname;
  const id = pathname.split('/').pop();

  console.log('Pokemon recibido por location:', pokemonBuscado);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const flavorEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === 'es'
        );

        const description = flavorEntry
          ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ')
          : 'Descripción no disponible.';

        setPokemonData({
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((t) => t.type.name),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((a) => a.ability.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat
          })),
          description
        });
      } catch (error) {
        console.error('Error al cargar el Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <p>Cargando pokémon...</p>;
  if (!pokemonData) return <p>No se ha encontrado el pokémon.</p>;

  return (
    <main className='pokemon-detalle-todo'>
      <article className='pokemon-detalle-card'>
        <section className='pokemon-titulo'>
          <h1>{pokemonData.name}</h1>
        </section>

        <section className='pokemon-detalle-info'>
          <section className='pokemon-detalle-left'>
            <img src={pokemonData.image} alt={pokemonData.name} />
            <div className='pokemon-types'>
              {pokemonData.types.map((type) => (
                <span key={type} className={`pokemon-type type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </section>

          <section className='pokemon-description'>
            <p>{pokemonData.description}</p>
            <p>Altura: {pokemonData.height / 10} m</p>
            <p>Peso: {pokemonData.weight / 10} kg</p>
            <p>Habilidades: {pokemonData.abilities.join(', ')}</p>
            <h3>Estadísticas base:</h3>
            <ul>
              {pokemonData.stats.map((stat) => (
                <li key={stat.name}>
                  {stat.name}: {stat.value}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </article>
    </main>
  );
};

export default PokemonDetalle;
