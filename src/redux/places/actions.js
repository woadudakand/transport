const actions = {
  GET_PLACES_BEGIN: 'GET_PLACES_BEGIN',
  GET_PLACES_SUCCESS: 'GET_PLACES_SUCCESS',
  GET_PLACES_ERR: 'GET_PLACES_ERR',

  PLACES_ADD_BEGIN: 'PLACES_ADD_BEGIN',
  PLACES_ADD_SUCCESS: 'PLACES_ADD_SUCCESS',
  PLACES_ADD_ERR: 'PLACES_ADD_ERR',

  PLACES_SEARCH: 'PLACES_SEARCH',

  placesSearch: data => {
    return {
      type: actions.PLACES_SEARCH,
      data,
    };
  },

  placesAddBegin: () => {
    return {
      type: actions.PLACES_ADD_BEGIN,
    };
  },

  placesAddSuccess: data => {
    return {
      type: actions.PLACES_ADD_SUCCESS,
      data,
    };
  },

  placesAddErr: err => {
    return {
      type: actions.PLACES_ADD_ERR,
      err,
    };
  },

  getPlacesBegin: () => {
    return {
      type: actions.GET_PLACES_BEGIN,
    };
  },

  getPlacesSuccess: data => {
    return {
      type: actions.GET_PLACES_SUCCESS,
      data,
    };
  },

  getPlacesErr: err => {
    return {
      type: actions.GET_PLACES_ERR,
      err,
    };
  },
};

export default actions;
