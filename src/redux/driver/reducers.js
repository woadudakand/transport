import actions from './actions';

const {
  DRIVER_ADD_BEGIN,
  DRIVER_SEARCH,
  DRIVER_ADD_SUCCESS,
  DRIVER_ADD_ERR,
  GET_DRIVER_BEGIN,
  GET_DRIVER_SUCCESS,
  GET_DRIVER_ERR,
  SINGLE_DRIVER_BEGIN,
  SINGLE_DRIVER_SUCCESS,
  SINGLE_DRIVER_ERR,
} = actions;

const initState = {
  data: [],
  driver: [],
  list: [],
  loading: false,
  error: null,
};

const DriverReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case DRIVER_SEARCH:
      return {
        ...state,
        data: data.result,
      };

    case DRIVER_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case DRIVER_ADD_SUCCESS:
      return {
        ...state,
        data: data.result,
        loading: false,
      };
    case DRIVER_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_DRIVER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_DRIVER_SUCCESS:
      return {
        ...state,
        data: data.result,
        loading: false,
      };
    case GET_DRIVER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SINGLE_DRIVER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_DRIVER_SUCCESS:
      return {
        ...state,
        driver: data.result,
        loading: false,
      };
    case SINGLE_DRIVER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default DriverReducer;
