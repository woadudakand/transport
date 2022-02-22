const actions = {
  GET_CUSTOMERS_BEGIN: 'GET_CUSTOMERS_BEGIN',
  GET_CUSTOMERS_SUCCESS: 'GET_CUSTOMERS_SUCCESS',
  GET_CUSTOMERS_ERR: 'GET_CUSTOMERS_ERR',

  CUSTOMERS_ADD_BEGIN: 'CUSTOMERS_ADD_BEGIN',
  CUSTOMERS_ADD_SUCCESS: 'CUSTOMERS_ADD_SUCCESS',
  CUSTOMERS_ADD_ERR: 'CUSTOMERS_ADD_ERR',

  CUSTOMERS_SEARCH: 'CUSTOMERS_SEARCH',

  customerSearch: data => {
    return {
      type: actions.CUSTOMERS_SEARCH,
      data,
    };
  },

  customerAddBegin: () => {
    return {
      type: actions.CUSTOMERS_ADD_BEGIN,
    };
  },

  customerAddSuccess: data => {
    return {
      type: actions.CUSTOMERS_ADD_SUCCESS,
      data,
    };
  },

  customerAddErr: err => {
    return {
      type: actions.CUSTOMERS_ADD_ERR,
      err,
    };
  },

  getCustomerBegin: () => {
    return {
      type: actions.GET_CUSTOMERS_BEGIN,
    };
  },

  getCustomerSuccess: data => {
    return {
      type: actions.GET_CUSTOMERS_SUCCESS,
      data,
    };
  },

  getCustomerErr: err => {
    return {
      type: actions.GET_CUSTOMERS_ERR,
      err,
    };
  },
};

export default actions;
