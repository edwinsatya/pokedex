export default function CardWrapper({ children }) {
  return (
    <div className="flex flex-row flex-wrap justify-around w-full">
      {children}
    </div>
  );
}
