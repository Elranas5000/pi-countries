import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../Components/NavBar/NavBar';
import Cards from "../../Components/Cards/Cards";
import {  searchCountriesByActivity } from '../../Redux/actions/actions';
import { Link } from 'react-router-dom';
import styles from "../Home/Home.module.css"
import SearchBar from '../../Components/SearchBar/SearchBar';
import gifImage from "../Landing/Rotating_globe.gif"

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [sortType, setSortType] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [searchResults, setSearchResults] = useState([]); 

  const handleSortTypeChange = (type) => {
    setSortType(type);
    setSelectedContinent("");
    setSelectedActivity("");
  };

  const handleSortDirectionChange = (direction) => {
    setSortDirection(direction);
  };

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
  };

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
    dispatch(searchCountriesByActivity("", activity));
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const continents = [...new Set(countries.map((country) => country.continents))];
  const activities = [...new Set(countries.flatMap((country) => country.activities?.map(activity => activity.name) || []))];

  const sortedCountries = [...(searchResults.length > 0 ? searchResults : countries)].sort((a, b) => {
    if (sortType === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortType === 'population') {
      return sortDirection === 'asc' ? a.population - b.population : b.population - a.population;
    }
    return 0;
  });

  // if(searchResults.length === 0){
  //   return null;
  // }

  return (
    <div className={styles.container}>

      <div className={styles.NavBar}>

        <img className={styles.globe} src={gifImage} alt="gif" />

        <h2>Countries of the world</h2>

        <div className={styles.sortFilterContainer}>
          
          <select onChange={(e) => handleSortTypeChange(e.target.value)}>
            <option value="name">Filter by</option>
            <option value="name">Name</option>
            <option value="population">Population</option>
          </select>

          <select onChange={(e) => handleSortDirectionChange(e.target.value)}>
            <option value="asc">Order</option>
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

      </div>

      <div className={styles.cardsContainer}>
        <Cards
          countries={sortedCountries}
          selectedContinent={selectedContinent}
          selectedActivity={selectedActivity}
        />
      </div>

    </div>
  );
};

export default Home;