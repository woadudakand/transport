const actions = {
  GET_DRIVER_BEGIN: 'GET_DRIVER_BEGIN',
  GET_DRIVER_SUCCESS: 'GET_DRIVER_SUCCESS',
  GET_DRIVER_ERR: 'GET_DRIVER_ERR',

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
};

export default actions;
