import actions from './actions';

const {
  VEHICLES_ADD_BEGIN,
  VEHICLES_SEARCH,
  VEHICLES_ADD_SUCCESS,
  VEHICLES_ADD_ERR,
  GET_VEHICLES_BEGIN,
  GET_VEHICLES_SUCCESS,
  GET_VEHICLES_ERR,
} = actions;

const initState = {
  vehicles: [],
  loading: false,
  error: null,
};

const VehiclesReducer = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case VEHICLES_SEARCH:
      return {
        ...state,
        customers: data.result,
      };

    case VEHICLES_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case VEHICLES_ADD_SUCCESS:
      return {
        ...state,
        customers: data.result,
        loading: false,
      };
    case VEHICLES_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_VEHICLES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_VEHICLES_SUCCESS:
      return {
        ...state,
        customers: data.result,
        loading: false,
      };
    case GET_VEHICLES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default VehiclesReducer;
