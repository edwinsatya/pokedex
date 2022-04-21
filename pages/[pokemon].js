import Layout from "../components/layout/Layout";
import client from "../lib/apollo-client";
import getChanceCatchPokemon from "../helpers/getChanceCatchPokemon";
import { GET_POKEMON } from "../graphQl/queries";
import { useRouter } from "next/router";

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

  const handleCatchPokemon = () => {
    if (getChanceCatchPokemon()) {
      const currentLocal = JSON.parse(localStorage.getItem("owned")) ?? {};
      currentLocal[pokemon.id] = [
        ...(currentLocal[pokemon.id] ?? []),
        pokemon.name,
      ];

      localStorage.setItem("owned", JSON.stringify(currentLocal));
    } else {
      console.log("gagal tangkap");
    }
  };

  return (
    <Layout
      title="Pokemon Details"
      desc="This page about detail of pokemon, you can catch them!"
    >
      <div className="text-white">
        <h1>{pokemon.name}</h1>
        <button onClick={handleCatchPokemon}>Catch This</button>
        <button onClick={() => router.push("/")}>back</button>
      </div>
    </Layout>
  );
}
