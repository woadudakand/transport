import actions from './actions';

const {
  PLACES_ADD_BEGIN,
  PLACES_SEARCH,
  PLACES_ADD_SUCCESS,
  PLACES_ADD_ERR,
  GET_PLACES_BEGIN,
  GET_PLACES_SUCCESS,
  GET_PLACES_ERR,
} = actions;

const initState = {
  places: [],
  loading: false,
  error: null,
};

const PlacesReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case PLACES_SEARCH:
      return {
        ...state,
        places: data.result,
      };

    case PLACES_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case PLACES_ADD_SUCCESS:
      return {
        ...state,
        places: data.result,
        loading: false,
      };
    case PLACES_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_PLACES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_PLACES_SUCCESS:
      return {
        ...state,
        places: data.result,
        loading: false,
      };
    case GET_PLACES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default PlacesReducer;
