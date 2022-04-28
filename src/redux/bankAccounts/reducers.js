import actions from './actions';

const {
  BANK_ACCOUNT_SEARCH,
  BANK_ACCOUNT_ADD_BEGIN,
  BANK_ACCOUNT_ADD_SUCCESS,
  BANK_ACCOUNT_ADD_ERR,
  BANK_ACCOUNT_LIST_BEGIN,
  BANK_ACCOUNT_LIST_SUCCESS,
  BANK_ACCOUNT_LIST_ERR,
  GET_BANK_ACCOUNT_BEGIN,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_BANK_ACCOUNT_ERR,
} = actions;

const initState = {
  data: [],
  list: [],
  loading: false,
  error: null,
};

const BankAccountReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case BANK_ACCOUNT_SEARCH:
      return {
        ...state,
        data: data.result,
      };

    case BANK_ACCOUNT_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BANK_ACCOUNT_ADD_SUCCESS:
      return {
        ...state,
        data: data.result,
        loading: false,
      };
    case BANK_ACCOUNT_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case BANK_ACCOUNT_LIST_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BANK_ACCOUNT_LIST_SUCCESS:
      return {
        ...state,
        list: data.result,
        loading: false,
      };
    case BANK_ACCOUNT_LIST_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_BANK_ACCOUNT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: data.result,
        loading: false,
      };
    case GET_BANK_ACCOUNT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default BankAccountReducer;
