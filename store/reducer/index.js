export const initialState = {
  myPokemon: {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      const { pokemonId, pokemonNickName } = action.value;
      if (!state.myPokemon[pokemonId]) {
        return {
          myPokemon: {
            ...state.myPokemon,
            [pokemonId]: [pokemonNickName],
          },
        };
      } else {
        return {
          myPokemon: {
            ...state.myPokemon,
            [pokemonId]: [...state.myPokemon[pokemonId], pokemonNickName],
          },
        };
      }
    case "SET_LOCAL_STORAGE":
      localStorage.setItem("owned", state.myPokemon);
      break;
    case "GET_STATE":
      return {
        myPokemon: JSON.parse(localStorage.getItem("owned")) ?? {},
      };
    default:
      return state;
  }
}