# Pokédex

## Portfolio pokemon using next + graphql

### by : Edwin Satya Yudistira

### How to Access

- git clone : https://github.com/edwinsatya/pokedex
- npm install
- npm run dev

### Api

Iam using (Graphql-pokemon) api for develop this project :

- https://graphql-pokeapi.vercel.app/

  #### List Query Api

  - GET_POKEMONS :
    ` query pokemons($limit: Int, $offset: Int) { pokemons(limit: $limit, offset: $offset) { next previous message results { id url name image } } }`
  - GET_POKEMON :
    ` query pokemon($name: String!) { pokemon(name: $name) { id name sprites { front_default } moves { move { name } } types { type { name } } } }`

  ##### All query run well

### Page

- Title : Pokédex
  #### path : `/`
  #### desc : `This page about list of pokemons, in card of pokemon, any information about the pokemon like name, number/id, and total owned. You can click 1 pokemon and then you can go detail`
- Title : Name of pokemon (ex: bulbasaur) | Pokédex
  #### path : `/[name-pokemon]`
  #### desc : `This page about pokemon details, you can see any information like image, name, number/id, types, moves, and then you can catch them (success probability is 50%), if failed catch any popup/modal information and if success catch any popup/modal information and you can input the nick name for your pokemon, and BOOM your last pokemon already in bagpack or my-pokemon page`
- Title : My pokemon | Pokédex
  #### path : `/my-pokemon`
  #### desc : `This page about list all your pokemon has been arrested, any information about your pokemon like in Pokédex/home, but you can release your pokemon`

### Feature

- `Using graphql`
- `Performant checked`
- `persist state (localStorage)`
- `Centralization state using useContext + useReducer`
- `Unit testing coming soon`

### Styling

- Tailwind css : https://tailwindcss.com/

### Deployment

- Deploy in vercel :
