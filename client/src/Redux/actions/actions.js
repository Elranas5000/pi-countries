import axios from 'axios';

export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const SEARCH_COUNTRIES_BY_NAME = 'SEARCH_COUNTRIES_BY_NAME';
export const SEARCH_COUNTRIES_BY_ACTIVITY = 'SEARCH_COUNTRIES_BY_ACTIVITY';

export function searchCountries(continent) {
  return async function(dispatch) {
    try {
      let url = 'http://localhost:3001/countries';

      if (continent) {
        url += `?continent=${continent}`; //esto concatena lo que esta entre comillas a la url
      }


      const response = await axios(url);
      const countries = response.data;

      dispatch({
        type: SEARCH_COUNTRIES,
        payload: countries,
      });
    } catch (error) {
      console.error('Error searching countries:', error.message);
    }
  };
}

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

export const searchCountriesByActivity = (activity) => {
  return {
    type: SEARCH_COUNTRIES_BY_ACTIVITY,
    payload: activity,
  };
};
