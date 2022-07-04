const actions = {
  GET_SUPPLIER_BEGIN: 'GET_SUPPLIER_BEGIN',
  GET_SUPPLIER_SUCCESS: 'GET_SUPPLIER_SUCCESS',
  GET_SUPPLIER_ERR: 'GET_SUPPLIER_ERR',

  SUPPLIER_ADD_BEGIN: 'SUPPLIER_ADD_BEGIN',
  SUPPLIER_ADD_SUCCESS: 'SUPPLIER_ADD_SUCCESS',
  SUPPLIER_ADD_ERR: 'SUPPLIER_ADD_ERR',

  SUPPLIER_SEARCH: 'SUPPLIER_SEARCH',

  supplierSearch: data => {
    return {
      type: actions.SUPPLIER_SEARCH,
      data,
    };
  },

  supplierAddBegin: () => {
    return {
      type: actions.SUPPLIER_ADD_BEGIN,
    };
  },

  supplierAddSuccess: data => {
    return {
      type: actions.SUPPLIER_ADD_SUCCESS,
      data,
    };
  },

  supplierAddErr: err => {
    return {
      type: actions.SUPPLIER_ADD_ERR,
      err,
    };
  },

  getSupplierBegin: () => {
    return {
      type: actions.GET_SUPPLIER_BEGIN,
    };
  },

  getSupplierSuccess: data => {
    return {
      type: actions.GET_SUPPLIER_SUCCESS,
      data,
    };
  },

  getSupplierErr: err => {
    return {
      type: actions.GET_SUPPLIER_ERR,
      err,
    };
  },
};

export default actions;
