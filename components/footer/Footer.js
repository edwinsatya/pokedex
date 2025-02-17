export default function Footer() {
  return (
    <div className="w-full p-4 text-xs font-bold text-center text-black bg-white md:text-xl">
      Copyright &copy; {new Date().getFullYear()} pokedex.touchsimpledev.com | All
      rights reserved.
    </div>
  );
}
