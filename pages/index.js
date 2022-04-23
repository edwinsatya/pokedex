import Layout from "../components/layout/Layout";
import CardWrapper from "../components/card/CardWrapper";
import Card from "../components/card/Card";
import Button from "../components/buttons/Button";
import Loading from "../components/loading/Loading";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphQl/queries";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { UseGlobalContext } from "../store/context";

export default function Home() {
  const Router = useRouter();
  const { state, dispatch } = UseGlobalContext();
  const [listPokemon, setListPokemon] = useState([]);

  const { data, error, loading, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 12,
      offset: 0,
    },
  });

  const handleShowMore = () => {
    const offsetLimit = data.pokemons.next.split("?")[1].split("&");
    const newOffset = parseInt(offsetLimit[0].split("=")[1]);
    fetchMore({
      variables: {
        limit: 12,
        offset: newOffset,
      },
    });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_STATE_POKEMON" });
      const newListPokemon = data.pokemons.results;
      setListPokemon(newListPokemon);
    }
  }, [data, dispatch]);

  const getPokemonsWithOwned = useMemo(() => {
    const owned = typeof window !== "undefined" ? state.myPokemon : {};

    return listPokemon.map((pokemon) => {
      return {
        ...pokemon,
        owned: owned[pokemon.id]?.length ?? 0,
      };
    });
  }, [listPokemon, state]);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout title="Pokédex" desc="Pokédex | This page about list of pokemons">
      <div className="flex flex-col">
        <CardWrapper>
          {getPokemonsWithOwned.map((pokemon) => (
            <Card
              key={pokemon.id}
              onClick={() => Router.push(`/${pokemon.name}`)}
              dataProps={pokemon}
            ></Card>
          ))}
        </CardWrapper>
        <Button
          className="rounded-xl w-full max-w-2xl border border-cyan-600 text-blue-300 text-sm font-bold shadow-lg shadow-cyan-700 cursor-pointer transition ease-in-out hover:bg-blue-300 hover:text-black hover:shadow-none duration-150 mx-auto py-2 lg:py-5 lg:my-3 lg:text-xl"
          title="Show more Pokémon"
          onClick={handleShowMore}
        />
      </div>
    </Layout>
  );
}
