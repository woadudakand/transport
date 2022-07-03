const actions = {
  GET_VTYPE_BEGIN: 'GET_VTYPE_BEGIN',
  GET_VTYPE_SUCCESS: 'GET_VTYPE_SUCCESS',
  GET_VTYPE_ERR: 'GET_VTYPE_ERR',

  VTYPE_ADD_BEGIN: 'VTYPE_ADD_BEGIN',
  VTYPE_ADD_SUCCESS: 'VTYPE_ADD_SUCCESS',
  VTYPE_ADD_ERR: 'VTYPE_ADD_ERR',

  VTYPE_SEARCH: 'VTYPE_SEARCH',

  vTypeSearch: data => {
    return {
      type: actions.VTYPE_SEARCH,
      data,
    };
  },

  vTypeAddBegin: () => {
    return {
      type: actions.VTYPE_ADD_BEGIN,
    };
  },

  vTypeAddSuccess: data => {
    return {
      type: actions.VTYPE_ADD_SUCCESS,
      data,
    };
  },

  vTypeAddErr: err => {
    return {
      type: actions.VTYPE_ADD_ERR,
      err,
    };
  },

  getVtypesBegin: () => {
    return {
      type: actions.GET_VTYPE_BEGIN,
    };
  },

  getVtypesSuccess: data => {
    return {
      type: actions.GET_VTYPE_SUCCESS,
      data,
    };
  },

  getVtypesErr: err => {
    return {
      type: actions.GET_VTYPE_ERR,
      err,
    };
  },
};

export default actions;
