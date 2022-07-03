import actions from './actions';

const {
  VTYPE_ADD_BEGIN,
  VTYPE_SEARCH,
  VTYPE_ADD_SUCCESS,
  VTYPE_ADD_ERR,
  GET_VTYPE_BEGIN,
  GET_VTYPE_SUCCESS,
  GET_VTYPE_ERR,
} = actions;

const initState = {
  vtype: [],
  loading: false,
  error: null,
};

const VtypeReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case VTYPE_SEARCH:
      return {
        ...state,
        vtype: data.result,
      };

    case VTYPE_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case VTYPE_ADD_SUCCESS:
      return {
        ...state,
        vtype: data.result,
        loading: false,
      };
    case VTYPE_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_VTYPE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_VTYPE_SUCCESS:
      return {
        ...state,
        vtype: data.result,
        loading: false,
      };
    case GET_VTYPE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default VtypeReducer;
