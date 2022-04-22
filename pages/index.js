import Layout from "../components/layout/Layout";
import CardWrapper from "../components/card/CardWrapper";
import Card from "../components/card/Card";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphQl/queries";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { UseGlobalContext } from "../store/context";

export default function Home() {
  const router = useRouter();
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
    // const limit = parseInt(offsetLimit[1].split("=")[1]);
    fetchMore({
      variables: {
        limit: 12,
        offset: newOffset,
      },
    });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_STATE" });
      const newListPokemon = data.pokemons.results;
      setListPokemon(newListPokemon);
    }
  }, [data]);

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
    return <p>loading..</p>;
  }

  return (
    <Layout title="Home" desc="this page about list of pokemons">
      <div>
        <CardWrapper>
          {getPokemonsWithOwned.map((pokemon) => (
            <Card
              key={pokemon.id}
              onClick={() => router.push(`/${pokemon.name}`)}
              dataProps={pokemon}
            ></Card>
          ))}
        </CardWrapper>
      </div>
      <button className="text-white" onClick={() => handleShowMore()}>
        show more
      </button>
    </Layout>
  );
}
