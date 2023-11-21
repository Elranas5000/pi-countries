import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from "../Details/Details.module.css";

const Details = () => {
  const { idPais } = useParams();
  const countries = useSelector((state) => state.countries);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    // obtiene el pais de localStorage
    const storedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

    if (storedCountry && storedCountry.id === idPais) {
      setCountry(storedCountry);
    } else {
      // si no se encuentra en localStorage lo buscara en la lista de países
      const foundCountry = countries.find((c) => c.id === idPais);

      if (foundCountry) {
        setCountry(foundCountry);
        // almacena el país en localStorage para futuras visitas
        localStorage.setItem('selectedCountry', JSON.stringify(foundCountry));
      }
    }
  }, [countries, idPais]);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className={styles.container}>

      <div>
        <Link to={"/home"}>
          <button>
            Home
          </button>
        </Link>
      </div>

      <div className={styles.flagContainer}>

        <h2>{country.name} {`(${country.id})`}</h2>

        <img src={country.flag_image} alt={`Flag of ${country.name}`} />
        
        <div className={styles.infoContainer}>

          <div className={styles.detailItem}>
            <h4>Continent:</h4>
            <p>{country.continents}</p>
          </div>

          <div className={styles.detailItem}>
            <h4>Capital:</h4>
            <p>{country.capital}</p>
          </div>

          <div className={styles.detailItem}>
            <h4>Population:</h4>
            <p>{country.population}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Details;


