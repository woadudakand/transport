import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { userReducer } from './users/reducers';

const rootReducers = combineReducers({
  users: userReducer,
  auth: authReducer,
  ChangeLayoutMode,
});

export default rootReducers;
