import { useMemo } from "react";

const useGetMovePokemon = (moves) => {
  return useMemo(() => {
    return moves.map(({ move }) => ({
      name: move.name,
      color: "gray",
    }));
  }, [moves]);
};

export default useGetMovePokemon;
