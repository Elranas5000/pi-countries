import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from "../Card/Card";
import { searchCountries } from '../../Redux/actions/actions';
import styles from "../Cards/Cards.module.css";

const Cards = ({ countries, selectedContinent, selectedActivity, currentPage, onPageChange }) => {
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  useEffect(() => {
    if (!selectedContinent && !selectedActivity) {
      dispatch(searchCountries());
    }
  }, [dispatch, selectedContinent, selectedActivity, currentPage]);

  const filteredCountries = countries.filter((country) => {
    const isContinentMatch = !selectedContinent || country.continents === selectedContinent;
    const isActivityMatch =
      !selectedActivity || country.activities.some((activity) => activity.name === selectedActivity);

    return isContinentMatch && isActivityMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleCountries = filteredCountries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div>
      {filteredCountries.length === 0 && (
        <div>
          <p>Country not found</p>
        </div>
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.container}>
        {visibleCountries.map((country) => (
          <Card key={country.id} country={country} />
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;
