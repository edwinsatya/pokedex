import Layout from "../components/layout/Layout";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphQl/queries";
import { useState, useEffect } from "react";

export default function Home() {
  const [listPokemon, setListPokemon] = useState([]);
  const [offset, setOffset] = useState(0);

  const variables = {
    limit: 12,
    offset,
  };

  const { data, error, loading, fetchMore } = useQuery(GET_POKEMONS, {
    variables,
  });

  const handleShowMore = () => {
    const offsetLimit = data.pokemons.next.split("?")[1].split("&");
    const offset = parseInt(offsetLimit[0].split("=")[1]);
    // const limit = parseInt(offsetLimit[1].split("=")[1]);
    fetchMore({
      variables: {
        limit: 12,
        offset,
      },
    });
  };

  useEffect(() => {
    console.log("trigger");
    if (data) {
      let newListPokemon = [...listPokemon, ...data.pokemons.results];
      console.log(data);
      setListPokemon(newListPokemon);

      // setVariables({
      //   limit,
      //   offset,
      // });
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
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      <div>
        {listPokemon.map((pokemon) => (
          <p key={pokemon.id}>{pokemon.name}</p>
        ))}
      </div>
      <button onClick={() => handleShowMore()}>show more</button>
    </Layout>
  );
}
