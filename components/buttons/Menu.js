import { useState } from "react";

export default function Menu({ className, onClick }) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    onClick();
  };

  return (
    <div
      className={`${className} nav-icon ${toggle ? "open" : ""}`}
      onClick={handleToggle}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
