import actions from './actions';

const {
  BANK_SEARCH,
  BANK_ADD_BEGIN,
  BANK_ADD_SUCCESS,
  BANK_ADD_ERR,
  BANK_LIST_BEGIN,
  BANK_LIST_SUCCESS,
  BANK_LIST_ERR,
  GET_BANK_BEGIN,
  GET_BANK_SUCCESS,
  GET_BANK_ERR,
} = actions;

const initState = {
  data: [],
  list: [],
  loading: false,
  error: null,
};

const BanksReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case BANK_SEARCH:
      return {
        ...state,
        data: data.result,
      };

    case BANK_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BANK_ADD_SUCCESS:
      return {
        ...state,
        data: data.result,
        loading: false,
      };
    case BANK_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case BANK_LIST_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BANK_LIST_SUCCESS:
      return {
        ...state,
        list: data.result,
        loading: false,
      };
    case BANK_LIST_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_BANK_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_BANK_SUCCESS:
      return {
        ...state,
        data: data.result,
        loading: false,
      };
    case GET_BANK_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default BanksReducer;
