import { SEARCH_COUNTRIES } from "../actions/actions";
import { SEARCH_COUNTRIES_BY_ACTIVITY } from "../actions/actions";
import { SEARCH_COUNTRIES_BY_NAME } from "../actions/actions";
import { DELETE_ACTIVITY} from "../actions/actions";
// import { CREATE_ACTIVITY } from "../actions/actions";
//importacion de las actions

//asi "empieza" el estado de mi app
const initialState = {
    countries: [], // Inicializa countries como un array vacío
    filteredCountries: [],
    activities: [],
};
  
  //declaro el rootReducer que va a manejar todos los estados de la app
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_COUNTRIES:
        return {
          ...state,
          countries: action.payload,
        };

      case SEARCH_COUNTRIES_BY_NAME:
        return{
          ...state,
          countries: action.payload,
        }

        case SEARCH_COUNTRIES_BY_ACTIVITY:
          const activity = action.payload; //contiene el nombre de la actividad por la cual filtraré los paises
          const filteredCountries = state.countries.filter(country => //filter filtrará los paises del estado
            country.activities.some(act => act.name === activity) //.some() para ver si AL MENOS UNA actividad del array tiene un nombre igual al dado en activity
          );
          return {
            ...state,
            filteredCountries: activity ? filteredCountries : state.countries,
          }
          
          case DELETE_ACTIVITY:
      const updatedActivities = state.activities.filter(activity => activity.id !== action.payload);
      return {
        ...state,
        activities: updatedActivities,
      };
      // case CREATE_ACTIVITY:
      //   return {
      //     ...state,
      //     activities: [...state.activities, action.payload],
      //   };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  