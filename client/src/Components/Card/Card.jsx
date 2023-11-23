import React from 'react';
import styles from '../Card/Card.module.css';
import { Link } from 'react-router-dom';

const linkStyleRemover = { //para quitar el estilo de "link" que se le pone al texto de la card
  textDecoration: 'none',
  color: '#ddd',
};

const Card = ({ country }) => {
  const { flag_image, name, continents} = country;

  return (
    <Link style={linkStyleRemover} to={`/home/${country.id}`}>
      <div className={styles.container}>

        <div className={styles.flagContainer}>
          {flag_image && <img src={flag_image} alt={`${name} flag`} className={styles.flagImage} />}
        </div>

        <div className={styles.textContainer}>
          {name && <h3>{name}</h3>}
          {continents && <h4>{continents}</h4>}
        </div>
        
      </div>
    </Link>
  );
};

export default Card;

