import axios from 'axios'; //axios para enviar peticiones HTTP

//exporto las acciones para usarlas en mi reducer
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const SEARCH_COUNTRIES_BY_NAME = 'SEARCH_COUNTRIES_BY_NAME';
export const SEARCH_COUNTRIES_BY_ACTIVITY = 'SEARCH_COUNTRIES_BY_ACTIVITY';
export const DELETE_ACTIVITY = "DELETE_ACTIVITY"

//empiezo a exportar las funciones de cada action
export function searchCountries(continent) {
  return async function(dispatch) { //dispatch viene del Provider de react-redux
    try { //utilizo el bloque try...catch para manejar errores y no permitir que mi app termine de forma abrupta
      let url = 'http://localhost:3001/countries';

      if (continent) {
        url += `?continent=${continent}`; //esto concatena lo que esta entre comillas a la url
      }


      const response = await axios(url);
      const countries = response.data;

      dispatch({ //dispatch se encarga de ENVIAR la accion a la store, en este caso "payload" contendrá la informacion
        type: SEARCH_COUNTRIES,
        payload: countries,
      });

    } catch (error) { //este objeto " error" captura la  info sobre la excepcion
      console.error('Error searching countries:', error.message);
    }
  };
}


//acá necesito buscar los paises por nombre, por eso me traigo a name como parametro
export const searchCountriesByName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
    const countries = response.data;

    dispatch({
      type: SEARCH_COUNTRIES_BY_NAME,
      payload: countries,
    });

  } catch (error) {
    console.error('Error searching countries by name:', error.message);
  }
};

//acá necesito filtrar por actividad
export const searchCountriesByActivity = (activity) => { //activity representa el nombre de la accion que va a filtrar
  return {
    type: SEARCH_COUNTRIES_BY_ACTIVITY,
    payload: activity,
  };
};

//para borrar actividades de la db, usando su ID
export const deleteActivity = (activityId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/activities/${activityId}`);

    dispatch({
      type: DELETE_ACTIVITY,
      payload: activityId,
    });

    console.log('Actividad eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la actividad:', error.message);
  }
};
