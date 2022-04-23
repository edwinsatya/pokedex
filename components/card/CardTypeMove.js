export default function CardTypeMove({ className, dataProps, withDot }) {
  const { name, color } = dataProps;
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className={`${className} py-1 px-2 mx-2 rounded-full text-center capitalize font-semibold my-2`}
    >
      {withDot && (
        <div className="w-4 h-4 border-4 border-white rounded-full"></div>
      )}
      <p className="ml-2">{name}</p>
    </div>
  );
}
