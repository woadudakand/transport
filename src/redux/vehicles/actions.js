const actions = {
  GET_VEHICLES_BEGIN: 'GET_VEHICLES_BEGIN',
  GET_VEHICLES_SUCCESS: 'GET_VEHICLES_SUCCESS',
  GET_VEHICLES_ERR: 'GET_VEHICLES_ERR',

  VEHICLES_ADD_BEGIN: 'VEHICLES_ADD_BEGIN',
  VEHICLES_ADD_SUCCESS: 'VEHICLES_ADD_SUCCESS',
  VEHICLES_ADD_ERR: 'VEHICLES_ADD_ERR',

  VEHICLES_SEARCH: 'VEHICLES_SEARCH',

  vehicleSearch: data => {
    return {
      type: actions.VEHICLES_SEARCH,
      data,
    };
  },

  vehicleAddBegin: () => {
    return {
      type: actions.VEHICLES_ADD_BEGIN,
    };
  },

  vehicleAddSuccess: data => {
    return {
      type: actions.VEHICLES_ADD_SUCCESS,
      data,
    };
  },

  vehicleAddErr: err => {
    return {
      type: actions.VEHICLES_ADD_ERR,
      err,
    };
  },

  getVehicleBegin: () => {
    return {
      type: actions.GET_VEHICLES_BEGIN,
    };
  },

  getVehicleSuccess: data => {
    return {
      type: actions.GET_VEHICLES_SUCCESS,
      data,
    };
  },

  getVehicleErr: err => {
    return {
      type: actions.GET_VEHICLES_ERR,
      err,
    };
  },
};

export default actions;
