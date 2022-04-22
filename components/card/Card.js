import Image from "next/image";
import { useMemo } from "react";

export default function Card({ dataProps, onClick }) {
  const { name, owned, id } = dataProps;

  const computedId = useMemo(() => {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else if (id < 1000) {
      return `${id}`;
    } else {
      return `${id}`;
    }
  }, [id]);

  return (
    <div
      className="w-full mb-7 text-white border border-cyan-600 rounded-xl shadow-lg shadow-cyan-700 flex flex-col items-center justify-center p-3 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-600 hover:shadow-none duration-150 sm:w-64 sm:mx-auto xl:w-72"
      onClick={onClick}
    >
      <div className="card-image w-60 h-52 sm:w-60 relative">
        {/* image wrapper */}
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt="card-img"
          layout="fill"
          quality={100}
        />
      </div>
      <div className="p-3 w-full">
        {/* description */}
        <p className="text-cyan-300 text-lg xl:text-xl">{computedId}</p>
        <p className="capitalize font-bold text-xl xl:text-2xl">{name}</p>
        <p className="flex items-center">
          <span className="text-blue-300 text-base xl:text-lg"> Owned :</span>
          <span className="font-semibold text-red-700 text-4xl ml-2">
            {" "}
            {owned}
          </span>
        </p>
      </div>
    </div>
  );
}
