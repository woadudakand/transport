const actions = {
  GET_VEHICLETYPE_BEGIN: 'GET_VEHICLETYPE_BEGIN',
  GET_VEHICLETYPE_SUCCESS: 'GET_VEHICLETYPE_SUCCESS',
  GET_VEHICLETYPE_ERR: 'GET_VEHICLETYPE_ERR',

  VEHICLETYPE_ADD_BEGIN: 'VEHICLETYPE_ADD_BEGIN',
  VEHICLETYPE_ADD_SUCCESS: 'VEHICLETYPE_ADD_SUCCESS',
  VEHICLETYPE_ADD_ERR: 'VEHICLETYPE_ADD_ERR',

  VEHICLETYPE_SEARCH: 'VEHICLETYPE_SEARCH',

  vehicleTypeSearch: data => {
    return {
      type: actions.VEHICLETYPE_SEARCH,
      data,
    };
  },

  vehicleTypeAddBegin: () => {
    return {
      type: actions.VEHICLETYPE_ADD_BEGIN,
    };
  },

  vehicleTypeAddSuccess: data => {
    return {
      type: actions.VEHICLETYPE_ADD_SUCCESS,
      data,
    };
  },

  vehicleTypeAddErr: err => {
    return {
      type: actions.VEHICLETYPE_ADD_ERR,
      err,
    };
  },

  getVehicleTypesBegin: () => {
    return {
      type: actions.GET_VEHICLETYPE_BEGIN,
    };
  },

  getVehicleTypesSuccess: data => {
    return {
      type: actions.GET_VEHICLETYPE_SUCCESS,
      data,
    };
  },

  getVehicleTypesErr: err => {
    return {
      type: actions.GET_VEHICLETYPE_ERR,
      err,
    };
  },
};

export default actions;
