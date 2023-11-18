import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to={"/home"}>
        <button>
          Home
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
