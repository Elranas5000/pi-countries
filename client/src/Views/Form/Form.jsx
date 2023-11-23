import React, { useEffect, useState } from 'react';
import styles from "../Form/Form.module.css"
import { Link } from 'react-router-dom';


const Form = () => {

  //defino los estados
  const [name, setName] = useState(''); //para almacenar el nombre de la actividad
  const [difficulty, setDifficulty] = useState(''); //almacena la dificultad de la actividad
  const [season, setSeason] = useState(''); //almacena la temporada de la actividad
  const [selectedCountries, setSelectedCountries] = useState([]); //lista de los identificadores (cca3) de los paises
  const [countries, setCountries] = useState([]); //lista de paises

  const [errorMessage, setErrorMessage] = useState(''); //mensajes de error para mostrar
  const [nameErrorMessage, setNameErrorMessage] = useState(''); //mensajes especificos del nombre para mostrar
  const [successMessage, setSuccessMessage] = useState(''); //mensajes de exito para mostrar

  //obtengo la lista de paises al montar el componente, luego establezco la lista de paises con la data recibida:
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

  //manejador para actualizar el estado del nombre
  const handleNameChange = (e) => {  
    const inputValue = e.target.value; //"e" siendo el valor que el usuario ha ingresado, en este caso el name
    const onlyAlphabetic = /^[a-zA-ZñÑ\s]*$/; //regex para no permitir numeros ni simbolos salvo ñ

    if (onlyAlphabetic.test(inputValue) || inputValue === '') { // si cumple con la regex o si esta vacio
      setName(inputValue); //actualiza name
      setNameErrorMessage(''); //quita mensajes de error
    } else {
      setNameErrorMessage('Only letters, please'); //si no cumple con la regex, muestra este msj
    }
  };

  //ambos handle abajo obtienen el valor seleccionado "e" y actualizan su estado en base a ese valor
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };
  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  //maneja el cambio de pais
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCountryId = countries.find((country) => country.name === selectedCountry)?.id;

    // verifica si se encontró el pais y si ese pais no está incluido en la lista (selectedCountries):
    if (selectedCountryId && !selectedCountries.includes(selectedCountryId)) {
      //si entra al if, se actualiza el estado y lo agrega a la lista
      setSelectedCountries([...selectedCountries, selectedCountryId]);
    }
  };

  //maneja validaciones para crear una actividad, actualiza el estado
  const handleCreateActivity = async () => {

    //compruebo si los campos están llenos, de no ser el caso, envio el mensaje de error
    if (name === '' || difficulty === '' || season === '' || selectedCountries.length === 0) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    //utilizo fetch para enviar un POST al server, con formato JSON
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

      //si la respuesta del server es OK, osea si el POST se hizo, obtengo los datos y los almaceno en data
      if (response.ok) {
        const data = await response.json();
        console.log('Actividad creada exitosamente:', data);

        // limpio el formulario después de enviarlo
        setName('');
        setDifficulty('');
        setSeason('');
        setSelectedCountries([]);
        setErrorMessage('');

        //envio mensaje de actividad creada con exito
        setSuccessMessage('Activity succesfully created!');

        //setTimeOut para recargar la pagina y que el POST surta efecto
        setTimeout(() => {
          window.location.reload();
        }, 1200);

      } else { //de tener un error:
        const errorData = await response.json();
        console.error('Error al crear la actividad:', errorData.message);
        setErrorMessage(`Error: ${errorData.message}`);
        setSuccessMessage('');
      }
      
    } catch (error) {
      console.error('Error de red al crear la actividad:', error);
      setErrorMessage('Network error creating the activity');
      setSuccessMessage('');
    }
    
  };

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