import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../Components/NavBar/NavBar';
import Cards from "../../Components/Cards/Cards";
import { searchCountries, searchCountriesByActivity } from '../../Redux/actions/actions';
import { Link } from 'react-router-dom';

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [sortType, setSortType] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

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

  const handleSearch = (name) => {
    dispatch(searchCountries(selectedContinent, selectedActivity, name));
  };

  const continents = [...new Set(countries.map((country) => country.continents))];
  const activities = [...new Set(countries.flatMap((country) => country.activities?.map(activity => activity.name) || []))];

  const sortedCountries = [...countries].sort((a, b) => {
    if (sortType === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortType === 'population') {
      return sortDirection === 'asc' ? a.population - b.population : b.population - a.population;
    }
    return 0;
  });

  return (
    <div>
      <h1>Welcome to the Countries SPA</h1>

      <NavBar />

      <div>
        <label>Sort by:</label>
        <select onChange={(e) => handleSortTypeChange(e.target.value)}>
          <option value="name">Name</option>
          <option value="population">Population</option>
        </select>

        <label>Order:</label>
        <select onChange={(e) => handleSortDirectionChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div>
        <label>Filter by Continent:</label>
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
      </div>

      <div>
        <label>Filter by Activity:</label>
        <select onChange={(e) => handleActivityChange(e.target.value)} value={selectedActivity}>
          <option key="activity" value="">
            All countries
          </option>
          {activities.map((activity) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Link to={"/form"}>
          <button>
            Make your own activity
          </button>
        </Link>
      </div>

      <Cards
        countries={sortedCountries}
        selectedContinent={selectedContinent}
        selectedActivity={selectedActivity}
      />
    </div>
  );
};

export default Home;

