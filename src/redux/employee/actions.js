const actions = {
  GET_EMPLOYEE_BEGIN: 'GET_EMPLOYEE_BEGIN',
  GET_EMPLOYEE_SUCCESS: 'GET_EMPLOYEE_SUCCESS',
  GET_EMPLOYEE_ERR: 'GET_EMPLOYEE_ERR',

  GET_EMPLOYEE_LIST_BEGIN: 'GET_EMPLOYEE_LIST_BEGIN',
  GET_EMPLOYEE_LIST_SUCCESS: 'GET_EMPLOYEE_LIST_SUCCESS',
  GET_EMPLOYEE_LIST_ERR: 'GET_EMPLOYEE_LIST_ERR',

  EMPLOYEE_ADD_BEGIN: 'EMPLOYEE_ADD_BEGIN',
  EMPLOYEE_ADD_SUCCESS: 'EMPLOYEE_ADD_SUCCESS',
  EMPLOYEE_ADD_ERR: 'EMPLOYEE_ADD_ERR',

  SINGLE_EMPLOYEE_BEGIN: 'SINGLE_EMPLOYEE_BEGIN',
  SINGLE_EMPLOYEE_SUCCESS: 'SINGLE_EMPLOYEE_SUCCESS',
  SINGLE_EMPLOYEE_ERR: 'SINGLE_EMPLOYEE_ERR',

  EMPLOYEE_SEARCH: 'EMPLOYEE_SEARCH',

  employeeSearch: data => {
    return {
      type: actions.EMPLOYEE_SEARCH,
      data,
    };
  },

  employeeAddBegin: () => {
    return {
      type: actions.EMPLOYEE_ADD_BEGIN,
    };
  },

  employeeAddSuccess: data => {
    return {
      type: actions.EMPLOYEE_ADD_SUCCESS,
      data,
    };
  },

  employeeAddErr: err => {
    return {
      type: actions.EMPLOYEE_ADD_ERR,
      err,
    };
  },

  getEmployeeBegin: () => {
    return {
      type: actions.GET_EMPLOYEE_BEGIN,
    };
  },

  getEmployeeSuccess: data => {
    return {
      type: actions.GET_EMPLOYEE_SUCCESS,
      data,
    };
  },

  getEmployeeErr: err => {
    return {
      type: actions.GET_EMPLOYEE_ERR,
      err,
    };
  },

  getEmployeeListBegin: () => {
    return {
      type: actions.GET_EMPLOYEE_LIST_BEGIN,
    };
  },

  getEmployeeListSuccess: data => {
    return {
      type: actions.GET_EMPLOYEE_LIST_SUCCESS,
      data,
    };
  },

  getEmployeeListErr: err => {
    return {
      type: actions.GET_EMPLOYEE_LIST_ERR,
      err,
    };
  },
  getSingleEmployeeBegin: () => {
    return {
      type: actions.SINGLE_EMPLOYEE_BEGIN,
    };
  },

  getSingleEmployeeSuccess: data => {
    return {
      type: actions.SINGLE_EMPLOYEE_SUCCESS,
      data,
    };
  },

  getSingleEmployeeErr: err => {
    return {
      type: actions.SINGLE_EMPLOYEE_ERR,
      err,
    };
  },
};

export default actions;
