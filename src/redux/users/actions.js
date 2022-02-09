const actions = {
  GET_USERS_BEGIN: 'GET_USERS_BEGIN',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_ERR: 'GET_USERS_ERR',

  REGISTER_BEGIN: 'REGISTER_BEGIN',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERR: 'REGISTER_ERR',

  REGISTER_SEARCH: 'REGISTER_SEARCH',

  userSearch: data => {
    return {
      type: actions.REGISTER_SEARCH,
      data,
    };
  },

  registerBegin: () => {
    return {
      type: actions.REGISTER_BEGIN,
    };
  },

  registerSuccess: data => {
    return {
      type: actions.REGISTER_SUCCESS,
      data,
    };
  },

  registerErr: err => {
    return {
      type: actions.REGISTER_ERR,
      err,
    };
  },

  getUsersBegin: () => {
    return {
      type: actions.GET_USERS_BEGIN,
    };
  },

  getUsersSuccess: data => {
    return {
      type: actions.GET_USERS_SUCCESS,
      data,
    };
  },

  getUsersErr: err => {
    return {
      type: actions.GET_USERS_ERR,
      err,
    };
  },
};

export default actions;
