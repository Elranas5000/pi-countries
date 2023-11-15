import React from 'react';
import styles from "../Card/Card.module.css"
import { Link } from 'react-router-dom';

const linkStyleRemover = {
  textDecoration: "none",
  color: "#ddd",
}

const Card = ({ country }) => {
  const { flag_image, name, continents, capital } = country;

  return (
    <Link style={linkStyleRemover} to={`/home/${country.id}`}>
      <div className={styles.container}>
        {flag_image && <img src={flag_image} alt={`Bandera de ${name}`} />}
        {name && <h3>{name}</h3>}
        {continents && <h4>Continent: {continents}</h4>}
        {/* {capital && <h4>Capital: {capital}</h4>} */}
      </div>
    </Link>
  );
};

export default Card;

