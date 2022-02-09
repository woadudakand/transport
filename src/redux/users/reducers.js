import actions from './actions';

const {
  REGISTER_BEGIN,
  REGISTER_SEARCH,
  REGISTER_SUCCESS,
  REGISTER_ERR,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERR,
} = actions;

const initState = {
  users: [],
  loading: false,
  message: null,
  error: null,
};

const UsersReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case REGISTER_SEARCH:
      return {
        ...state,
        users: data.result,
      };

    case REGISTER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        users: data.result,
        message: data.message,
        type: data.type,
        loading: false,
      };
    case REGISTER_ERR:
      return {
        ...state,
        error: err,
        message: err.message,
        type: err.type,
        loading: false,
      };
    case GET_USERS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: data.result,
        message: data.message,
        type: data.type,
        loading: false,
      };
    case GET_USERS_ERR:
      return {
        ...state,
        error: err,
        message: err.message,
        type: err.type,
        loading: false,
      };
    default:
      return state;
  }
};
export default UsersReducer;
