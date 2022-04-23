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
