import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux'; //para despachar acciones al store
import Card from "../Card/Card";
import { searchCountries } from '../../Redux/actions/actions';
import styles from "../Cards/Cards.module.css";

const Cards = ({ countries, selectedContinent, selectedActivity, currentPage, onPageChange }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //si no hay un continente y no hay una actividad, despacha la accion de buscar paises
    if (!selectedContinent && !selectedActivity) {
      dispatch(searchCountries());
    }
  }, [dispatch, selectedContinent, selectedActivity, currentPage]);

  //filtro los paises SEGUN CONTINENTE Y ACTIVIDAD y retorna una lista con ellos gracias a filter:
  const filteredCountries = countries.filter((country) => {

    //verifica si el continente seleccionado coincide con el pais sacado de country
    const isContinentMatch = selectedContinent ? country.continents === selectedContinent : true;

    //verifica si el pais tiene una actividad que coincide con la seleccionada
    const isActivityMatch = selectedActivity ? country.activities.some((activity) => activity.name === selectedActivity) : true;


    return isContinentMatch && isActivityMatch;
  });

  //para mostrar de 10 en 10 con el paginado:
  const itemsPerPage = 10; 
  //aqui calculo el indice de inicio para la paginacion:
  const startIndex = (currentPage - 1) * itemsPerPage; 
  //y el indice final:
  const endIndex = startIndex + itemsPerPage;

  //gracias a slice, obtengo una "porcion" de los paises:
  const visibleCountries = filteredCountries.slice(startIndex, endIndex);

  //calculo las paginas necesarias para mostrar todos los paises, redondeo hacia arriba con .ceil para que si quedan paises que no llenan la ultima pagina, se genere una más:
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  //para manejar el cambio de pagina al hacer click en los botones:
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const renderPagination = () => {
    const pagesToShow = 5;
    const totalGroups = Math.ceil(totalPages / pagesToShow);
    const currentGroup = Math.ceil(currentPage / pagesToShow);
  
    const startPage = (currentGroup - 1) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  
    const buttons = [];
  
    if (currentGroup > 1) {
      buttons.push(
        <button
          key="prevGroup"
          onClick={() => handlePageChange(startPage - 1)}
        >
          ...
        </button>
      );
    }
  
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          className={currentPage === i ? styles.currentPage : ''}
        >
          {i}
        </button>
      );
    }
  
    if (currentGroup < totalGroups) {
      buttons.push(
        <button
          key="nextGroup"
          onClick={() => handlePageChange(endPage + 1)}
        >
          ...
        </button>
      );
    }
  
    return buttons;
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

        {renderPagination()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className={styles.container}>
        {visibleCountries.map((country) => (
          <Card key={country.id} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Cards;