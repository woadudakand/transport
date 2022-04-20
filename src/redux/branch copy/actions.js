const actions = {
  GET_BRANCH_BEGIN: 'GET_BRANCH_BEGIN',
  GET_BRANCH_SUCCESS: 'GET_BRANCH_SUCCESS',
  GET_BRANCH_ERR: 'GET_BRANCH_ERR',

  GET_BRANCH_LIST_BEGIN: 'GET_BRANCH_LIST_BEGIN',
  GET_BRANCH_LIST_SUCCESS: 'GET_BRANCH_LIST_SUCCESS',
  GET_BRANCH_LIST_ERR: 'GET_BRANCH_LIST_ERR',

  BRANCH_ADD_BEGIN: 'BRANCH_ADD_BEGIN',
  BRANCH_ADD_SUCCESS: 'BRANCH_ADD_SUCCESS',
  BRANCH_ADD_ERR: 'BRANCH_ADD_ERR',

  BRANCH_SEARCH: 'BRANCH_SEARCH',

  branchSearch: data => {
    return {
      type: actions.BRANCH_SEARCH,
      data,
    };
  },

  branchAddBegin: () => {
    return {
      type: actions.BRANCH_ADD_BEGIN,
    };
  },

  branchAddSuccess: data => {
    return {
      type: actions.BRANCH_ADD_SUCCESS,
      data,
    };
  },

  branchAddErr: err => {
    return {
      type: actions.BRANCH_ADD_ERR,
      err,
    };
  },

  getBranchBegin: () => {
    return {
      type: actions.GET_BRANCH_BEGIN,
    };
  },

  getBranchSuccess: data => {
    return {
      type: actions.GET_BRANCH_SUCCESS,
      data,
    };
  },

  getBranchErr: err => {
    return {
      type: actions.GET_BRANCH_ERR,
      err,
    };
  },

  getBranchListBegin: () => {
    return {
      type: actions.GET_BRANCH_LIST_BEGIN,
    };
  },

  getBranchListSuccess: data => {
    return {
      type: actions.GET_BRANCH_LIST_SUCCESS,
      data,
    };
  },

  getBranchListErr: err => {
    return {
      type: actions.GET_BRANCH_LIST_ERR,
      err,
    };
  },
};

export default actions;
