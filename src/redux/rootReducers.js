import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import UsersReducer from './users/reducers';
import placesReducer from './places/reducers';
import branchReducer from './branch/reducers';
import articlesReducer from './articles/reducers';
import employeeReducer from './employee/reducers';

const rootReducers = combineReducers({
  users: UsersReducer,
  auth: authReducer,
  ChangeLayoutMode,
  places: placesReducer,
  branches: branchReducer,
  articles: articlesReducer,
  employees: employeeReducer,
});

export default rootReducers;
