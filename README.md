# PokeApp

PokeApp es una aplicación web que muestra información detallada de Pokémon utilizando la PokéAPI. Permite buscar Pokémon, ver sus estadísticas, descripciones y tipos, y también cuenta con un pequeño minijuego de piedra, papel y tijeras con los tipos de Pokémon.

---

## Tecnologías

- React
- Vite
- React Router para navegación
- Fetch API para consumir la PokéAPI
- CSS modular para estilos

---

## Características

- **Listado de Pokémon**: Visualiza Pokémon según su región.
- **Detalle de Pokémon**: Al seleccionar uno, se muestra su información completa.
- - **Combate Pokémon**: Pelea utilizando los tipos de los tres iniciales de Johto (primera generación).
---

## Instalación

1. Clona el repositorio:

`git clone https://github.com/tu-usuario/pokeapp.git`

2. Entra en la carpeta del proyecto:

`cd pokeapp`


4. Instala las dependencias:
   
`npm install`


6. Inicia la app en modo desarrollo:

`npm start`


---

## Uso

- Navega por el listado de Pokémon y haz clic en uno para ver detalles.
- Utiliza el navegador para ir a combate, donde puedes jugar al piedra, papel, tijeras pero con los tipos de Pokémon.

---

## Estructura del proyecto

public/
├── pokeball.png
└── index.html
src/
├── components/
│ ├── Button/
│ ├── Header/
│ ├── Loading/
│ ├── Peticion/
│ └── Contact/
├── pages/
│ ├── Combate/
│ ├── Contact/
│ ├── Home/
│ ├── NotFound/
│ └── PokemonDetalle/
├── App.jsx
├── App.css
├── main.jsx
└── index.css
