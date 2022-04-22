import Layout from "../components/layout/Layout";
import client from "../lib/apollo-client";
import getChanceCatchPokemon from "../helpers/getChanceCatchPokemon";
import { GET_POKEMON } from "../graphQl/queries";
import { useRouter } from "next/router";
import { UseGlobalContext } from "../store/context";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const params = context.params.pokemon;
  const { data } = await client.query({
    query: GET_POKEMON,
    variables: {
      name: params,
    },
  });

  return {
    props: {
      pokemon: data.pokemon,
    },
  };
}

export default function Pokemon({ pokemon }) {
  const router = useRouter();
  const { state, dispatch } = UseGlobalContext();

  useEffect(() => {
    if (Object.keys(state.myPokemon).length > 0) {
      localStorage.setItem("owned", JSON.stringify(state.myPokemon));
    }
  }, [state]);

  const handleCatchPokemon = () => {
    if (getChanceCatchPokemon()) {
      dispatch({
        type: "SET_STATE",
        value: {
          pokemonId: pokemon.id,
          pokemonNickName: pokemon.name,
        },
      });
    } else {
      console.log("gagal tangkap");
    }
  };

  return (
    <Layout
      title={`${pokemon.name} Details`}
      desc={`This page about detail of ${pokemon.name}, you can catch them!`}
    >
      <div className="text-white">
        <h1>{pokemon.name}</h1>
        <button onClick={handleCatchPokemon}>Catch This</button>
        <button onClick={() => router.push("/")}>back</button>
      </div>
    </Layout>
  );
}
