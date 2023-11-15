const initialState = {
    countries: [], // Inicializa countries como un array vacío
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
      default:
        return state;
    }
  };
  
  export default rootReducer;
  