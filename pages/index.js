import Layout from "../components/layout/Layout";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphQl/query";

export default function Home() {
  // const variables = {
  //   limit: 12,
  //   offset: 0,
  // };

  // const { data, error, loading } = useQuery(pokemons, {
  //   variables,
  // });

  const variables = {
    name: "bulbasaur",
  };

  const { data, error, loading } = useQuery(GET_POKEMON, {
    variables,
  });

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log("loading");
  }

  if (data) {
    console.log(data);
  }

  return (
    <Layout title="Home" desc="this page about list pokemon">
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
    </Layout>
  );
}
