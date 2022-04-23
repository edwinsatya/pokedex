import Image from "next/image";
import useComputedId from "../../helpers/useGetComputedId";
import Button from "../buttons/Button";

export default function Card({ dataProps, onClick }) {
  const { name, owned, id, nick } = dataProps;

  const computedId = useComputedId(id);

  const classNumberOwned = (owned) => {
    if (owned > 0) {
      return "text-yellow-400";
    }
    return "text-gray-400";
  };

  return (
    <div className="w-full mb-7 overflow-hidden text-white border-2 border-cyan-700 rounded-2xl shadow-lg shadow-cyan-700 flex flex-col items-center justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-600 hover:shadow-none duration-150 sm:w-64 xl:w-72">
      <div
        className="card-image w-60 h-52 sm:w-60 lg:w-72 relative cursor-pointer"
        onClick={() => onClick("detail")}
      >
        {/* image wrapper */}
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt="card-img"
          layout="fill"
          quality={100}
          priority
        />
      </div>
      <div
        className="p-3 w-full"
        style={{
          backgroundColor: "rgba(0, 255, 255, 0.2)",
        }}
      >
        {/* description */}
        <p className="text-cyan-300 text-lg xl:text-xl">{computedId}</p>
        <p className="capitalize font-bold text-xl xl:text-2xl">{name}</p>
        {nick ? (
          <>
            <p className="capitalize text-blue-300 text-base xl:text-lg">
              {nick}
            </p>
            <Button
              title="Release"
              className="bg-red-600 py-2 px-3 rounded mt-2"
              onClick={() => onClick("release")}
            />
          </>
        ) : (
          <p className="flex items-center">
            <span className="text-blue-300 text-base xl:text-lg"> Owned :</span>
            <span
              className={`${classNumberOwned(
                owned
              )} font-semibold text-4xl ml-2`}
            >
              {owned}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
