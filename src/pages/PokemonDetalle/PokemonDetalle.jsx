import { useEffect, useState } from 'react';
import './PokemonDetalle.css';

const PokemonDetalle = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  // esto se usa para coger la info de la ruta que yo previamente le he dado, la manera buena es con useParams
  const pathname = window.location.pathname;
  const id = pathname.split('/').pop();

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
    <div className='pokemon-detalle-todo'>
      <div className='pokemon-detalle-card'>
        <h2>{pokemonData.name}</h2>
        <div className='pokemon-detalle-top'>
          <img src={pokemonData.image} alt={pokemonData.name} />
          <div className='pokemon-types'>
            {pokemonData.types.map((type) => (
              <span key={type} className={`pokemon-type type-${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
        <p className='pokemon-description'>{pokemonData.description}</p>
      </div>
    </div>
  );
};

export default PokemonDetalle;
