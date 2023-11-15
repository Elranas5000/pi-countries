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

export function searchCountriesByName(){
    
}