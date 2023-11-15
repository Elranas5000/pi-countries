import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountriesByName } from '../../Redux/actions/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(searchCountriesByName(searchTerm));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
