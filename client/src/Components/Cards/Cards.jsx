import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../Redux/actions/actions'; // Importa la acción
import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css";

const Cards = ({ countries, selectedContinent, selectedActivity }) => {
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(searchCountries(selectedContinent));
  }, [dispatch, selectedContinent]);

  const filteredCountries = countries.filter((country) => {
    const isContinentMatch = !selectedContinent || country.continents === selectedContinent;
    const isActivityMatch =
      !selectedActivity || country.activities.some((activity) => activity.name === selectedActivity);

    return isContinentMatch && isActivityMatch;
  });

  // Calcular el índice inicial y final de los elementos a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleCountries = filteredCountries.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(searchCountries(selectedContinent)); // Actualiza la lista de países al cambiar de página
  };

  return (
    <div>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>

      <div className={styles.container}>
        {visibleCountries.map((country) => (
          <Card key={country.id} country={country} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Cards;