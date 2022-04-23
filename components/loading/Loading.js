import Image from "next/image";
import ImgLoading from "../../public/assets/images/Spinner-1s-211px.gif";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-[#F1F2F3] flex justify-center items-center">
      <div className="relative bg-white w-52 h-52">
        <Image
          src={ImgLoading}
          alt="loading"
          layout="fill"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
