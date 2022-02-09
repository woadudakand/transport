import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import UsersReducer from './users/reducers';

const rootReducers = combineReducers({
  users: UsersReducer,
  auth: authReducer,
  ChangeLayoutMode,
});

export default rootReducers;
