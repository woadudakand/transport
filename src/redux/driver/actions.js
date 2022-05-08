const actions = {
  GET_DRIVER_BEGIN: 'GET_DRIVER_BEGIN',
  GET_DRIVER_SUCCESS: 'GET_DRIVER_SUCCESS',
  GET_DRIVER_ERR: 'GET_DRIVER_ERR',

  SINGLE_DRIVER_BEGIN: 'SINGLE_DRIVER_BEGIN',
  SINGLE_DRIVER_SUCCESS: 'SINGLE_DRIVER_SUCCESS',
  SINGLE_DRIVER_ERR: 'SINGLE_DRIVER_ERR',

  DRIVER_ADD_BEGIN: 'DRIVER_ADD_BEGIN',
  DRIVER_ADD_SUCCESS: 'DRIVER_ADD_SUCCESS',
  DRIVER_ADD_ERR: 'DRIVER_ADD_ERR',

  DRIVER_SEARCH: 'DRIVER_SEARCH',

  driverSearch: data => {
    return {
      type: actions.DRIVER_SEARCH,
      data,
    };
  },

  driverAddBegin: () => {
    return {
      type: actions.DRIVER_ADD_BEGIN,
    };
  },

  driverAddSuccess: data => {
    return {
      type: actions.DRIVER_ADD_SUCCESS,
      data,
    };
  },

  driverAddErr: err => {
    return {
      type: actions.DRIVER_ADD_ERR,
      err,
    };
  },

  getDriverBegin: () => {
    return {
      type: actions.GET_DRIVER_BEGIN,
    };
  },

  getDriverSuccess: data => {
    return {
      type: actions.GET_DRIVER_SUCCESS,
      data,
    };
  },

  getDriverErr: err => {
    return {
      type: actions.GET_DRIVER_ERR,
      err,
    };
  },

  singleDriverBegin: () => {
    return {
      type: actions.SINGLE_DRIVER_BEGIN,
    };
  },

  singleDriverSuccess: data => {
    return {
      type: actions.SINGLE_DRIVER_SUCCESS,
      data,
    };
  },

  singleDriverErr: err => {
    return {
      type: actions.SINGLE_DRIVER_ERR,
      err,
    };
  },
};

export default actions;
