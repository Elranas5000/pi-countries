import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../Form/Form.module.css"
import NavBar from '../../Components/NavBar/NavBar';

const Form = () => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [season, setSeason] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/countries/');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error al obtener la lista de países:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const onlyAlphabetic = /^[a-zA-Z\s]*$/;

    if (onlyAlphabetic.test(inputValue) || inputValue === '') {
      setName(inputValue);
      setNameErrorMessage('');
    } else {
      setNameErrorMessage('Only letters, please');
    }
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCountryId = countries.find((country) => country.name === selectedCountry)?.id;

    if (selectedCountryId && !selectedCountries.includes(selectedCountryId)) {
      setSelectedCountries([...selectedCountries, selectedCountryId]);
    }
  };

  const handleCreateActivity = async () => {
    // Validaciones
    if (name === '' || difficulty === '' || season === '' || selectedCountries.length === 0) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    // Lógica para enviar datos al servidor y manejar la respuesta
    try {
      const response = await fetch('http://localhost:3001/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          difficulty,
          season: [season],
          countries: selectedCountries,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Actividad creada exitosamente:', data);

        // Limpiar el formulario después de enviar
        setName('');
        setDifficulty('');
        setSeason('');
        setSelectedCountries([]);
        setErrorMessage('');
        setSuccessMessage('Activity succesfully created!');
      } else {
        const errorData = await response.json();
        console.error('Error al crear la actividad:', errorData.message);
        setErrorMessage(`Error: ${errorData.message}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error de red al crear la actividad:', error);
      setErrorMessage('Error de red al crear la actividad');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.NavBar}>
        <NavBar/>
      </div>

      <div className={styles.infoContainer}>

          <h2>Tourist activities creation form</h2>
          <form >
            <div className={styles.selectContainer}>
              {/* <label>Name:</label> */}
              <input placeholder='Activity name' type="text" value={name} onChange={handleNameChange} />
              <p style={{ color: 'red' }}>{nameErrorMessage}</p>
            </div>

            <div className={styles.selectContainer}>
              {/* <label>Difficulty:</label> */}
              <select value={difficulty} onChange={handleDifficultyChange}>
                <option value="">Select a difficulty</option>
                <option value="1">Very easy</option>
                <option value="2">Easy</option>
                <option value="3">Medium</option>
                <option value="4">Hard</option>
                <option value="5">Very hard</option>
              </select>
            </div>

            <div className={styles.selectContainer}>
              {/* <label>Season:</label> */}
              <select value={season} onChange={handleSeasonChange}>
                <option value="">Select a season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>
            </div>

            <div className={styles.selectContainer}>
              {/* <label>Países:</label> */}
              <select onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
              </select>
              <ul>
                {selectedCountries.map((countryId) => (
                  <li key={countryId}>{countryId}</li>
                ))}
              </ul>
            </div>
            <button className={styles.createButton} type="button" onClick={handleCreateActivity}>
              Create
            </button>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </div>
      </div>
  );
};

export default Form;