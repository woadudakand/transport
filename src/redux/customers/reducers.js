import actions from './actions';

const {
  CUSTOMERS_ADD_BEGIN,
  CUSTOMERS_SEARCH,
  CUSTOMERS_ADD_SUCCESS,
  CUSTOMERS_ADD_ERR,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_ERR,
} = actions;

const initState = {
  customers: [],
  loading: false,
  error: null,
};

const CustomersReducer = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case CUSTOMERS_SEARCH:
      return {
        ...state,
        customers: data.result,
      };

    case CUSTOMERS_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CUSTOMERS_ADD_SUCCESS:
      return {
        ...state,
        customers: data.result,
        loading: false,
      };
    case CUSTOMERS_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_CUSTOMERS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: data.result,
        loading: false,
      };
    case GET_CUSTOMERS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default CustomersReducer;
