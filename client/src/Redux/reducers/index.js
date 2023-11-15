const initialState = {
    countries: [], // Inicializa countries como un array vacío
    filteredCountries: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_COUNTRIES':
        return {
          ...state,
          countries: action.payload,
        };
      case "SEARCH_COUNTRIES_BY_NAME":
        return{
          ...state,
          countries: action.payload,
        }
        case 'SEARCH_COUNTRIES_BY_ACTIVITY':
          const activity = action.payload;
          const filteredCountries = state.countries.filter(country =>
            country.activities.some(act => act.name === activity)
          );
          return {
            ...state,
            filteredCountries: activity ? filteredCountries : state.countries,
          }
      default:
        return state;
    }
  };
  
  export default rootReducer;
  