export default function TypeDetailContent({ children, titleType }) {
  return (
    <div className="w-full mt-10 flex flex-col">
      <div className="w-full text-center">
        <h3 className="font-medium text-xl">{titleType}</h3>
      </div>
      <div
        className={`flex justify-around mx-auto flex-wrap ${
          titleType === "Types" ? "max-w-md" : "max-w-6xl"
        } w-full rounded-lg px-2 py-5 mt-5 shadow-xl shadow-cyan-600`}
      >
        {children}
      </div>
    </div>
  );
}
