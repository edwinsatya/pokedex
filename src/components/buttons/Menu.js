import { useState } from "react";

export default function Menu({ className }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={`${className} nav-icon ${toggle ? "open" : ""}`}
      onClick={() => setToggle(!toggle)}
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
