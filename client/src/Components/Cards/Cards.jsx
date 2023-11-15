import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';  // Asegúrate de importar useDispatch
import { searchCountries } from '../../Redux/actions/actions';
import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css";
import { Link } from "react-router-dom";

const Cards = ({ countries, selectedContinent, selectedActivity }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCountries(selectedContinent)); // Pasa el continente seleccionado a la acción
  }, [dispatch, selectedContinent]);

  const filteredCountries = countries.filter((country) => {
    const isContinentMatch = !selectedContinent || country.continents === selectedContinent;
    const isActivityMatch =
      !selectedActivity || country.activities.some((activity) => activity.name === selectedActivity);
  
    return isContinentMatch && isActivityMatch;
  });

    

  return (
    <div>
      <div className={styles.container}>
        {filteredCountries.map((country) => (
          <Card key={country.id} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
