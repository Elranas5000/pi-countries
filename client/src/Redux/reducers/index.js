import { SEARCH_COUNTRIES } from "../actions/actions";
import { SEARCH_COUNTRIES_BY_ACTIVITY } from "../actions/actions";
import { SEARCH_COUNTRIES_BY_NAME } from "../actions/actions";
import { DELETE_ACTIVITY} from "../actions/actions";


const initialState = {
    countries: [], // Inicializa countries como un array vacío
    filteredCountries: [],
    activities: [],
  };
  
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
          const activity = action.payload;
          const filteredCountries = state.countries.filter(country =>
            country.activities.some(act => act.name === activity)
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
      default:
        return state;
    }
  };
  
  export default rootReducer;
  