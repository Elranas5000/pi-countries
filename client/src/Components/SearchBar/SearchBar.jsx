import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState(''); //almacena el termino de busqueda que el usuario ingresa en el input

  const countries = useSelector((state) => state.countries); //usa useSelectro para obtener la lista de countries del estado global

  //para filtrar paises cuyos nombres tengan en si el termino buscado en el input
  const handleSearch = () => {
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) //independiete de mayus o minus
    );
    onSearchResults(results); //llamo a onSearchResults con los resultados de la busqueda
  };

  //cada vez que lo ingresado en el input cambie:
  useEffect(() => {
    handleSearch();  //llamo a handleSearch y filtro, esto es para que se busque "en vivo"
  }, [searchTerm]); 

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
