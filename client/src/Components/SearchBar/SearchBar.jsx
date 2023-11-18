import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountriesByName } from '../../Redux/actions/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(searchCountriesByName(searchTerm));
  };

  const handleKeyPress = (e) => {
    //verifica si presiono enter
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} // si presiono enter, tambien busca
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
