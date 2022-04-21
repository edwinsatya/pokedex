import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "../reducer";

export const GlobalContext = createContext();

export const UseGlobalContext = () => {
  return useContext(GlobalContext);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
