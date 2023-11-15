import axios from "axios"


export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const SEARCH_COUNTRIES_BY_NAME = "SEARCH_COUNTRIES_BY_NAME";

export function searchCountries(){
    return async function(dispatch){
        const response = await axios("http://localhost:3001/countries")
        console.log(response);

        const countries = response.data

        return dispatch({
            type: SEARCH_COUNTRIES,
            payload: countries,
        })
    }
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