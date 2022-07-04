import actions from './actions';

const {
  SUPPLIER_ADD_BEGIN,
  SUPPLIER_SEARCH,
  SUPPLIER_ADD_SUCCESS,
  SUPPLIER_ADD_ERR,
  GET_SUPPLIER_BEGIN,
  GET_SUPPLIER_SUCCESS,
  GET_SUPPLIER_ERR,
} = actions;

const initState = {
  suppliers: [],
  loading: false,
  error: null,
};

const SupplierReducer = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case SUPPLIER_SEARCH:
      return {
        ...state,
        suppliers: data.result,
      };

    case SUPPLIER_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SUPPLIER_ADD_SUCCESS:
      return {
        ...state,
        suppliers: data.result,
        loading: false,
      };
    case SUPPLIER_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_SUPPLIER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: data.result,
        loading: false,
      };
    case GET_SUPPLIER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default SupplierReducer;
