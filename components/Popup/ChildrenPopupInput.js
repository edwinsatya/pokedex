import { useRef, useState } from "react";
import { UseGlobalContext } from "../../store/context";
import { useRouter } from "next/router";

export default function ChildrenPopupInput({ dataProps }) {
  const { state, dispatch } = UseGlobalContext();
  const [isValid, setIsValid] = useState(true);
  const Router = useRouter();
  const inputRef = useRef("");

  const checkValidation = () => {
    let flag = true;

    for (const property in state.myPokemon) {
      const currentPokemon = state.myPokemon[property];
      if (
        currentPokemon.some(
          (pokemon) =>
            pokemon.nick.toLowerCase() === inputRef.current.value.toLowerCase()
        )
      ) {
        flag = false;
      }
    }
    return flag;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkValidation()) {
      dispatch({
        type: "SET_STATE_POKEMON",
        value: { ...dataProps, nick: inputRef.current.value },
      });
      dispatch({
        type: "SET_SHOW_POPUP",
        value: { isShow: false, children: <p></p>, title: "" },
      });
      inputRef.current.value = "";
      Router.push("/my-pokemon");
    } else {
      setIsValid(false);
      inputRef.current.blur();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The Pokemon you get is a `{dataProps.name}`, please enter the nick name
        in the below
      </p>

      <input
        ref={inputRef}
        type="text"
        className="border border-cyan-600 w-full p-3 md:p-4 rounded-lg mt-3"
        placeholder="Input pokemon nick name"
        required
        onFocus={() => setIsValid(true)}
      />

      <p className={`${isValid ? "hidden" : "block"} text-red-500 mt-2`}>
        Nick already used
      </p>
    </form>
  );
}
