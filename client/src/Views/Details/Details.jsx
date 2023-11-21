import React, { useEffect, useState } from 'react'; //useState para manejar el estado, useEffect para efectuar cambios una vez montado el componente

import { useParams, Link } from 'react-router-dom'; //useParams para obtener parametros de la URL

import { useSelector } from 'react-redux';//uso useSelector para fijarme solo en el valor de "countries" dentro del estado

import styles from "../Details/Details.module.css";

const Details = () => {
  const { idPais } = useParams(); //acá uso useParams para acceder a la id del Pais y poder renderizarlo luego.

  const countries = useSelector((state) => state.countries); 

  const [country, setCountry] = useState(null); //useState para declarar country, y setCountry para poder actualizar el valor

  useEffect(() => {
    // obtiene el pais de localStorage
    const storedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

    //si lo encuentra en localStorage, actualiza el estado con ese pais encontrado:
    if (storedCountry && storedCountry.id === idPais) {
      setCountry(storedCountry);
    } else { // si no se encuentra en localStorage lo buscara en la lista de países
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

      <div className={styles.infoContainer}>

        <h2>{country.name} {`(${country.id})`}</h2> {/* muestro ID gracias a useParams */}

        <img src={country.flag_image} alt={`Flag of ${country.name}`} />
        
        <div className={styles.detailInfoContainer}>

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


