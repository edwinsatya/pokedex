import Image from "next/image";
import logoImg from "../../public/assets/images/logo.png";
import Menu from "../buttons/Menu";

export default function Header() {
  return (
    <header className="flex py-2 px-5">
      <div className="relative flex justify-center items-center w-full">
        <Menu className="absolute flex items-center justify-center w-7 h-5 left-0 md:hidden" />
        <div className="block w-28 h-10">
          <Image src={logoImg} alt="logo" layout={"responsive"} priority />
        </div>
      </div>
    </header>
  );
}
