import React from 'react';
import styles from "../Card/Card.module.css"

const Card = ({ country }) => {
  const { flag_image, name, continents, capital } = country;

  return (
    <div className={styles.container}>
      {flag_image && <img src={flag_image} alt={`Bandera de ${name}`} />}
      {name && <h3>{name}</h3>}
      {continents && <h4>Continent: {continents}</h4>}
      {/* {capital && <h4>Capital: {capital}</h4>} */}
    </div>
  );
};

export default Card;

