import Layout from "../components/layout/Layout";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphQl/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
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
      const newListPokemon = data.pokemons.results;
      console.log(newListPokemon);
      setListPokemon(newListPokemon);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <p>loading..</p>;
  }

  return (
    <Layout title="Home" desc="this page about list pokemon">
      <div>
        {listPokemon.map((pokemon) => (
          <div key={pokemon.id} onClick={() => router.push(`/${pokemon.name}`)}>
            <p>{pokemon.name}</p>
            <img
              src={`${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}`}
              alt="poke"
            />
          </div>
        ))}
      </div>
      <button onClick={() => handleShowMore()}>show more</button>
    </Layout>
  );
}
