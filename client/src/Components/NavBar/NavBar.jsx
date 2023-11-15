import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  return (
    <nav>
      <SearchBar /> {/*este componente se dedica a renderizar la searchbar */}
    </nav>
  );
};

export default NavBar;
