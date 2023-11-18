import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = ({ onSearchResults }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const countries = useSelector((state) => state.countries);

  const handleSearch = () => {
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearchResults(results); 
  };

  useEffect(() => {
    handleSearch(); 
  }, [searchTerm]); 

  const handleKeyPress = (e) => {
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
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
