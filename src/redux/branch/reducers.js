import actions from './actions';

const {
  BRANCH_ADD_BEGIN,
  BRANCH_SEARCH,
  BRANCH_ADD_SUCCESS,
  BRANCH_ADD_ERR,
  GET_BRANCH_BEGIN,
  GET_BRANCH_SUCCESS,
  GET_BRANCH_ERR,
} = actions;

const initState = {
  branches: [],
  loading: false,
  error: null,
};

const BranchesReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case BRANCH_SEARCH:
      return {
        ...state,
        branches: data.result,
      };

    case BRANCH_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case BRANCH_ADD_SUCCESS:
      return {
        ...state,
        branches: data.result,
        loading: false,
      };
    case BRANCH_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_BRANCH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_BRANCH_SUCCESS:
      return {
        ...state,
        branches: data.result,
        loading: false,
      };
    case GET_BRANCH_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default BranchesReducer;
