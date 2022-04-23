import Styles from "../../styles/Pokemon.module.css";
import Image from "next/image";
import CircleBg1 from "../../public/assets/images/bg-detail-circle.png";
import CircleBg2 from "../../public/assets/images/bg-detail-circle-2.png";

export default function ImageDetailContent({ windowSizeWidth, pokemonId }) {
  return (
    <div className="w-full flex justify-between items-start relative h-96 md:items-center">
      <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`${
            windowSizeWidth > 768 ? Styles.rotating : ""
          } w-96 h-96 relative`}
        >
          <Image
            src={CircleBg2}
            layout="fill"
            alt="bg"
            priority
            quality={100}
          />
        </div>
      </div>
      <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 relative">
          <Image
            src={CircleBg1}
            layout="fill"
            alt="bg"
            priority
            quality={100}
          />
        </div>
      </div>
      <div className="w-96 h-96 absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`${
            windowSizeWidth > 768 ? Styles.scaling : ""
          } w-52 h-52 relative`}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt="card-img"
            layout="fill"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}
