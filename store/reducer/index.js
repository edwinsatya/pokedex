export const initialState = {
  myPokemon: {},
  showPopup: {
    isShow: false,
    children: <p></p>,
    title: "",
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_STATE_POKEMON":
      if (!state.myPokemon[action.value.id]) {
        return {
          ...state,
          myPokemon: {
            ...state.myPokemon,
            [action.value.id]: [
              {
                ...action.value,
              },
            ],
          },
        };
      } else {
        return {
          ...state,
          myPokemon: {
            ...state.myPokemon,
            [action.value.id]: [
              ...state.myPokemon[action.value.id],
              { ...action.value },
            ],
          },
        };
      }
    case "SET_LOCAL_STORAGE":
      localStorage.setItem("owned", JSON.stringify(state.myPokemon));
      return state;
    case "GET_STATE_POKEMON":
      return {
        ...state,
        myPokemon: JSON.parse(localStorage.getItem("owned")) ?? {},
      };
    case "RELEASE_POKEMON":
      const { id, nick } = action.value;
      let indexVal = 0;
      for (const property in state.myPokemon) {
        state.myPokemon[property].forEach((obj, idx) => {
          if (obj.nick === nick) {
            indexVal = idx;
          }
        });
      }

      return {
        ...state,
        myPokemon: {
          ...state.myPokemon,
          [id]: state.myPokemon[id].splice(indexVal, 1),
        },
      };
    case "SET_SHOW_POPUP":
      const { isShow, children, title } = action.value;
      return {
        ...state,
        showPopup: {
          isShow,
          children,
          title,
        },
      };
    default:
      return state;
  }
}
