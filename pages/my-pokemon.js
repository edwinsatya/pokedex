import Button from "../components/buttons/Button";
import Layout from "../components/layout/Layout";
import CardWrapper from "../components/card/CardWrapper";
import Card from "../components/card/Card";
import { useEffect, useMemo } from "react";
import { UseGlobalContext } from "../store/context";
import { useRouter } from "next/router";

export default function MyPokemon() {
  const Router = useRouter();
  const { state, dispatch } = UseGlobalContext();

  const getComputedListPokemon = useMemo(() => {
    const listPokemon = [];
    for (const property in state.myPokemon) {
      listPokemon = [...listPokemon, ...state.myPokemon[property]];
    }
    return listPokemon;
  }, [state]);

  const handleRelease = (pokemon) => {
    const newArr = [...state.myPokemon[pokemon.id]];
    let indexVal = 0;

    state.myPokemon[pokemon.id].forEach((obj, idx) => {
      if (obj.nick === pokemon.nick) {
        indexVal = idx;
      }
    });
    newArr.splice(indexVal, 1);
    const payload = {
      id: pokemon.id,
      newArr,
    };
    dispatch({ type: "RELEASE_POKEMON", value: payload });
    dispatch({ type: "SET_LOCAL_STORAGE" });
  };

  useEffect(() => {
    dispatch({ type: "GET_STATE_POKEMON" });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout
      title="My pokemon | Pokédex"
      desc="This page about list of your pokémons"
    >
      <div className="flex flex-col">
        {getComputedListPokemon.length === 0 ? (
          <div className="h-screen w-full text-white flex justify-center items-center font-extrabold text-lg md:text-2xl text-center">
            <h2>You dont have any pokémon right now</h2>
          </div>
        ) : (
          <CardWrapper>
            {getComputedListPokemon.map((pokemon, idx) => (
              <Card
                key={idx}
                onClick={(e) => {
                  if (e === "detail") {
                    Router.push(`/${pokemon.name}`);
                  } else if (e === "release") {
                    handleRelease(pokemon);
                  }
                }}
                dataProps={pokemon}
              ></Card>
            ))}
          </CardWrapper>
        )}

        <Button
          className="my-5 rounded-xl w-full max-w-2xl border border-cyan-600 text-blue-300 text-sm font-bold shadow-lg shadow-cyan-700 cursor-pointer transition ease-in-out hover:bg-blue-300 hover:text-black hover:shadow-none duration-150 mx-auto py-2 lg:py-5 lg:my-12 lg:text-xl"
          title="Back to Pokédex"
          onClick={() => Router.push("/")}
        />
      </div>
    </Layout>
  );
}
