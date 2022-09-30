import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavLinks(props) {
  const [firstDrop, setfirstDrop] = useState(false);

  useEffect(() => {
    console.log(props);
  });

  const toggleDrop = () => {
    if (firstDrop) {
      setfirstDrop(false);
    } else {
      setfirstDrop(true);
    }
    console.log(firstDrop);
  };
  return (
    <div>
      <p
        className="py-3 text-gray-500 hover:text-gray-700 px-3"
        onClick={toggleDrop}
      >
        <a className="pt-3 text-lg">{props.title}</a>
      </p>
      {firstDrop ? props.children : <></>}
    </div>
  );
}

export default NavLinks;
