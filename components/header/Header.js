import Image from "next/image";
import logoImg from "../../public/assets/images/logo.png";

export default function Header() {
  return (
    <header className="flex py-2 px-5">
      <div className="relative flex justify-center items-center w-full">
        <div className="absolute w-10 left-0 bg-red-400">menu</div>
        <div className="block w-28 h-10">
          <Image src={logoImg} alt="logo" layout={"responsive"} priority />
        </div>
      </div>
    </header>
  );
}
