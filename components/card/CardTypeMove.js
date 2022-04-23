export default function CardTypeMove({ dataProps }) {
  const { name, color } = dataProps;
  console.log(color);
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className={`w-32 py-1 px-3 mx-2 rounded-full text-center capitalize font-semibold flex items-center mt-4`}
    >
      <div className="w-4 h-4 border-2 border-white rounded-full"></div>
      <p className="ml-2">{name}</p>
    </div>
  );
}
