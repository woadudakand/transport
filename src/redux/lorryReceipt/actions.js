const actions = {
  GET_LR_BEGIN: 'GET_LR_BEGIN',
  GET_LR_SUCCESS: 'GET_LR_SUCCESS',
  GET_LR_ERR: 'GET_LR_ERR',

  LR_ADD_BEGIN: 'LR_ADD_BEGIN',
  LR_ADD_SUCCESS: 'LR_ADD_SUCCESS',
  LR_ADD_ERR: 'LR_ADD_ERR',

  LR_SEARCH: 'LR_SEARCH',

  lorryReceiptSearch: data => {
    return {
      type: actions.LR_SEARCH,
      data,
    };
  },

  lorryReceiptAddBegin: () => {
    return {
      type: actions.LR_ADD_BEGIN,
    };
  },

  lorryReceiptAddSuccess: data => {
    return {
      type: actions.LR_ADD_SUCCESS,
      data,
    };
  },

  lorryReceiptAddErr: err => {
    return {
      type: actions.LR_ADD_ERR,
      err,
    };
  },

  getLorryReceiptBegin: () => {
    return {
      type: actions.GET_LR_BEGIN,
    };
  },

  getLorryReceiptSuccess: data => {
    return {
      type: actions.GET_LR_SUCCESS,
      data,
    };
  },

  getLorryReceiptErr: err => {
    return {
      type: actions.GET_LR_ERR,
      err,
    };
  },
};

export default actions;
