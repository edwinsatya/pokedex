import Image from "next/image";
import logoImg from "../../public/assets/images/logo.png";
import Menu from "../buttons/Menu";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white w-full flex justify-center">
      <nav
        className="relative flex justify-center items-center w-full md:justify-start py-2 px-5 md:px-12"
        style={{ maxWidth: "1440px" }}
      >
        <Menu className="absolute flex items-center justify-center w-7 h-5 left-6 md:hidden" />
        <div
          className="relative w-28 h-10 md:w-40 md:h-14 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logoImg}
            alt="logo"
            layout={"fill"}
            quality={100}
            priority
          />
        </div>
      </nav>
    </header>
  );
}
