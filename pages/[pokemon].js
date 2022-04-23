import Layout from "../components/layout/Layout";
import client from "../lib/apollo-client";
import getChanceCatchPokemon from "../helpers/getChanceCatchPokemon";
import Image from "next/image";
import CircleBg1 from "../public/assets/images/bg-detail-circle.png";
import CircleBg2 from "../public/assets/images/bg-detail-circle-2.png";
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
  console.log(pokemon);

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
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="bg-red-500">
            <p>001</p>
            <p>Bulbasaur</p>
          </div>

          <div className="w-full relative h-96 bg-red-600">
            <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-96 h-96 relative">
                <Image src={CircleBg2} layout="fill" alt="bg" />
              </div>
            </div>
            <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 relative">
                <Image src={CircleBg1} layout="fill" alt="bg" />
              </div>
            </div>
            <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-52 h-52 relative">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`}
                  alt="card-img"
                  layout="fill"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
          {/* <div className="relative w-full bg-green-600"></div> */}
        </div>

        {/* <h1>{pokemon.name}</h1>
        <button onClick={handleCatchPokemon}>Catch This</button>
        <button onClick={() => router.push("/")}>back</button> */}
      </div>
    </Layout>
  );
}
