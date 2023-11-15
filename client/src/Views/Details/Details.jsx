import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = () => {
  const { idPais } = useParams();
  const countries = useSelector((state) => state.countries);

  // Buscar el país por id en la lista de países
  const country = countries.find((c) => c.id === idPais); //c siendo country

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      <h2>{country.name} {`(${country.id})`}</h2>
      <img src={country.flag_image} alt={`Flag of ${country.name}`} />
      <p>Continent: {country.continents}</p>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
    </div>
  );
};

export default Details;


