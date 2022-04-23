import Image from "next/image";
import logoImg from "../../public/assets/images/logo.png";
import Menu from "../buttons/Menu";
import { useRouter } from "next/router";

export default function Header() {
  const Router = useRouter();

  return (
    <header className="bg-white w-full flex justify-center">
      <nav
        className="relative flex justify-center items-center w-full md:justify-start py-2 px-5 md:px-12"
        style={{ maxWidth: "1440px" }}
      >
        <Menu className="absolute flex items-center justify-center w-7 h-5 left-6 md:hidden" />
        <div
          className="relative w-28 h-10 md:w-40 md:h-14 cursor-pointer"
          onClick={() => Router.push("/")}
        >
          <Image
            src={logoImg}
            alt="logo"
            layout={"fill"}
            quality={100}
            priority
          />
        </div>
        <div className="ml-7 relative">
          <div
            className={`p-3 rounded-t-lg  ${
              Router.pathname === "/my-pokemon"
                ? "bg-cyan-600 text-white"
                : "text-cyan-600"
            }`}
          >
            <ul className="flex flex-col justify-center items-center">
              <li
                className={`text-lg h-7 font-semibold  cursor-pointer`}
                onClick={() => Router.push("/my-pokemon")}
              >
                My Pokemon
              </li>
              {Router.pathname !== "/my-pokemon" && (
                <li className="h-1 w-full bg-cyan-600 translate-y-2"></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
