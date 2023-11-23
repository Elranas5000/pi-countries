import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from "../../Components/Cards/Cards";
import { searchCountriesByActivity } from '../../Redux/actions/actions';
import { Link } from 'react-router-dom';
import styles from "../Home/Home.module.css"
import SearchBar from '../../Components/SearchBar/SearchBar';
import gifImage from "../../assets/worldIcon.png"

const Home = () => {
  const countries = useSelector((state) => state.countries); //para obtener la lista de countries
  const dispatch = useDispatch(); //para despachar acciones a la store

  //useState para gestionar los estados:
  const [sortType, setSortType] = useState('name'); // tipo de filtrado: por nombre o poblacion, incicia en nombre

  const [sortDirection, setSortDirection] = useState('asc'); // ordenamiento, empieza en ascendente

  const [selectedContinent, setSelectedContinent] = useState(''); // guarda el continente seleccionado

  const [selectedActivity, setSelectedActivity] = useState(''); //guarda la actividad seleccionada

  const [searchResults, setSearchResults] = useState([]); //guarda los resultados de la busqueda

  const [currentPage, setCurrentPage] = useState(1); // numero de la pagina actual


  //funciones para manipular ese estado:
  const handleSortTypeChange = (type) => {
    setSortType(type);
    setCurrentPage(1)
  };

  const handleSortDirectionChange = (direction) => {
    setSortDirection(direction);
    setCurrentPage(1)
  };

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    setCurrentPage(1)
  };

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
    dispatch(searchCountriesByActivity("", activity));
    setCurrentPage(1)
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage(1)
  };

  //guardo listas de continentes y actividades a partir de la lista de countries
  //Set es una coleccion de valores unicos, no puede tener duplicados
  //entonces uso ...new Set() para generar un array que extrae en un caso los continentes de countries y en otro sus actividades siempre y cuando no sean undefined
  const continents = [...new Set(countries.map((country) => country.continents))];
  const activities = [...new Set(countries.flatMap((country) => country.activities?.map(activity => activity.name) || []))]; 

  //ordenamiento de countries:
  // es decir, si los resultados de la busqueda > 0, entonces se elige esa lista de paises, sino, se elige la lista completa
  const sortedCountries = [...(searchResults.length > 0 ? searchResults : countries)].sort((a, b) => {  //.sort para comparar entre a y b
    if (sortType === 'name') { //es decir, el tipo de ordenamiento es por nombre?
      // si es ascendente, uso localeCompare para mostrar el orden asc
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name); //de no ser ascendente, intercambio a por b para mostrar el orden descendente
    } else if (sortType === 'population') { //si no es por nombre, es por poblacion
      // si a-b < 0, a se pone antes que b en orden ascendente, si b-a < 0, b se coloca antes en orden descendente.
      return sortDirection === 'asc' ? a.population - b.population : b.population - a.population;
    }
    return 0; //retorno 0 predeterminadamente para que el orden de los elementos no cambie
  });

  //renderizo el componente
  return (
    <div className={styles.container}>

      <div className={styles.NavBar}>


        <Link to={"/"}>
          <img className={styles.globe} src={gifImage} alt="gif" />
        </Link>  

        <h2>Countries of the world</h2>

        <div className={styles.sortFilterContainer}>

          <select onChange={(e) => handleSortTypeChange(e.target.value)} defaultValue="Filter By">
            <option value="Filter By" disabled>Filter by</option>
            <option value="name">Name</option>
            <option value="population">Population</option>
          </select>

          <select onChange={(e) => handleSortDirectionChange(e.target.value)} defaultValue="Order" >
            <option value="Order" disabled>Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <select onChange={(e) => handleContinentChange(e.target.value)} value={selectedContinent}>
            <option key="" value="">
              All continents
            </option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>

          <select onChange={(e) => handleActivityChange(e.target.value)} value={selectedActivity}>
            <option key="activity" value="">
              Filter by activities
            </option>
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>

        </div>

        <SearchBar onSearchResults={handleSearchResults} />

          <Link to={"/form"}>
            <button className={styles.buttonAct}>
              Create an activity!
            </button>
          </Link>

          <Link to={"/delete"}>
            <button>
              Delete an activity
            </button>
          </Link>
      
      </div>

      <div className={styles.cardsContainer}>
          
          {/*muestro cards con las props necesarias como los botones, y los filtros: */}
          <Cards
            countries={sortedCountries}
            selectedContinent={selectedContinent}
            selectedActivity={selectedActivity}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
      </div>

    </div>
  );
};

export default Home;
