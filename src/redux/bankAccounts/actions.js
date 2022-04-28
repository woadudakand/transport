const actions = {
  GET_BANK_ACCOUNT_BEGIN: 'GET_BANK_ACCOUNT_BEGIN',
  GET_BANK_ACCOUNT_SUCCESS: 'GET_BANK_ACCOUNT_SUCCESS',
  GET_BANK_ACCOUNT_ERR: 'GET_BANK_ACCOUNT_ERR',

  BANK_ACCOUNT_ADD_BEGIN: 'BANK_ACCOUNT_ADD_BEGIN',
  BANK_ACCOUNT_ADD_SUCCESS: 'BANK_ACCOUNT_ADD_SUCCESS',
  BANK_ACCOUNT_ADD_ERR: 'BANK_ACCOUNT_ADD_ERR',

  BANK_ACCOUNT_LIST_BEGIN: 'BANK_ACCOUNT_LIST_BEGIN',
  BANK_ACCOUNT_LIST_SUCCESS: 'BANK_ACCOUNT_LIST_SUCCESS',
  BANK_ACCOUNT_LIST_ERR: 'BANK_ACCOUNT_LIST_ERR',

  BANK_ACCOUNT_SEARCH: 'BANK_ACCOUNT_SEARCH',

  bankAccountSearch: data => {
    return {
      type: actions.BANK_ACCOUNT_SEARCH,
      data,
    };
  },

  bankAccountAddBegin: () => {
    return {
      type: actions.BANK_ACCOUNT_ADD_BEGIN,
    };
  },

  bankAccountAddSuccess: data => {
    return {
      type: actions.BANK_ACCOUNT_ADD_SUCCESS,
      data,
    };
  },

  bankAccountAddErr: err => {
    return {
      type: actions.BANK_ACCOUNT_ADD_ERR,
      err,
    };
  },

  bankAccountListBegin: () => {
    return {
      type: actions.BANK_ACCOUNT_LIST_BEGIN,
    };
  },

  bankAccountListSuccess: data => {
    return {
      type: actions.BANK_ACCOUNT_LIST_SUCCESS,
      data,
    };
  },

  bankAccountListErr: err => {
    return {
      type: actions.BANK_ACCOUNT_LIST_ERR,
      err,
    };
  },

  getBanksAccountBegin: () => {
    return {
      type: actions.GET_BANK_ACCOUNT_BEGIN,
    };
  },

  getBanksAccountSuccess: data => {
    return {
      type: actions.GET_BANK_ACCOUNT_SUCCESS,
      data,
    };
  },

  getBanksAccountErr: err => {
    return {
      type: actions.GET_BANK_ACCOUNT_ERR,
      err,
    };
  },
};

export default actions;
