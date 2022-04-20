import actions from './actions';

const {
  EMPLOYEE_SEARCH,
  EMPLOYEE_ADD_BEGIN,
  EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_ADD_ERR,
  GET_EMPLOYEE_BEGIN,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERR,
  GET_EMPLOYEE_LIST_BEGIN,
  GET_EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_LIST_ERR,
  SINGLE_EMPLOYEE_BEGIN,
  SINGLE_EMPLOYEE_SUCCESS,
  SINGLE_EMPLOYEE_ERR,
} = actions;

const initState = {
  employees: [],
  list: [],
  employee: [],
  loading: false,
  error: null,
};

const EmployeesReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case EMPLOYEE_SEARCH:
      return {
        ...state,
        employees: data.result,
      };

    case EMPLOYEE_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case EMPLOYEE_ADD_SUCCESS:
      return {
        ...state,
        employees: data.result,
        loading: false,
      };
    case EMPLOYEE_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SINGLE_EMPLOYEE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: data.result,
        loading: false,
      };
    case SINGLE_EMPLOYEE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_EMPLOYEE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: data.result,
        loading: false,
      };
    case GET_EMPLOYEE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_EMPLOYEE_LIST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        list: data.result,
        loading: false,
      };
    case GET_EMPLOYEE_LIST_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default EmployeesReducer;
