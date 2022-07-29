import actions from './actions';

const { LR_ADD_BEGIN, LR_SEARCH, LR_ADD_SUCCESS, LR_ADD_ERR, GET_LR_BEGIN, GET_LR_SUCCESS, GET_LR_ERR } = actions;

const initState = {
  lorryReceipt: [],
  loading: false,
  error: null,
};

const LorryReceiptReducer = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case LR_SEARCH:
      return {
        ...state,
        lorryReceipt: data.result,
      };

    case LR_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case LR_ADD_SUCCESS:
      return {
        ...state,
        lorryReceipt: data.result,
        loading: false,
      };
    case LR_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_LR_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_LR_SUCCESS:
      return {
        ...state,
        lorryReceipt: data.result,
        loading: false,
      };
    case GET_LR_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default LorryReceiptReducer;
