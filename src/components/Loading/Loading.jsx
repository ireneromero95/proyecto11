import './Loading.css';

const Loading = () => {
  return (
    <div className='loading-container'>
      <img
        src='/assets/pokeball.png'
        alt='Cargando Pokéball'
        className='pokeball-img'
      />
      <p>Cargando Pokémon...</p>
    </div>
  );
};

export default Loading;
