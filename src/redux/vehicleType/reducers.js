import actions from './actions';

const {
  VEHICLETYPE_ADD_BEGIN,
  VEHICLETYPE_SEARCH,
  VEHICLETYPE_ADD_SUCCESS,
  VEHICLETYPE_ADD_ERR,
  GET_VEHICLETYPE_BEGIN,
  GET_VEHICLETYPE_SUCCESS,
  GET_VEHICLETYPE_ERR,
} = actions;

const initState = {
  vtype: [],
  loading: false,
  error: null,
};

const VehicleTypeReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case VEHICLETYPE_SEARCH:
      return {
        ...state,
        vtype: data.result,
      };

    case VEHICLETYPE_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case VEHICLETYPE_ADD_SUCCESS:
      return {
        ...state,
        vtype: data.result,
        loading: false,
      };
    case VEHICLETYPE_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_VEHICLETYPE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_VEHICLETYPE_SUCCESS:
      return {
        ...state,
        vtype: data.result,
        loading: false,
      };
    case GET_VEHICLETYPE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default VehicleTypeReducer;
