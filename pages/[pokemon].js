import Layout from "../components/layout/Layout";
import client from "../lib/apollo-client";
import Button from "../components/buttons/Button";
import CardTypeMove from "../components/card/CardTypeMove";
import getChanceCatchPokemon from "../helpers/getChanceCatchPokemon";
import useComputedId from "../helpers/useGetComputedId";
import useGetComputedTypePokemon from "../helpers/useGetComputedTypePokemon";
import useGetMovePokemon from "../helpers/useGetComputedMovePokemon";
import ImageDetailContent from "../components/pokemonDetail/ImageDetailContent";
import TypeDetailContent from "../components/pokemonDetail/TypeDetailContent";
import ChildrenPopupInput from "../components/Popup/ChildrenPopupInput";
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
  const Router = useRouter();
  const { state, dispatch } = UseGlobalContext();
  const [windowSize, setWindowSize] = useState({});

  const computedId = useComputedId(pokemon.id);
  const computedTypes = useGetComputedTypePokemon(pokemon.types);
  const computedMoves = useGetMovePokemon(pokemon.moves);

  const handleCatchPokemon = () => {
    if (getChanceCatchPokemon()) {
      dispatch({
        type: "SET_SHOW_POPUP",
        value: {
          isShow: true,
          title: "Congrats, Success catch the pokemon",
          children: <ChildrenPopupInput dataProps={pokemon} />,
        },
      });
    } else {
      dispatch({
        type: "SET_SHOW_POPUP",
        value: {
          isShow: true,
          title: "Danger!",
          children: (
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Opps, {`'${pokemon.name}' is running away!`}
            </p>
          ),
        },
      });
    }
  };

  useEffect(() => {
    console.log("tes");
    if (Object.keys(state.myPokemon).length > 0) {
      dispatch({
        type: "SET_LOCAL_STORAGE",
      });
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
      title={`${pokemon.name} | Pokédex`}
      desc={`This page about detail of ${pokemon.name}, you can catch!`}
    >
      <div className="text-white flex flex-col justify-center items-center w-full h-full">
        <div className="text-center">
          <p className="text-cyan-300 font-bold text-2xl lg:text-3xl capitalize">
            {pokemon.name}
          </p>
          <p className="text-xl lg:text-2xl mt-3">{computedId}</p>
        </div>

        <div className="w-full flex flex-col relative">
          <ImageDetailContent
            windowSizeWidth={windowSize.width}
            pokemonId={pokemon.id}
          />

          <Button
            className="my-5 rounded-full w-full max-w-sm text-blue-300 text-sm font-bold cursor-pointer transition ease-in-out hover:bg-yellow-300 hover:text-black hover:shadow-none duration-150 mx-auto py-2 lg:py-5 lg:my-12 lg:text-xl"
            title={`Catch ${pokemon.name}!`}
            onClick={handleCatchPokemon}
          />

          <TypeDetailContent titleType="Types">
            {computedTypes.map((type, idx) => (
              <CardTypeMove
                key={idx}
                className="w-32 flex items-center"
                dataProps={type}
                withDot={true}
              />
            ))}
          </TypeDetailContent>

          <TypeDetailContent titleType="Moves">
            {computedMoves.map((type, idx) => (
              <CardTypeMove
                key={idx}
                className="w-40 flex justify-center items-center"
                dataProps={type}
                withDot={false}
              />
            ))}
          </TypeDetailContent>
        </div>

        <Button
          className="my-5 rounded-xl w-full max-w-2xl border border-cyan-600 text-blue-300 text-sm font-bold shadow-lg shadow-cyan-700 cursor-pointer transition ease-in-out hover:bg-blue-300 hover:text-black hover:shadow-none duration-150 mx-auto py-2 lg:py-5 lg:my-12 lg:text-xl"
          title="Back to Pokédex"
          onClick={() => Router.push("/")}
        />
      </div>
    </Layout>
  );
}
