import Styles from "../styles/Pokemon.module.css";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import client from "../lib/apollo-client";
import Button from "../components/buttons/Button";
// import Button from "../components/buttons/Button";
import CardTypeMove from "../components/card/CardTypeMove";
import getChanceCatchPokemon from "../helpers/getChanceCatchPokemon";
import CircleBg1 from "../public/assets/images/bg-detail-circle.png";
import CircleBg2 from "../public/assets/images/bg-detail-circle-2.png";
import useComputedId from "../helpers/useGetComputedId";
import useGetComputedTypePokemon from "../helpers/useGetComputedTypePokemon";
import useGetMovePokemon from "../helpers/useGetComputedMovePokemon copy";
import { GET_POKEMON } from "../graphQl/queries";
import { useRouter } from "next/router";
import { UseGlobalContext } from "../store/context";
import { useEffect, useState } from "react";

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
  const [windowSize, setWindowSize] = useState({});

  const computedId = useComputedId(pokemon.id);
  const computedTypes = useGetComputedTypePokemon(pokemon.types);
  const computedMoves = useGetMovePokemon(pokemon.moves);

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

  useEffect(() => {
    if (Object.keys(state.myPokemon).length > 0) {
      localStorage.setItem("owned", JSON.stringify(state.myPokemon));
    }

    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [state]);

  return (
    <Layout
      title={`${pokemon.name} Details`}
      desc={`This page about detail of ${pokemon.name}, you can catch them!`}
    >
      <div className="text-white flex flex-col justify-center items-center w-full h-full">
        <div className="text-center">
          <p className="text-cyan-300 font-bold text-2xl lg:text-3xl capitalize">
            {pokemon.name}
          </p>
          <p className="text-xl lg:text-2xl mt-3">{computedId}</p>
        </div>

        <div className="w-full flex flex-col relative">
          <div className="w-full flex justify-between items-start relative h-96 md:items-center">
            <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={`${
                  windowSize.width > 768 ? Styles.rotating : ""
                } w-96 h-96 relative`}
              >
                <Image src={CircleBg2} layout="fill" alt="bg" />
              </div>
            </div>
            <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 relative">
                <Image src={CircleBg1} layout="fill" alt="bg" />
              </div>
            </div>
            <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={`${
                  windowSize.width > 768 ? Styles.scaling : ""
                } w-52 h-52 relative`}
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt="card-img"
                  layout="fill"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-10 flex flex-col">
            <div className="w-full text-center">
              <h3 className="font-medium text-xl">Tipe</h3>
            </div>
            <div className="flex justify-around mx-auto flex-wrap max-w-md w-full rounded-lg px-2 py-5 mt-5 shadow-xl shadow-cyan-600">
              {computedTypes.map((type, idx) => (
                <CardTypeMove
                  key={idx}
                  className="w-32 flex items-center"
                  dataProps={type}
                  withDot={true}
                />
              ))}
            </div>
          </div>

          <div className="w-full mt-10 flex flex-col">
            <div className="w-full text-center">
              <h3 className="font-medium text-xl">Move</h3>
            </div>
            <div className="flex justify-around mx-auto flex-wrap w-full max-w-4xl rounded-lg px-2 py-5 mt-5 shadow-xl shadow-cyan-600">
              {computedMoves.map((type, idx) => (
                <CardTypeMove
                  key={idx}
                  className="w-40 flex justify-center items-center"
                  dataProps={type}
                  withDot={false}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          className="my-5 rounded-xl w-full max-w-2xl border border-cyan-600 text-blue-300 text-sm font-bold shadow-lg shadow-cyan-700 cursor-pointer transition ease-in-out hover:bg-blue-300 hover:text-black hover:shadow-none duration-150 mx-auto py-2 lg:py-5 lg:my-12 lg:text-xl"
          title="Kembali ke Pokédex"
          onClick={() => router.push("/")}
        />
      </div>

      {/* <h1>{pokemon.name}</h1>
        <button onClick={handleCatchPokemon}>Catch This</button>
        <button onClick={() => router.push("/")}>back</button> */}
    </Layout>
  );
}
