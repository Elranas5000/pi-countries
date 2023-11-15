import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries } from '../../Redux/actions/actions';
import Card from "../Card/Card"
import styles from "../Cards/Cards.module.css"
import {Link} from "react-router-dom"

const Cards = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);

  useEffect(() => {
    dispatch(searchCountries());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.container}>
        {countries.map(country => (
          <Card key={country.id} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
