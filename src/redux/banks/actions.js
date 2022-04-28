const actions = {
  GET_BANK_BEGIN: 'GET_BANK_BEGIN',
  GET_BANK_SUCCESS: 'GET_BANK_SUCCESS',
  GET_BANK_ERR: 'GET_BANK_ERR',

  BANK_ADD_BEGIN: 'BANK_ADD_BEGIN',
  BANK_ADD_SUCCESS: 'BANK_ADD_SUCCESS',
  BANK_ADD_ERR: 'BANK_ADD_ERR',

  BANK_LIST_BEGIN: 'BANK_LIST_BEGIN',
  BANK_LIST_SUCCESS: 'BANK_LIST_SUCCESS',
  BANK_LIST_ERR: 'BANK_LIST_ERR',

  BANK_SEARCH: 'BANK_SEARCH',

  bankSearch: data => {
    return {
      type: actions.BANK_SEARCH,
      data,
    };
  },

  bankAddBegin: () => {
    return {
      type: actions.BANK_ADD_BEGIN,
    };
  },

  bankAddSuccess: data => {
    return {
      type: actions.BANK_ADD_SUCCESS,
      data,
    };
  },

  bankAddErr: err => {
    return {
      type: actions.BANK_ADD_ERR,
      err,
    };
  },

  bankListBegin: () => {
    return {
      type: actions.BANK_LIST_BEGIN,
    };
  },

  bankListSuccess: data => {
    return {
      type: actions.BANK_LIST_SUCCESS,
      data,
    };
  },

  bankListErr: err => {
    return {
      type: actions.BANK_LIST_ERR,
      err,
    };
  },

  getBanksBegin: () => {
    return {
      type: actions.GET_BANK_BEGIN,
    };
  },

  getBanksSuccess: data => {
    return {
      type: actions.GET_BANK_SUCCESS,
      data,
    };
  },

  getBanksErr: err => {
    return {
      type: actions.GET_BANK_ERR,
      err,
    };
  },
};

export default actions;
