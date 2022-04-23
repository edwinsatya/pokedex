import { useMemo } from "react";

const getColorType = (color) => {
  switch (color) {
    case "normal":
      return "#DADADA";
    case "fighting":
      return "#994E0A";
    case "flying":
      return "#09141E";
    case "poison":
      return "#D28CD2";
    case "ground":
      return "#FAC85A";
    case "rock":
      return "#FAC85A";
    case "bug":
      return "#46C846";
    case "ghost":
      return "#A08CFF";
    case "steel":
      return "#AAC8F0";
    case "fire":
      return "red";
    case "water":
      return "#13ADEF";
    case "grass":
      return "rgb(145, 190, 25)";
    case "electric":
      return "#FFE100";
    case "psychic":
      return "#994E0A";
    case "ice":
      return "#14F5FF";
    case "dragon":
      return "#FF6900";
    case "dark":
      return "#000000";
    case "fairy":
      return "#FFAFDC";
    case "unknown":
      return "#787878";
    case "shadow":
      return "#787878";
    default:
      return "gray";
  }
};

const useGetTypePokemon = (types) => {
  return useMemo(() => {
    return types.map(({ type }) => ({
      name: type.name,
      color: getColorType(type.name),
    }));
  }, [types]);
};

export default useGetTypePokemon;
