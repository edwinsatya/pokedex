export default function Button({ className, title, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <span className="w-full">{title}</span>
    </button>
  );
}
