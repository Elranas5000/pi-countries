const initialState = {
    countries: [], // Inicializa countries como un array vacío
    // Otros estados si los tienes
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_COUNTRIES':
        return {
          ...state,
          countries: action.payload,
        };
      // Otros casos
      default:
        return state;
    }
  };
  
  export default rootReducer;
  